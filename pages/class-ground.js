import { useState } from 'react'

import Ground from "../src/section/ground";
import TestSidebar from "../src/component/class-sidebar";

const container = () => {

  const [vnc, setVnc] = useState(true);
  const [ip, setIp] = useState("http://localhost:5901");

  const handleVncConnect = (ip) => {
    setVnc(true);
    setIp(ip);
  }

  const handleVncDisconnect = () => {
    setVnc(false);
  }

  return (
    <>
      <TestSidebar handleVncConnect={handleVncConnect} handleVncDisconnect={handleVncDisconnect} />
      <Ground vnc={vnc} ip={ip} />
    </>
  );
}

export default container
