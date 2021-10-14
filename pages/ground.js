import { useState } from 'react'

import Ground from "../src/section/ground";
import GroundSidebar from "../src/component/ground-sidebar";

const ground = () => {

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
      <GroundSidebar handleVncConnect={handleVncConnect} handleVncDisconnect={handleVncDisconnect} />
      <Ground vnc={vnc} ip={ip} />
    </>
  );
}

export default ground
