document.addEventListener("DOMContentLoaded", () => {
    const menuDiv = document.querySelector(".menu-container");
    const gameDiv = document.querySelector(".game-container");

    const novoJogoBtn = document.getElementById("novo-jogo-btn");
    const continuarJogoBtn = document.getElementById("continuar-jogo-btn");

    // Função para mostrar a tela do jogo e esconder o menu
    function mostrarJogo() {
        menuDiv.style.display = "none";
        gameDiv.style.display = "block";
    }

    // Função para mostrar o menu e esconder o jogo
    function mostrarMenu() {
        menuDiv.style.display = "block";
        gameDiv.style.display = "none";
    }

    // Inicia um novo jogo, apagando dados salvos
    novoJogoBtn.addEventListener("click", () => {
        localStorage.clear();  // Limpa o progresso salvo
        mostrarJogo();  // Vai para a tela do jogo
        inicializarJogo();  // Reinicia o jogo com valores padrão
    });

    // Continua o jogo, carregando os dados salvos
    continuarJogoBtn.addEventListener("click", () => {
        mostrarJogo();
        inicializarJogo();  // Carrega o jogo com o progresso salvo
    });

    // Função para inicializar o jogo
    function inicializarJogo() {
        // Função para salvar o progresso
        function salvarProgresso(btc, btcPorClique, btcPorSegundo) {
            localStorage.setItem('btc', btc);
            localStorage.setItem('btcPorClique', btcPorClique);
            localStorage.setItem('btcPorSegundo', btcPorSegundo);
        }

        // Função para carregar o progresso
        function carregarProgresso() {
            let btc = localStorage.getItem('btc');
            let btcPorClique = localStorage.getItem('btcPorClique');
            let btcPorSegundo = localStorage.getItem('btcPorSegundo');

            return {
                btc: btc ? parseFloat(btc) : 0,
                btcPorClique: btcPorClique ? parseInt(btcPorClique) : 1,
                btcPorSegundo: btcPorSegundo ? parseInt(btcPorSegundo) : 0
            };
        }

        let { btc, btcPorClique, btcPorSegundo } = carregarProgresso();

        const btcDisplay = document.getElementById("btc");
        const hackearBtn = document.getElementById("hackear");
        const upgradeCliqueBtn = document.getElementById("upgrade-clique");
        const upgradeAutoBtn = document.getElementById("upgrade-auto");

        function atualizarDisplay() {
            btcDisplay.innerText = `BTC: ${btc}`;
        }

        hackearBtn.addEventListener("click", () => {
            btc += btcPorClique;
            atualizarDisplay();
            salvarProgresso(btc, btcPorClique, btcPorSegundo);
        });

        upgradeCliqueBtn.addEventListener("click", () => {
            if (btc >= 10) {
                btc -= 10;
                btcPorClique += 1;
                atualizarDisplay();
                salvarProgresso(btc, btcPorClique, btcPorSegundo);
            }
        });

        upgradeAutoBtn.addEventListener("click", () => {
            if (btc >= 50) {
                btc -= 50;
                btcPorSegundo += 1;
                atualizarDisplay();
                salvarProgresso(btc, btcPorClique, btcPorSegundo);
            }
        });

        setInterval(() => {
            btc += btcPorSegundo;
            atualizarDisplay();
            salvarProgresso(btc, btcPorClique, btcPorSegundo);
        }, 1000);

        atualizarDisplay();
    }

    mostrarMenu();  // Exibe o menu quando a página é carregada
});
