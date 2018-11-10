import React from 'react'
import { Upload, Icon, Button, Card, Row, Col, Spin} from 'antd'
import 'whatwg-fetch'
import _ from 'lodash'
// import ajax from 'ajax'
import { fromPrefixLen } from 'ip';
import { getUrl, uuid } from 'utils/upload'
import { transImgResultInfo, tmp2, tmp} from 'mock/index'
import qs from 'querystring'
export default class UploadPictureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgResult: [],
      fileList: [],
      imgResult: [],
      cardList: [],
      original_information: '',
      loading: false,
      show: false,
    };
  }
  _transResult (res) {
    // const ans = transImgResultInfo(res.data, tmp)
    // cardList
    console.log(res)
    if(_.includes(Object.keys(res), 'name')) {
      const ans = transImgResultInfo(res, tmp)
      const result = [{
        data: ans,
        name: res.name
      }]
      this.setState({
        cardList: result,
        original_information: res.original_information
      })
      return 
    }
    const arr = Object.keys(res)
    const o = []
    let original_information = ''
    _.forEach(arr, item => {
      if (item !== 'original_information') {
        o.push({
          name: res[item].name,
          data: res[item]
        })
      } else {
        original_information = res[item]
      }
    })
    console.log(o)
    const result = _.map(o, item => {
      item.data = transImgResultInfo(item.data, tmp2)
      return item
    })
    this.setState({
      cardList: result,
      original_information,
    })
  }
  onResolve = (e) => {
    e.preventDefault
    this.setState({
      loading: true,
    })
    console.log(this.state.fileList[0].name)
    let params = {
      "name": this.state.fileList[0].name,
    }
    
    fetch(`/demo?${qs.stringify(params)}`)
    .then((res) => {
      this.setState({
        loading: false,
      })
      return res
    })
    .then(res => res.json())
    .then(data => this._transResult(data))
  }
  handleChange = (info) => {
    console.log(info)
    if (info.file.status === 'removed') {
      this.setState({
        fileList: [
          ...info.fileList
        ],
        cardList: [],
        show: false,
      })
    } else {
      const imgViewUrl = getUrl(info.file.originFileObj)
      const len = info.fileList.length
      info.fileList[len - 1].thumbUrl = imgViewUrl
      this.setState((perState) => ({
        fileList: [
          ...info.fileList
        ],
      }))
    }

  }
  handleShowDetail = (e) => {
    e.preventDefault();
    this.setState((preState) => ({
      show: !preState.show
    }))
  }
  render() {
    const { fileList, cardList, original_information, show } = this.state
    const props = {
      action: 'api/image',
      listType: 'picture',
      className: 'upload-list-inline',
    }
    const uploadButton = (
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    )
    const resolveButton = (
     <div className="position-btn">
        <Button
          onClick={this.onResolve}
          type="primary"
        >
          <Icon type="zoom-in" /> 解析
        </Button>
     </div>
    )
    const card = (img, name, data) => (
      <Col span={12}>
        <Card 
          cover={<img alt='example' src={img}/>}
          bordered={false}
          actions={[<div onClick={this.handleShowDetail}><Icon type="setting" /><span>身份证原始信息</span></div>]}
        >
          { data && data.map((item, index) => {
            return (
              <div key={item.index} className="trans-detail">
                <span>{item.id}</span>
                <span>:</span>
                <span>{item.value}</span>
              </div>
            )
          })}
          {
            show && original_information && 
              (
                <div className="trans-detail-origin">
                  <span>原始信息</span>
                  <span>:</span>
                  <span>{original_information.join(', ')}</span>
                </div>
              )
            }
        </Card>
      </Col>
    )
    return (
      <div
        className="basic-container-uploadpicturelist"
      >
        <Upload
          {...props}
          onChange={this.handleChange}
          fileList={fileList}
        >
          { fileList.length < 1 && uploadButton}
        </Upload>
        { fileList.length >= 1 && resolveButton }
        <Spin
          spinning={this.state.loading}
        >
          <div className="main-content">
            <Row gutter={24}>
              { cardList && cardList.map(item => card(fileList[0].thumbUrl,item.name, item.data))}
            </Row>
          </div>
        </Spin>
      </div>
    )
  }
}