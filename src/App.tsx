import { useEffect, useState } from 'react';
import './index.scss'
import {Config, LiveTimingAPIGraphQL, discoverF1MVInstances} from 'npm_f1mv_api';

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {

  const config: Config = {
    host: "localhost",
    port: 10101
  };

  let lastLength: number = 0;

  useEffect(() => {
    const interval = setInterval(async () => {

      const {TeamRadio, TimingData, DriverList, SessionInfo} = await LiveTimingAPIGraphQL(config, ['TeamRadio', 'TimingData', 'DriverList', "SessionInfo"]);
      // console.log({TeamRadio, TimingData, DriverList, SessionInfo});
      if(TeamRadio.Captures.length !== lastLength) {
        console.log(`New TeamRadio https://livetiming.formula1.com/static/${SessionInfo.Path}${TeamRadio.Captures[TeamRadio.Captures.length - 1].Path}`);

        const audio = new Audio(`https://livetiming.formula1.com/static/${SessionInfo.Path}${TeamRadio.Captures[TeamRadio.Captures.length - 1].Path}`);
        await audio.load();
        audio.play();

        lastLength = TeamRadio.Captures.length;
      }

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (<p>Welcome! Just listen!</p>);
}

export default App;