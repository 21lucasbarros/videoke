// Elementos
const campoPesquisa = document.getElementById('pesquisa');
const listaMusicas = document.getElementById('lista-musicas');
const paginacao = document.getElementById('paginacao');
let musicas = [];
let musicasFiltradas = [];

// Função para carregar músicas do JSON
async function carregarMusicas() {
    try {
        const resposta = await fetch('./musicas.json');
        musicas = await resposta.json();
        ordenarMusicas();
        musicasFiltradas = [...musicas];
        exibirMusicas(1);
    } catch (erro) {
        console.error('Erro ao carregar as músicas:', erro);
    }
}

// Função para ordenar músicas
function ordenarMusicas() {
    musicas.sort((a, b) => a.interprete.localeCompare(b.interprete));
}

// Função para exibir músicas com paginação
function exibirMusicas(pagina) {
    const inicio = (pagina - 1) * 25;
    const fim = inicio + 25;
    const musicasPaginas = musicasFiltradas.slice(inicio, fim);

    // Limpa a lista atual
    listaMusicas.innerHTML = '';
    musicasPaginas.forEach(musica => {
        const item = document.createElement('li');
        item.textContent = `${musica.interprete} - ${musica.titulo} - ${musica.codigo}`;
        listaMusicas.appendChild(item);
    });

    // Atualiza os links de paginação
    gerarPaginacao(musicasFiltradas.length, pagina);
}

// Função para gerar links de paginação com no máximo 6 páginas por vez
function gerarPaginacao(total, paginaAtual) {
    paginacao.innerHTML = '';
    const totalPaginas = Math.ceil(total / 25);
    const paginasPorIntervalo = 6;

    // Determinar intervalo atual
    const intervaloAtual = Math.ceil(paginaAtual / paginasPorIntervalo);
    const inicioIntervalo = (intervaloAtual - 1) * paginasPorIntervalo + 1;
    const fimIntervalo = Math.min(inicioIntervalo + paginasPorIntervalo - 1, totalPaginas);

    // Botão "Anterior"
    if (intervaloAtual > 1) {
        const anterior = document.createElement('a');
        anterior.textContent = 'Anterior';
        anterior.href = '#';
        anterior.addEventListener('click', () => {
            const primeiraPaginaAnterior = inicioIntervalo - paginasPorIntervalo;
            exibirMusicas(primeiraPaginaAnterior);
        });
        paginacao.appendChild(anterior);
    }

    // Links das páginas no intervalo atual
    for (let i = inicioIntervalo; i <= fimIntervalo; i++) {
        const link = document.createElement('a');
        link.textContent = i;
        link.href = '#';
        if (i === paginaAtual) {
            link.classList.add('ativo');
        }
        link.addEventListener('click', () => exibirMusicas(i));
        paginacao.appendChild(link);
    }

    // Botão "Próximo"
    if (fimIntervalo < totalPaginas) {
        const proximo = document.createElement('a');
        proximo.textContent = '...';
        proximo.href = '#';
        proximo.addEventListener('click', () => {
            const primeiraPaginaProxima = fimIntervalo + 1;
            exibirMusicas(primeiraPaginaProxima);
        });
        paginacao.appendChild(proximo);
    }
}

// Função para filtrar músicas
campoPesquisa.addEventListener('input', () => {
    const termoBusca = campoPesquisa.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    musicasFiltradas = musicas.filter(musica =>
        musica.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(termoBusca) || 
        musica.interprete.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(termoBusca) || 
        musica.codigo.toString().includes(termoBusca)
    );
    exibirMusicas(1); // Reinicia na primeira página do filtro
});

// Carrega as músicas ao iniciar
carregarMusicas();