import React from "react";
import { useSpring, animated } from 'react-spring'
// const props = useSpring({
//   opacity: 1,
//   from: {
//     opacity: 0
//   }
// })
// export default class Demo11 extends React.Component {
//   render() {
//     const props = useSpring({
//       opacity: 1,
//       from: { opacity: 0 },
//     })
//     return <animated.h1 style={props}>hello</animated.h1>
//   }
// }

export default () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  })
  return <animated.div style={props}>hello</animated.div>
}