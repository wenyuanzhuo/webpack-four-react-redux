/** @jsx jsx */
import React, { useState, Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled'
import { interval, timer } from 'rxjs';
import { tap, takeWhile, map, combineLatest, withLatestFrom } from 'rxjs/operators'
import { useObservable, useEventCallback } from 'rxjs-hooks'
export default class Overview extends React.Component {
  
  render() {
    const style = css`
    `
    const Button = styled.button`
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
    const SomeComponent = ({children}) => {
      // const { b, setB } = useState(0)
      return (
        <div
          css={style} 
        >
          {children}
        </div>
      )
    }
    const AnotherComponent = () => {
      const [c, setC] = useState(0);
      const val = useObservable(() => interval(1000).pipe(
        map((count) => {
          setC(count)
          return count
        }),
        takeWhile(n => n <= 20)
      ), 0);
      const [clickCallback, [description] ] = useEventCallback((event$, inputs$, state$) => 
        event$.pipe(
          map((event) => [event.clientX]),
          combineLatest(inputs$),
          withLatestFrom(state$),
          map(([eventAndInput, state]) => {
            const [ [x], [val] ] = eventAndInput
            return [val]
          }),
          takeWhile(n => n <= 20)
        ),
        [0],
        [val]
      )
      return (
        <Fragment>
          <Button onClick={clickCallback}>点击</Button>
          <span>{val}---------</span>
          <span>{description}---------</span>
          <span>{c}</span>
        </Fragment>
      )
    }
    const Timer = () => {
      const [b, setB] = useState(0);
      const [a, setA] = useState(0);
      const val = useObservable(
        (inputs$, state$) =>
          timer(1000).pipe(
            combineLatest(inputs$),
            tap((arr) => console.log(arr)),
            map(([_index, [a, b]]) => a + b)
          ),
        0,
        [a, b]
      );
    
      return (
        <div>
          <Button onClick={() => setA(a + 100)}>a: +100</Button>
          <Button onClick={() => setB(b + 10)}>b: +10</Button>
          <span>{val}</span>
        </div>
      );
    }

    return (
      <SomeComponent>
        <AnotherComponent/>
        <Timer/>
      </SomeComponent>
    )
  }
}