import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import useKey from "use-key-hook";
import upcar from "./carro.png";
import cenario from "./cenario.gif";
import { Theme } from "./theme";

export interface IUpcar {
  lane: string;
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${cenario}) center no-repeat;
  background-size: cover;
`;

const Paused = styled.div`
  width: 100vw;
  height: 100vh;
  background: purple;
  color: white;
  text-align: center;
  font-size: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Upcar = styled.div<IUpcar>`
  width: 25vw;
  height: 25vh;
  background: url(${upcar}) 0 0 no-repeat;
  background-size: contain;
  position: absolute;
  bottom: 1rem;
  left: ${props =>
    (props.theme.lanes as { [key: string]: string })[props.lane]};
`;

function App() {
  const [lane, setLane] = useState<string>("middle");
  const [paused, setPaused] = useState<boolean>(false);
  const savedLane = useRef(lane);
  const savedPaused = useRef(paused);

  useEffect(() => {
    savedLane.current = lane;
  }, [lane]);

  useEffect(() => {
    savedPaused.current = paused;
  }, [paused]);

  useKey((pressedKey: number) => {
    switch (pressedKey) {
      case 27:
        setPaused(!savedPaused.current);
        break;
      case 37:
        if (savedLane.current === "left") return;
        !savedPaused.current &&
          setLane(savedLane.current === "middle" ? "left" : "middle");
        break;
      case 39:
        if (savedLane.current === "right") return;
        !savedPaused.current &&
          setLane(savedLane.current === "middle" ? "right" : "middle");
        break;
      case 97:
        !savedPaused.current && setLane("left");
        break;
      case 100:
        !savedPaused.current && setLane("right");
        break;
      case 115:
        !savedPaused.current && setLane("middle");
        break;

      default:
        break;
    }
  });
  return (
    <ThemeProvider theme={Theme}>
      {paused && <Paused>Jogo pausado!</Paused>}
      {!paused && (
        <Background>
          <Upcar lane={lane}></Upcar>
        </Background>
      )}
    </ThemeProvider>
  );
}

export default App;
