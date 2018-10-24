import React from 'react';
import { Upload, Icon, message, Steps, Button, Card, Avatar } from 'antd';
// import { getBase64 } from 'utils/upload'
import 'whatwg-fetch'
import { transImgResultInfo, tmp} from 'mock/index'
// const Tesseract = window.Tesseract
const Step = Steps.Step;
const { Meta } = Card;
const steps = [{
  title:'上传图片',
  content: 'upload',
}, {
  title: '解析图片',
  content: 'upload success',
}, {
  title: '结果展示',
  content: 'result success',
}];
function getUrl(img) {
  const objecturl =  window.URL.createObjectURL(img);
  console.log(333,objecturl)
  return objecturl
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default class UploadPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      current: 0,
      show: false,
      imgResult: [],
    };
  }
  static getDerivedStateFromProps(nextProps, preState) {
    return null
  }
  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ 
        loading: true,
        current: 1
      });
      // return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>  {
        // fetch(`/img/${info.file.name}`)        
        this.setState({
        imageUrl,
        loading: false,
        })
      });
      // const imgUrl = getUrl(info.file.originFileObj)
      // fetch('/test', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ url: imgUrl })
      // })
      // this.setState({
      //   imageUrl: imgUrl,
      //   loading: false,
      // })
    }
  }
  _transResult (res) {
    const ans = transImgResultInfo(res.data, tmp)
    this.setState({
      current: 2,
      imgResult: ans
    })
  }
  handleNextChange = () => {
    const { current, imageUrl } = this.state
    
    // fetch(`/demo/${imageUrl}`)
    fetch('/api/example')
    .then((res) => {
      if(res.status >= 200 && res.status < 300) {
        return res
      }
    })
    .then(res => res.json())
    .then(data => this._transResult(data))

  }
  handleBack = () => {
    this.setState({
      current: 0,
      imageUrl: null
    })
  }
  handleShowDetail = (e) => {
    e.preventDefault();
    this.setState((preState) => ({
      show: !preState.show
    }))
  }
  render() {
    const { current, imageUrl, imgResult, show } = this.state;
    console.log(111111,imgResult)
    const stepTitle = (
      <Steps current={current}>
        {steps.map(item => <Step key={item.title} title={item.title} />)}
      </Steps>
    ) 
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const upload = (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/image"
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
    const nextButton = (
      <div className="next">
        {
           current === 1 &&
           (
            <Button
              type="primary"
              onClick={this.handleNextChange}
            >
              解析图片
            </Button>
           )
        }
        {
          current === 2 &&
          (
            <Button
              style={{ marginLeft: '20px'}}
              type="primary"
              onClick={this.handleBack}
            >
              返回
            </Button>
          )
        }
      </div>
    )
    const transResult = (
      <div className="transiton-result">
        { imgResult && 
         (<Card
            style={{ width: '100%', height: 300 }}
            cover={<img alt="example" src={imageUrl}/>}
            actions={[<div onClick={this.handleShowDetail}><Icon type="setting" /><span>身份证原始信息</span></div>]}
          >
            { imgResult && imgResult.map((item, index) => {
                if (item.id !== 'original_information') {
                  return (
                    <div key={item.index} className="trans-detail">
                      <span>{item.id}</span>
                      <span>:</span>
                      <span>{item.value}</span>
                    </div>
                  )
                }
              })
            }
            {
              show && imgResult && imgResult.map((item, index) => {
                if (item.id === 'original_information') {
                  return (
                    <div key={item.index}>
                      <span>{item.id}</span>
                      <span>:</span>
                      <span>{item.value}</span>
                    </div>
                  )
                }
              })
            }
          </Card>)
        }
      </div>
    )

    return (
      <div className="basic-container-uploadpicture">
        {stepTitle}
        <div className="steps-content">
          {
            current <= 1
            && upload
          }
          {
            current === 2
            && transResult
          }
        </div>
        { current !== 0 
          && nextButton
        }
      </div>
    )
  }
}