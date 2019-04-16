/** @jsx jsx */
import React, { useState, Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled'
import { interval, timer, fromEvent, Scheduler, never } from 'rxjs';
import { tap, takeWhile, map, combineLatest, withLatestFrom, filter, debounceTime, scan, repeat, startWith, mergeMap } from 'rxjs/operators'
import { useObservable, useEventCallback } from 'rxjs-hooks'
export default class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleBtnCss: false,
    }
    this.scrollbtn = React.createRef()
    this.scrollTop = React.createRef()
    this.docEle = document.documentElement
    this.currentEle = document.body.children[0].children[0].children[1]
  }
  componentDidMount() {
    this.scrollbtn.current.style.opacity = 0
  }
  lerp = (start, end) => {
    var y = start.y + end
    return { y }
  }
  backScrollTop = () => {
    this.setState({
      visibleBtnCss: true,
    })
    let timer
    let fn = () => {
      const top = this.currentEle.scrollTop
      if (top > 0) {
        this.currentEle.scrollTop = top - 100
        timer = requestAnimationFrame(fn)
      } else {
        cancelAnimationFrame(timer)
      }
    }
    requestAnimationFrame(fn)
  }
  addclass = () => {
    
  }
  removeClass = () => {
    this.setState({
      visibleBtnCss: false,
    })
  }
  render() {
    const style = css`
      height: 6000px;
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
    const ScrollBtn = styled.span`
      position: fixed;
      right: 20px;
      bottom: 20px;
      margin-bottom: 20px;
      cursor: pointer;
      width: 0;
      height: 0;
      border-bottom: 60px solid #409EFF;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-top: 30px solid transparent;
    `
    const ScrollTopVal = styled('span')`
      position: fixed;
      left: 220px;
      bottom: 20px;
      margin-bottom: 20px;
      width: 20px;
      height: 20px;
    `
    const backing = css`
      border-bottom: 60px solid #e74c3c;
    `
    const SomeComponent = ({children}) => {
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

    const ScrollToTop = () => {

      const ScrollFadeIn$ = fromEvent(this.currentEle, 'scroll').pipe(
        debounceTime(16.7),
        filter(() => this.currentEle.scrollTop >= 100),
        map(() => ({y: this.currentEle.scrollTop})),
        tap(() => {
          this.scrollTop.current.innerHTMl = `${this.currentEle.scrollTop}`
        })
      )
      const ScrollFadeOut$ = fromEvent(this.currentEle, 'scroll').pipe(
        debounceTime(16.7),
        filter(() => this.currentEle.scrollTop <= 100),
        map(() => ({y: this.currentEle.scrollTop})),
        tap(() => {
          this.scrollTop.current.innerHTMl = `${this.currentEle.scrollTop}`
        })
      )
      const animationFrame$ = interval(50, Scheduler.animationFrame);
      const animationFrameOut$ = interval(0, Scheduler.animationFrame).pipe(startWith(100));
      const fadeIn$ = animationFrame$.pipe(
        withLatestFrom(ScrollFadeIn$, (frame, moveY) => { 
          return moveY
        }),
        scan((current, next) => this.lerp(current, 10)),
        map((move) => {
            if (move.y >= 100) {
              this.scrollbtn.current.style.opacity = (move.y - 100)/ 100
            }
            return move.y
        }),
        takeWhile(n => n <= 200),
        repeat()
      )
      const fadeOut$ = animationFrameOut$.pipe(
        withLatestFrom(ScrollFadeOut$, (frame, moveY) => { 
          return moveY
        }),
        scan((current, next) => this.lerp(current, -1)),
        map((move) => {
            console.log(move)
            if (move.y <= 100 && move.y >= 0) {
              this.scrollbtn.current.style.opacity  = move.y/ 100
            }
            return move.y
        }),
        tap((n) => { 
            console.log(n)
            if(n <= 0) {
                this.removeClass()
            }
        }),
        takeWhile(n => n >= 0)
      )
      const fadeInVal = useObservable(() => fadeIn$)
      const [ handleClick ] = useEventCallback((event$) => 
        event$.pipe(
          map(this.backScrollTop),
        ),
      )
      let fadeOutVal
      if (this.state.visibleBtnCss) {
        fadeOutVal = useObservable(() => fadeOut$)
      }
      return (
        <Fragment>
          <ScrollBtn ref={this.scrollbtn} onClick={handleClick} css={this.state.visibleBtnCss ? backing: ''}></ScrollBtn>
          <ScrollTopVal ref={this.scrollTop}>{!this.state.visibleBtnCss ? fadeInVal: fadeOutVal}</ScrollTopVal>
        </Fragment>
      )
    }
    return (
      <SomeComponent>
        <AnotherComponent/>
        <Timer/>
        <ScrollToTop/>
      </SomeComponent>
    )
  }
}