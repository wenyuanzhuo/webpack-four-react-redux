import React, { useState, useEffect } from 'react'


const DataList = ({arr}) => {
  return (
    <>
      {arr.map((item, i) => {
        return (<li key={i}>{i}</li>)
      })}
    </>
  )
}
export default () => {
  const onceRender = Array.from({ length: 60 }, (_, i) => i)
  const [ arr, setArr ] = useState(onceRender)

  // useEffect(() => {
  //   let timer
  //   if (arr.length > 1000) {
  //     console.log(Date.now())
  //     return
  //   }
  //   window.requestAnimationFrame(() => {
  //     setArr((arr) => arr.concat(onceRender))
  //   })
  // }, [arr])
  return (
  <ul>
    <DataList arr={arr}/>
  </ul>
  )
}