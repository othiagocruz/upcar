import React from "react";
import styled, { ThemeProvider } from "styled-components";
import upcar from "./carro.png";
import cenario from "./cenario.gif";
import { Theme } from "./theme";

export interface IUpcar {
  lane: "left" | "middle" | "right";
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${cenario}) center no-repeat;
  background-size: cover;
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
  return (
    <ThemeProvider theme={Theme}>
      <Background>
        <Upcar lane="middle"></Upcar>
      </Background>
    </ThemeProvider>
  );
}

export default App;
