import {
  fireEvent,
  render,
  waitForDomChange,
  waitForElement
} from "@testing-library/react";
import React from "react";
import App from "./App";

test("Renderiza a mensagem inicial", () => {
  const { getByText } = render(<App />);
  const welcome = getByText(/Entre com seu nome para começar/i);
  expect(welcome).toBeInTheDocument();
});

test("Clicar no botão começa o jogo", async () => {
  const { getByText, getByTestId } = render(<App />);
  const button = getByText(/Iniciar Corrida/i);

  fireEvent.click(button);

  const contagem = await waitForElement(() => getByText("3"));
  expect(contagem).toBeInTheDocument();

  const valendo = await waitForElement(() => getByText("Valendo!!"));
  expect(valendo).toBeInTheDocument();

  await waitForDomChange();

  const jogo = getByTestId("jogo");
  expect(jogo).toBeInTheDocument();
});
test("Após início do jogo, ASD e setas movem o carro e ESC pausa o jogo", async () => {
  const { getByText, getByTestId, debug } = render(<App />);
  const button = getByText(/Iniciar Corrida/i);

  fireEvent.click(button);

  const contagem = await waitForElement(() => getByText("3"));
  expect(contagem).toBeInTheDocument();

  const valendo = await waitForElement(() => getByText("Valendo!!"));
  expect(valendo).toBeInTheDocument();

  await waitForDomChange();

  const jogo = getByTestId("jogo");
  expect(jogo).toBeInTheDocument();

  const carro = getByTestId("carro");
  expect(carro).toHaveStyle("left: 41.5%");
  fireEvent.keyDown(document.body, {
    key: "a",
    code: "KeyA",
    keyCode: 65
  });
  expect(carro).toHaveStyle("left: 10%");

  fireEvent.keyDown(document.body, {
    key: "ArrowRight",
    code: "ArrowRight",
    keyCode: 39
  });
  expect(carro).toHaveStyle("left: 41.5%");

  fireEvent.keyDown(document.body, {
    key: "ArrowRight",
    code: "ArrowRight",
    keyCode: 39
  });
  expect(carro).toHaveStyle("left: 65%");

  fireEvent.keyDown(document.body, {
    key: "d",
    code: "KeyD",
    keyCode: 83
  });
  expect(carro).toHaveStyle("left: 41.5%");

  fireEvent.keyDown(document.body, {
    key: "Escape",
    code: "Escape",
    keyCode: 27
  });
  const pausado = await waitForElement(() => getByText("Jogo pausado!"));
  expect(pausado).toBeInTheDocument();
});
