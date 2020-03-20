import React from 'react'
import _ from 'lodash'


const onceRender = (current = 0) => Array.from({ length: 100 }, (_, i) => i + current)
const height = 50
const bufferSize = 5
export default class VirtualList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleData: [], // 需要渲染的数据
      startOffset: 0  // 偏移量
    }
    this.myRef = React.createRef(); // 滚动视窗
    this.listData = onceRender() // 总数据
    this.startIndex = 0 // 渲染的头部下标
    this.endIndex = 0 // 渲染的尾部部下标
    this.visibleCount = 0  // 展示的item数量
    this.phantomHeight = this.listData.length * height // 产生滚动的行框盒子高度
  }
  componentDidMount() {
    this.visibleCount = Math.ceil(this.myRef.current.clientHeight / height)
    this.updateDom()
    window.addEventListener('scroll', _.throttle(this.handleScroll, 200), true)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    const ref = this.myRef.current
    const scrollTop = ref.scrollTop
    const startIndex = Math.floor(scrollTop / height)
    this.updateDom(startIndex, scrollTop)
    console.log({
      scrollTop: scrollTop,
      startIndex
    })
  }
  updateDom = (startIndex = 0, scrollTop = 0) => {
    this.startIndex = startIndex
    this.endIndex = this.startIndex + this.visibleCount
    this.scrollTop = scrollTop
    const aboveIndex = this.startIndex - bufferSize > 0
    ?
    Math.min(this.startIndex, this.startIndex - bufferSize)
    :
    this.startIndex
    const belowIndex = Math.min(this.listData.length, this.endIndex + bufferSize)
    const startOffset =  this.startIndex - bufferSize > 0
    ?
    scrollTop - (scrollTop % height) - bufferSize * height
    :
    scrollTop - (scrollTop % height)
    this.setState({
      visibleData: this.listData.slice(aboveIndex, belowIndex),
      ...scrollTop ? { startOffset } : {}
    })
  }
  render () {
    const DataList = ({visibleData}) => {
      return (
        <>
          {visibleData.map((item, i) => {
            return (
              <div className="infinite-list-item" key={i}>
                {item}
              </div>
            )
          })}
        </>
      )
    }
    return(
      <div className="data-container-virtual" ref={this.myRef}>
        <div className="infinite-list-phantom" style={{ height: `${this.phantomHeight}px`}}></div>
        <div
          className="infinite-list"
          style={{ transform: `translate3d(0,${this.state.startOffset}px,0)` }}
        >
          <DataList visibleData={this.state.visibleData}/>
        </div>
      </div>
    )
  }
}