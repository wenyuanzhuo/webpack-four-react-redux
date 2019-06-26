import React from "react";
// import { useSpring, animated } from 'react-spring'
import { Keyframes, animated } from 'react-spring/renderprops'

const Container = Keyframes.Spring(async next => {
  while (true) {
    await next({
      from: { radians: 0, color: '#247BA0' },
      to: { radians: 2 * Math.PI },
    })
  }
})
export default class Demo11 extends React.PureComponent {
  state = {
    items: [ 'item1', 'item2', 'item3' ]
  }
  render() {
    const Content = ({ radians, color }) =>
      this.state.items.map((_, i) => (
        <animated.svg
          key={i}
          style={{
            width: 50,
            height: 50,
            willChange: 'transform',
            transform: radians.interpolate(
              r => `translate3d(0,${20 * Math.sin(r + (i * 2 * Math.PI) / 4)}px, 0)`
            )
          }}
          viewBox="0 0 400 400">
          <animated.g fill={color} fillRule="evenodd">
            <path id="path-1" d="M0,400 L200,0 L400,400 L0,400 Z" />
          </animated.g>
        </animated.svg>
      ))
    const { items } = this.state
    return <Container
      reset
      native
      keys={items}
      config={{ duration: 2000 }}
    >
      {Content}
    </Container>
  }
}
