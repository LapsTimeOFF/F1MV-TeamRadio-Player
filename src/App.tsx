import { useEffect, useState } from "react";
import "./index.scss";
import {
  Config,
  LiveTimingAPIGraphQL,
  discoverF1MVInstances,
} from "npm_f1mv_api";
import Card from "./components/Card";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  const [data, setData] = useState<{
    name: string;
    colorTeam: string;
    url: string;
  } | null>(null);

  const config: Config = {
    host: "localhost",
    port: 10101,
  };

  let lastLength: number = 0;

  useEffect(() => {
    const interval = setInterval(async () => {
      const { TeamRadio, TimingData, DriverList, SessionInfo } =
        await LiveTimingAPIGraphQL(config, [
          "TeamRadio",
          "TimingData",
          "DriverList",
          "SessionInfo",
        ]);
      console.log({ TeamRadio, TimingData, DriverList, SessionInfo });
      if (TeamRadio.Captures.length !== lastLength) {
        console.log(
          `New TeamRadio https://livetiming.formula1.com/static/${
            SessionInfo.Path
          }${TeamRadio.Captures[TeamRadio.Captures.length - 1].Path}`
        );

        console.log(DriverList[
          TeamRadio.Captures[TeamRadio.Captures.length - 1].RacingNumber
        ])

        setData({
          name:
            DriverList[
              TeamRadio.Captures[TeamRadio.Captures.length - 1].RacingNumber
            ]?.LastName.toUpperCase() ?? "",
          url:
            DriverList[
              TeamRadio.Captures[TeamRadio.Captures.length - 1].RacingNumber
            ]?.HeadshotUrl.replace("1col", "12col") ?? "",
          colorTeam:
            DriverList[
              TeamRadio.Captures[TeamRadio.Captures.length - 1].RacingNumber
            ]?.TeamColour ?? "",
        });

        const audio = new Audio(
          `https://livetiming.formula1.com/static/${SessionInfo.Path}${
            TeamRadio.Captures[TeamRadio.Captures.length - 1].Path
          }`
        );
        await audio.load();
        audio.addEventListener("ended", () => {
          setData(null);
        });
        audio.play();

        lastLength = TeamRadio.Captures.length;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return data === null ? (
    ""
  ) : (
    <Card url={data.url} colorTeam={data.colorTeam} name={data.name} />
  );
}

export default App;
