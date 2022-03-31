import './index.less'
import { useState } from "react"
import logo from '../public/logo.svg'
import pic from '../public/p2311633337.webp'


export default function App() {
  const [value, setValue]= useState(0)

  return (
    <div className="layout">
      <img src={logo} className="App-logo" alt="logo" height={200} />
      <img src={pic} height={200} />
      <div className="value">{value}</div>
      <button onClick={() => setValue(pre => pre-1)}>-</button>
      <button onClick={() => setValue(pre => pre+1)}>+</button>
    </div>
  )
}