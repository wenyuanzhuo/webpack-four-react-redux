import React from 'react';
import SC from 'common/StyledComponent/index'
const Button = SC.Button
const Button1 = SC.Button1
export default class RxjsStudyOne extends React.Component {
  state = {
    textList: [
      '我是谁',
      '我是谁',
      '我是谁',
      '我是谁',
      '我是谁',
    ]
  }
  render() {
    const { textList } = this.state
    return (
      <div className="rxstudy-container">
        <Button primary color="lightgreen">send message ({})</Button>
        <Button1 primary>send message `` </Button1>
        <div className="swiper">
          <ul>
            { textList.map((item, index) => <li key={index}>{item}</li>) }
          </ul>
        </div>
      </div>
    )
  }
}