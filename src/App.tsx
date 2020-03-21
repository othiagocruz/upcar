import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import useKey from "use-key-hook";
import upcar from "./carro.png";
import cenario from "./cenario.gif";
import { useInterval } from "./hooks";
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

const Box = styled.div`
  width: calc(100vw - 6rem);
  height: calc(100vh - 6rem);
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  padding: 3rem;
`;

const Message = styled.p`
  font-size: 3.5rem;
  display: block;
  text-align: center;
`;

const Input = styled.input`
  font-size: 1.4rem;
  padding: 1.2rem;
`;

const Button = styled.button`
  background: ${props => props.theme.text};
  color: ${props => props.theme.background};
  font-size: 1.6rem;
  border: 0;
  border-radius: 0.3rem;
  padding: 1.2rem;
  cursor: pointer;
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
  const [started, setStarted] = useState<boolean>(false);
  const [starting, setStarting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(4);

  const savedLane = useRef(lane);
  const savedPaused = useRef(paused);

  useEffect(() => {
    savedLane.current = lane;
  }, [lane]);

  useEffect(() => {
    savedPaused.current = paused;
  }, [paused]);

  useInterval(
    () => {
      !started && setCountdown(countdown - 1);
      if (countdown === 0) setStarted(true);
    },
    1000,
    [starting]
  );

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
      {!started && !starting && (
        <Box>
          <Message>Entre com seu nome para começar</Message>
          <Input type="text" />
          <Button onClick={() => setStarting(true)}>Iniciar Corrida</Button>
        </Box>
      )}
      {starting && !started && (
        <Box>
          <Message>
            {countdown > 0 && countdown} {countdown === 0 && "Valendo!!"}
          </Message>
        </Box>
      )}
      {paused && started && (
        <Box>
          <Message>Jogo pausado!</Message>
        </Box>
      )}
      {!paused && started && (
        <Background>
          <Upcar lane={lane}></Upcar>
        </Background>
      )}
    </ThemeProvider>
  );
}

export default App;
