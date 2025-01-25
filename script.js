const campoPesquisa = document.getElementById('pesquisa');
const listaMusicas = document.getElementById('lista-musicas'); // Referência para a tabela
const paginacao = document.getElementById('paginacao');
let musicas = [];
let musicasFiltradas = [];
const itensPorPagina = 25;
const paginasPorIntervalo = 4;
let paginaAtual = 1;

// Função para carregar músicas do JSON
async function carregarMusicas() {
    try {
        const resposta = await fetch('./musicas.json');
        musicas = await resposta.json();
        ordenarMusicas();
        musicasFiltradas = [...musicas];
        exibirMusicas(paginaAtual);
    } catch (erro) {
        console.error('Erro ao carregar as músicas:', erro);
    }
}

// Função para ordenar músicas por banda/cantor
function ordenarMusicas() {
    musicas.sort((a, b) => a.interprete.localeCompare(b.interprete));
}

// Função para exibir músicas com paginação
function exibirMusicas(pagina) {
    paginaAtual = pagina;
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const musicasPagina = musicasFiltradas.slice(inicio, fim);

    // Atualiza a tabela de músicas
    const corpoTabela = listaMusicas.querySelector('tbody');
    corpoTabela.innerHTML = ''; // Limpa a tabela
    musicasPagina.forEach(musica => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${musica.interprete}</td>
            <td>${musica.titulo}</td>
            <td>${musica.codigo}</td>
        `;
        corpoTabela.appendChild(linha);
    });

    gerarPaginacao(musicasFiltradas.length, paginaAtual);
}

// Função para gerar links de paginação com intervalo limitado de páginas
function gerarPaginacao(totalItens, paginaAtual) {
    paginacao.innerHTML = '';
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);
    const intervaloAtual = Math.ceil(paginaAtual / paginasPorIntervalo);
    const inicioIntervalo = (intervaloAtual - 1) * paginasPorIntervalo + 1;
    const fimIntervalo = Math.min(inicioIntervalo + paginasPorIntervalo - 1, totalPaginas);

    // Botão "Anterior"
    if (paginaAtual > 1) {
        const anteriorPagina = criarBotaoPaginacao('Anterior', paginaAtual - 1);
        paginacao.appendChild(anteriorPagina);
    }
    
    // Links das páginas no intervalo atual
    for (let i = inicioIntervalo; i <= fimIntervalo; i++) {
        const linkPagina = criarBotaoPaginacao(i, i, i === paginaAtual);
        paginacao.appendChild(linkPagina);
    }

    // Botão "Próximo"
    if (paginaAtual < totalPaginas) {
        const proximaPagina = criarBotaoPaginacao('Próximo', paginaAtual + 1);
        paginacao.appendChild(proximaPagina);
    }
}

// Função auxiliar para criar botões de paginação
function criarBotaoPaginacao(texto, pagina, isAtivo = false) {
    const link = document.createElement('a');
    link.textContent = texto;
    link.href = '#';
    link.classList.add('paginacao-link');
    if (isAtivo) {
        link.classList.add('ativo');
    }
    link.addEventListener('click', (evento) => {
        evento.preventDefault();
        exibirMusicas(pagina);
    });
    return link;
}

// Função para filtrar músicas
campoPesquisa.addEventListener('input', () => {
    const termoBusca = campoPesquisa.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    musicasFiltradas = musicas.filter(musica =>
        musica.titulo.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(termoBusca) ||
        musica.interprete.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(termoBusca) ||
        musica.codigo.toString().includes(termoBusca)
    );
    exibirMusicas(1);
});

// Carrega as músicas ao iniciar
carregarMusicas();
