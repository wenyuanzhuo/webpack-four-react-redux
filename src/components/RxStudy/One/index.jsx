import React from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Button } from 'common/StyledComponent/Button.jsx'

export default class RxjsStudyOne extends React.Component {
  render() {
    const Button1 = ({ primary }) => (styled(Button)`
      ${() => primary &&
        css`
          background-color: #1890ff;
          border-color: #1890ff;
          color: #fff;
          &:hover, &:active, &:focus  {
            color: #fff;
            background-color: #40a9ff;
            border-color: #40a9ff;
          }
        `
      }
    `)
    return (
      <div>
        <Button1 primary>send message</Button1>
      </div>
    )
  }
}