import React from 'react'
import { Upload, Icon, Button, Card, Row, Col, Spin} from 'antd'
import 'whatwg-fetch'
import _ from 'lodash'

import { fromPrefixLen } from 'ip';
import { getUrl, uuid } from 'utils/upload'
import { transImgResultInfo, tmp2, tmp} from 'mock/index'
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
    };
  }
  _transResult (res) {
    // const ans = transImgResultInfo(res.data, tmp)
    // cardList
    if(_.includes(Object.keys(res.data), 'name')) {
      const ans = transImgResultInfo(res.data, tmp)
      const result = [{
        data: ans,
        name: res.data.name
      }]
      this.setState({
        cardList: result,
        original_information: res.data.original_information
      })
      return 
    }
    const arr = Object.keys(res.data)
    const o = []
    let original_information = ''
    _.forEach(arr, item => {
      if (item !== 'original_information') {
        o.push({
          name: res.data[item].name,
          data: res.data[item]
        })
      } else {
        original_information = res.data[item]
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
    // fetch(`/demo?name=${info.fileList.name}`)
    fetch('/api/example')
    .then((res) => {
      if(res.status >= 200 && res.status < 300) {
        this.setState({
          loading: false,
        })
        return res
      }
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
        cardList: []
      })
    } else {
      const imgViewUrl = getUrl(info.file.originFileObj)
      const len = info.fileList.length
      info.fileList[len - 1].thumbUrl = imgViewUrl
      // // fetch(`/demo?name=${info.fileList.name}`)
      // fetch('/api/example')
      // .then((res) => {
      //   if(res.status >= 200 && res.status < 300) {
      //     return res
      //   }
      // })
      // .then(res => res.json())
      // .then(data => this._transResult(data))
      this.setState((perState) => ({
        fileList: [
          ...info.fileList
        ],
      }))
    }

  }
  render() {
    const { fileList, cardList } = this.state
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