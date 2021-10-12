import { useState } from 'react'

import Ground from "../src/section/ground";
import TestSidebar from "../src/component/test-sidebar";

const test = () => {

  const [vnc, setVnc] = useState(false);

  const handleVncConnect = () => {
    setVnc(true);
  }

  const handleVncDisconnect = () => {
    setVnc(false);
  }

  return (
    <>
      <TestSidebar handleVncConnect={handleVncConnect} handleVncDisconnect={handleVncDisconnect} />
      <Ground vnc={vnc} />
    </>
  );
}

export default test
