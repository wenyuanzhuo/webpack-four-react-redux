import React from 'react';
import { Upload, Icon, message, Steps, Button } from 'antd';
// import { getBase64 } from 'utils/upload'
import 'whatwg-fetch'
// const Tesseract = window.Tesseract
const Step = Steps.Step;

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
  // const objecturl =  window.URL.createObjectURL(img);
  // console.log(333,objecturl)
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
      
      // getUrl(info.file.originFileObj)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>  {
        fetch(`/img/${info.file.name}`)
        this.setState({
        imageUrl,
        loading: false,
        })
      });
    }
  }
  handleNextChange = () => {
    const { current, imageUrl } = this.state
    // if (imageUrl) saveImg(imageUrl)
    // fetch('/demo')
    // .then(res => console.log(res))

      this.setState({
        current: 2
      })
  }
  handleBack = () => {
    this.setState({
      current: 0,
      imageUrl: null
    })
  }
  render() {
    const { current, imageUrl, imgResult } = this.state;
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
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );

    const transResult = (
      <div className="transiton-result">
         {imgResult ? <div>{imgResult}</div> : 'content'}
      </div>
    )
    const nextButton = (
      <div className="next">
        <Button
          type="primary"
          onClick={this.handleNextChange}
        >
          解析图片
        </Button>
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