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

const Game = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${cenario}) center no-repeat;
  background-size: cover;
  position: absolute;
`;

const Box = styled.div<{ opacity?: string }>`
  width: calc(100vw - 6rem);
  height: calc(100vh - 6rem);
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  opacity: ${props => props.opacity || "1"};
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  padding: 3rem;
  position: absolute;
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
  const [paused, setPaused] = useState<boolean>(true);
  const [started, setStarted] = useState<boolean>(false);
  const [starting, setStarting] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [usedTurbo, setUsedTurbo] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [racetime, setRacetime] = useState<number>(1);
  const [laps, setLaps] = useState<number>(0);

  const savedLane = useRef(lane);
  const savedPaused = useRef(paused);
  const savedTurbos = useRef(3);
  const savedTurboActive = useRef(false);

  useEffect(() => {
    savedLane.current = lane;
  }, [lane]);

  useEffect(() => {
    savedPaused.current = paused;
  }, [paused]);

  savedTurboActive.current = usedTurbo;

  useEffect(() => {
    if (usedTurbo) {
      savedTurbos.current = savedTurbos.current - 1;
    }
  }, [usedTurbo]);

  useInterval(
    () => {
      starting && setCountdown(countdown - 1);
      if (countdown < 1) {
        setStarted(true);
        setStarting(false);
        setPaused(false);
        setCountdown(3);
      }
      if (started && !paused) setRacetime(racetime + 1);
    },
    !usedTurbo ? 1200 : 200,
    starting,
    usedTurbo
  );
  useEffect(() => {
    if (laps > 7) setFinished(true);
  }, [laps]);

  useEffect(() => {
    if (!paused && !finished && racetime % 9 === 0) setLaps(l => l + 1);
  }, [racetime, paused, finished]);

  useKey((pressedKey: number, event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 27:
        setPaused(p => !p);
        break;
      case 32:
        if (
          savedTurbos.current < 1 ||
          savedPaused.current ||
          savedTurboActive.current
        )
          return;
        setUsedTurbo(true);
        setTimeout(() => setUsedTurbo(false), 3500);
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
      case 65:
        !savedPaused.current && setLane("left");
        break;
      case 68:
        !savedPaused.current && setLane("right");
        break;
      case 83:
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
      {started && (
        <Game data-testid="jogo">
          <Message>Voltas: {laps}/8</Message>
          <Message>Turbos: {savedTurbos.current}/3</Message>
          {usedTurbo && <Message>Turbo ativo!!</Message>}
          <Upcar lane={lane} data-testid="carro"></Upcar>
        </Game>
      )}
      {paused && started && !finished && (
        <Box>
          <Message>Jogo pausado!</Message>
        </Box>
      )}
      {finished && (
        <Box opacity="0.7">
          <Message>Fim de jogo!</Message>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
