## UpChallenge: Desenvolvedor Front-end - Teste 1

Repositório com os arquivos do teste resolvido para vaga na Upnid.

## Instalação e comandos disponíveis

O projeto foi criado utilizando o [Create React App](https://github.com/facebook/create-react-app) sem ejetar, então todos os comandos da ferramenta funcionam aqui. Para começar a desenvolver basta instalar o [Node.js](https://nodejs.org/) e na raíz do projeto executar o comando `npm install`. Após instalado, o projeto pode ser iniciado em modo de desenvolvimento utilizando o comando `npm start`.

O projeto contem testes integrados, para rodá-los em modo de observação utilizar o comando `npm test`.

Para criar uma versão distribuível utilizar o comando `npm run build`, isto gerará um pacote de arquivos otimizados para distribuição na raíz do projeto, pasta build. Basta copiar os arquivos para algum servidor estático e o aplicativo estará disponível online.

## Estratégia

Escolhi o create-react-app para o projeto por sua facilidade de iniciar, desenvolver, testar e distribuir um aplicativo em React. Apesar de não ser um requisito comecei o projeto utilizando Typescript por boa prática, instalei o [Prettier](https://prettier.io/) com o [husky](https://github.com/typicode/husky/) para garantir um código mais organizado no pre-commit e fui atrás de algum hook para gerenciar o uso do teclado. Apesar de não estar "typado" acabei usando o [use-key-hook](https://github.com/haldarmahesh/use-key-hook/), resolvi o problema de tipagem dele declarando o módulo no arquivo `src/declarations.d.ts`.

Criei um hook usando o setTimeout para gerenciar os "ticks" do jogo, dando a impressão de que existe passagem de tempo nele. O hook basicamente chama um callback a cada x tempo (parametro delay), armazenando o timeout em uma ref para que não seja refeito a cada render e limpando o timeout caso alguma dependência altere seu valor. Com isso consegui controlar aspectos do jogo como a contagem regressiva inicial, o pause, o turbo, a contagem de tempo de corrida para determinar a quantidade de voltas (1 tick = 1200ms, 9 ticks = 1 volta) e o final da corrida. Para o turbo eu aumento o tick rate em 6x por 3500ms, foi a melhor razão que encontrei para evidenciar o uso e todo fusquinha merece ser um foguete.

Com tudo isso resolvido comecei a escrever testes integrados para validar os componentes. Acabei focando mais em demonstrar o uso do RTL com o Jest e não em refatorar meu trabalho inicial e separar os componentes de forma mais organizada para deixar os testes mais claros. Enquanto criava um teste para o uso das teclas determinadas percebi que não estava considerando letras minúsculas, ou seja o jogo só funcionava com capslock ligado. Corrigi isso usando o código do evento fornecido pelo callback do use-key-hook invês do parametro que ele envia. Com os componentes separados apropriadamente ficaria mais fácil de criar outros cenários de teste e tambem mockar a funcionalidade dos ticks.

Finalmente, escolhi o github pages para publicar o projeto usando um repositório público da minha conta.

## Nice to haves implementados (8/13)

- **Pause** **→** ✅
- **Obstáculos** **→** Achei que tomaria muito tempo para implementar sem bugs. Basicamente precisaria de uma matrix 3x3 que comparasse a posição do carro com o obstáculo, mexesse os obstaculos a cada tick e se estiver no mesmo "left" do carro bater. O problema estaria mais em determinar uma logica para os obstáculos aparecerem, quantas vezes o carro poderia bater, diminuir a velocidade quando bater, enfim muitas regras não determinadas :P
- **Turbo** **→** ✅ Apertar espaço pra ativar o turbo
- **Mobile** **→** ✅ Tocar nas laterais para alternar pista, em cima para o turbo.
- **Número de Voltas** **→** ✅
- **Multiplayer →** Acabei focando mais no frontend
- **Leaderboard →** Mesmo caso, mais foco no frontend
- **Apenas CSS →** Tomaria muito tempo.
- **Fim de Corrida →** ✅
- **Link Público →** ✅
- **Stack Upnid →** ✅
- **Documentação →** ✅
- **Testes →** ✅
