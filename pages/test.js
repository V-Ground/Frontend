import React from 'react'
import VncDisplay from "react-vnc-display";
const test = () => {
  return (
    <div>
      <VncDisplay url="ws://13.125.162.194:5900" />
    </div>
  )
}

export default test
