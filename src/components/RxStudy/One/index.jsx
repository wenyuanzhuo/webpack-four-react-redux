import React from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import SC from 'common/StyledComponent/index'
const Button = SC.Button
const Button1 = SC.Button1
export default class RxjsStudyOne extends React.Component {
  render() {
    return (
      <div>
        <Button primary color="lightgreen">send message ({})</Button>
        <Button1 primary>send message `` </Button1>
      </div>
    )
  }
}