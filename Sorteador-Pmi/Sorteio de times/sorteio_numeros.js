document.addEventListener('DOMContentLoaded', () => {
    let numerosSorteados = new Set(); // Armazena os números já sorteados
    let de, ate; // Variáveis para armazenar os limites de sorteio

    // Função para configurar os limites de sorteio
    function configurarLimites() {
        de = parseInt(document.getElementById('de').value);
        ate = parseInt(document.getElementById('ate').value);
    }

    document.getElementById('btn-sortear').addEventListener('click', () => {
        configurarLimites();
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const resultado = document.getElementById('resultado');

        // Verifica se os valores são válidos
        if (quantidade > 0 && de < ate && quantidade <= (ate - de + 1 - numerosSorteados.size)) {
            const novosNumerosSorteados = new Set();

            while (novosNumerosSorteados.size < quantidade) {
                const num = Math.floor(Math.random() * (ate - de + 1)) + de;
                if (!numerosSorteados.has(num)) { // Verifica se o número já foi sorteado
                    novosNumerosSorteados.add(num);
                }
            }

            // Adiciona os novos números sorteados ao conjunto de números já sorteados
            novosNumerosSorteados.forEach(num => numerosSorteados.add(num));

            resultado.textContent = `Números sorteados: ${Array.from(novosNumerosSorteados).join(', ')}`;
        } else {
            resultado.textContent = 'Por favor, insira valores válidos ou não há números disponíveis para sortear.';
        }
    });

    document.getElementById('btn-reiniciar').addEventListener('click', () => {
        numerosSorteados.clear(); // Limpa os números já sorteados
        document.getElementById('resultado').textContent = 'Números sorteados: nenhum até agora';
        alert('Os números foram reiniciados e estão disponíveis para novo sorteio.');
    });
});