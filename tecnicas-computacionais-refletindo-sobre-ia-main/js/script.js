import { aleatorio, nome } from './aleatorio.js'; //importa o script aleatorio
import { perguntas } from './perguntas.js'; // importa as perguntas

const caixaPrincipal = document.querySelector(".caixa-principal"); //define a varivel equivalente a mesma classe no html
const caixaPerguntas = document.querySelector(".caixa-perguntas"); //define a varivel equivalente a mesma classe no html
const caixaAlternativas = document.querySelector(".caixa-alternativas"); //define a varivel equivalente a mesma classe no html
const caixaResultado = document.querySelector(".caixa-resultado"); //define a varivel equivalente a mesma classe no html
const textoResultado = document.querySelector(".texto-resultado"); //define a varivel equivalente a mesma classe no html
const botaoJogarNovamente = document.querySelector(".novamente-btn"); //define a varivel equivalente a mesma classe no html
const botaoIniciar = document.querySelector(".iniciar-btn"); //define a varivel equivalente a mesma classe no html
const telaInicial = document.querySelector(".tela-inicial"); //define a varivel equivalente a mesma classe no html

let atual = 0; // cira a variavel atual
let perguntaAtual; // cira a variavel perguntaAtual
let historiaFinal = ""; // cira a variavel historiaFinal

botaoIniciar.addEventListener('click', iniciaJogo); // verifica se o botao iniciar foi clicado

function iniciaJogo() { // cria a tela inicial
    atual = 0; //reseta o valor de atual 
    historiaFinal = ""; //reseta a historia
    telaInicial.style.display = 'none'; // esconde os displays dentro da tela
    caixaPerguntas.classList.remove("mostrar"); // esconde a caixa de perguntas
    caixaAlternativas.classList.remove("mostrar"); // esconde a caixa de alternatvas
    caixaResultado.classList.remove("mostrar"); // esconde a caixa de resultado
    mostraPergunta(); //ativa a função motraPergunta
}

function mostraPergunta() { // faz as perguntas aparecerem na tela e armazena seu resultado
    if (atual >= perguntas.length) { //verifica se a variavel atual e maior que o numero de perguntas - se sim mostra o resultado
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual]; // pega uma pergunta se basendo no velor dentro da varivel atual
    caixaPerguntas.textContent = perguntaAtual.enunciado; // mosta o enunciado das perguntas
    caixaAlternativas.textContent = ""; // mostra as alternativas
    mostraAlternativas(); // ativa a função das alternativas
}

function mostraAlternativas() { // função das alternativas
    for (const alternativa of perguntaAtual.alternativas) { //pega o valor dentro da lista(variavel) alternativas
        const botaoAlternativas = document.createElement("button"); // cria o elemetno botao dentro das alternativas
        botaoAlternativas.textContent = alternativa.texto; // pega o texto das alternativas
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa)); // verifica de o botão das alternativas foi clicado
        caixaAlternativas.appendChild(botaoAlternativas); //adiciona o botao das alternativas a caixa das alternativas
    }
}

function respostaSelecionada(opcaoSelecionada) { // função para definir qual resposta foi selecionada
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao); // pega qual resposta foi selecionada
    historiaFinal += afirmacoes + " "; // adiciona a resposta a historia final
    if (opcaoSelecionada.proxima !== undefined) { // verifica se existem mais opções de respostas a serem selecionadas, se sim coloca o valor da proxima na variavel atual - se nao mostra o resultado das escolhas
        atual = opcaoSelecionada.proxima;  //se sim coloca o valor da proxima na variavel atual 
    } else {
        mostraResultado(); //se nao mostra o resultado das escolhas
        return; // retorna o valor para ser mostrada
    }
    mostraPergunta(); // executa a função para mostrar as perguntas - so funciona enquando houver perguntas a serem selecionadas
}
 
function mostraResultado() { // função para mostrar o resultado no final - apos as perguntas e respostas
    caixaPerguntas.textContent = `Em 2049, ${nome}`; // cria o texto inicial e adiciona o nome sorteado
    textoResultado.textContent = historiaFinal; // pega o valor da variavel historiaFinal e o coloca no textoResultado
    caixaAlternativas.textContent = ""; // limpa a caixa das alternativas
    caixaResultado.classList.add("mostrar"); // faz com que o resultado final apareça na tela
    botaoJogarNovamente.addEventListener("click", jogaNovamente); // coloca o botao jogarNovamente na tela e espera ate ele ser clicado
}

function jogaNovamente() {
    atual = 0; //reseta o valor de atual 
    historiaFinal = ""; //reseta a historia
    caixaResultado.classList.remove("mostrar"); // esconde a caixa de resultado
    mostraPergunta(); // ativa a função para mostrar perguntas
}

function substituiNome() { // função para substituir a palavro você nos enunciados da pergunta para o nome sorteado
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

substituiNome(); // ativa a função para substituir o nome