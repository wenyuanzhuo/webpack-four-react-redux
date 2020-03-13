import React from 'react'
import _ from 'lodash'
const onceRender = (current = 0) => Array.from({ length: 16 }, (_, i) => i + current)
export default class VirtualList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: onceRender(),
      beforeArr: [],
      afterArr: [],
    }
    this.myRef = React.createRef();
  }
  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 200), true)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    const ref = this.myRef.current
    console.log({
      scrollTop: ref,
      children: ref.children,
    })
  }
  render () {
    const DataList = ({arr}) => {
      return (
        <>
          {arr.map((item, i) => {
            return (<li key={i}>{i}</li>)
          })}
        </>
      )
    }
    return(
      <div className="data-container-virtual">
        <ul ref={this.myRef}>
          <DataList arr={this.state.arr}/>
        </ul>
      </div>
    )
  }
}