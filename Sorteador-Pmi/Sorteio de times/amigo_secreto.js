document.addEventListener('DOMContentLoaded', () => {
    const entradaNome = document.getElementById('nameInput');
    const botaoAdicionarNome = document.getElementById('addNameBtn');
    const listaNomes = document.getElementById('nameList');
    const botaoSortear = document.getElementById('drawBtn');
    const resultado = document.getElementById('result');

    let nomes = []; // Array para armazenar os nomes

    // Função para adicionar um nome à lista
    botaoAdicionarNome.addEventListener('click', () => {
        const nome = entradaNome.value.trim();
        if (nome) {
            nomes.push(nome);
            atualizarListaNomes();
            entradaNome.value = ''; // Limpa o campo de entrada
        } else {
            alert('Por favor, insira um nome válido.');
        }
    });

    // Função para atualizar a lista de nomes exibida
    function atualizarListaNomes() {
        listaNomes.innerHTML = ''; // Limpa a lista atual
        nomes.forEach((nome, indice) => {
            const li = document.createElement('li');
            li.textContent = nome;

            // Botão de excluir
            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.addEventListener('click', () => {
                nomes.splice(indice, 1); // Remove o nome do array
                atualizarListaNomes(); // Atualiza a lista
            });

            li.appendChild(botaoExcluir);
            listaNomes.appendChild(li);
        });
    }

    // Função para sortear amigos secretos
    botaoSortear.addEventListener('click', () => {
        if (nomes.length < 2) {
            alert('É necessário pelo menos 2 nomes para realizar o sorteio.');
            return;
        }

        const nomesEmbaralhados = embaralharArray([...nomes]); // Cria uma cópia e embaralha
        const pares = {};

        // Cria pares de amigo secreto
        for (let i = 0; i < nomesEmbaralhados.length; i++) {
            const doador = nomesEmbaralhados[i];
            const receptor = nomesEmbaralhados[(i + 1) % nomesEmbaralhados.length]; // O próximo na lista
            pares[doador] = receptor;
        }

        // Exibe o resultado
        resultado.innerHTML = '<h3>Resultados do Sorteio:</h3>';
        for (const [doador, receptor] of Object.entries(pares)) {
            const p = document.createElement('p');
            p.textContent = `Parabéns ${doador}, seu amigo secreto é ${receptor}!`;
            resultado.appendChild(p);
        }
    });

    // Função para embaralhar um array
    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
        }
        return array;
    }
});