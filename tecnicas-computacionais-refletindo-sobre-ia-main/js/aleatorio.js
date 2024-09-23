const nomes = ["Fernanda", "Giuliana", "Maria Eduarda", "Marcelo", "Amanda", "Gustavo", "Gabriel"]; //cria uma variavel com os nomes que aparecem na tela - nomes da equipe aqui

export function aleatorio (lista){ // função para selecionar um nome aleatorio para colocar na tela
    const posicao = Math.floor(Math.random()* lista.length);
    return lista[posicao];
}

export const nome = aleatorio(nomes)