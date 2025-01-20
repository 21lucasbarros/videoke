// Elementos
const campoPesquisa = document.getElementById('pesquisa');
const listaMusicas = document.getElementById('lista-musicas');
const paginacao = document.getElementById('paginacao');
let musicas = [];

// Função para carregar músicas do JSON
async function carregarMusicas() {
    try {
        const resposta = await fetch('./musicas.json'); // Carrega o JSON
        musicas = await resposta.json(); // Converte para objeto JavaScript
        exibirMusicas(1); // Exibe a primeira página ao carregar
    } catch (erro) {
        console.error('Erro ao carregar as músicas:', erro);
    }
}

// Função para exibir músicas com paginação
function exibirMusicas(pagina) {
    const inicio = (pagina - 1) * 25;
    const fim = inicio + 25;
    const musicasPaginas = musicas.slice(inicio, fim);

    // Limpa a lista atual
    listaMusicas.innerHTML = '';
    musicasPaginas.forEach(musica => {
        const item = document.createElement('li');
        item.textContent = `${musica.numero} - ${musica.nome} - ${musica.artista}`;
        listaMusicas.appendChild(item);
    });

    // Atualiza os links de paginação
    gerarPaginacao(musicas.length, pagina);
}

// Função para gerar links de paginação
function gerarPaginacao(total, paginaAtual) {
    paginacao.innerHTML = '';
    const totalPaginas = Math.ceil(total / 25);

    for (let i = 1; i <= totalPaginas; i++) {
        const link = document.createElement('a');
        link.textContent = i;
        link.href = '#';
        if (i === paginaAtual) {
            link.classList.add('ativo');
        }
        link.addEventListener('click', () => exibirMusicas(i));
        paginacao.appendChild(link);
    }
}

// Função para filtrar músicas
campoPesquisa.addEventListener('input', () => {
    const termoBusca = campoPesquisa.value.toLowerCase();
    const musicasFiltradas = musicas.filter(musica =>
        musica.nome.toLowerCase().includes(termoBusca) || 
        musica.artista.toLowerCase().includes(termoBusca) || 
        musica.numero.toString().includes(termoBusca)
    );
    gerarPaginacao(musicasFiltradas.length, 1);
    listaMusicas.innerHTML = '';
    musicasFiltradas.slice(0, 25).forEach(musica => {
        const item = document.createElement('li');
        item.textContent = `${musica.numero} - ${musica.nome} - ${musica.artista}`;
        listaMusicas.appendChild(item);
    });
});

// Carrega as músicas ao iniciar
carregarMusicas();
