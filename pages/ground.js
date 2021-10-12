import { useState } from 'react'

import Ground from "../src/section/ground";
import GroundSidebar from "../src/component/ground-sidebar";

const ground = () => {

  const [vnc, setVnc] = useState(false);

  const handleVncConnect = () => {
    setVnc(true);
  }

  const handleVncDisconnect = () => {
    setVnc(false);
  }

  return (
    <>
      <GroundSidebar handleVncConnect={handleVncConnect} handleVncDisconnect={handleVncDisconnect} />
      <Ground vnc={vnc} />
    </>
  );
}

export default ground
