import { useState } from 'react'

import Ground from "../src/section/ground";
import TestSidebar from "../src/component/test-sidebar";

const test = () => {

  const [vnc, setVnc] = useState(false);
  const [ip, setIp] = useState("");

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

export default test
