/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

export const defaultbutton = styled.button`
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0,0,0,0.015);
  cursor: pointer;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0,0,0,0.65);
  background-color: #fff;
  outline: 0;
  &:hover, &:active, &:focus  {
    color: #40a9ff;
    border-color: #40a9ff;
    outline: 0;
  }
  margin: 0 20px 20px 0;
`
const primaryStyleButton = props => props.primary && css`
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
  &:hover, &:active, &:focus  {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`
const colorStyleButton = props => props.color && css`
  color: lightgreen;
`
export const Button = styled(defaultbutton, {
})(
  primaryStyleButton,
  colorStyleButton,
)
export const Button1 = styled(defaultbutton)`
  ${primaryStyleButton};
  ${colorStyleButton};
`
export const H1 = styled('h1')(props => ({
  color: props.color
}))