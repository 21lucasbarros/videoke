# Videoke Luis Pinguim

O **Videoke Luis Pinguim** é um projeto que fiz para o meu pai, para que as pessoas possam escolher as músicas para cantar no videokê. A aplicação tem uma lista de músicas com os intérpretes, códigos e letras, além de uma pesquisa que facilita encontrar a canção que a pessoa quer.

## Estrutura do Projeto

A estrutura do diretório do projeto é a seguinte:

```
lucasweacked-videoke/
├── README.md
├── index.html
├── musicas.json
├── script.js
└── style.css
```

- `index.html`: Arquivo principal do projeto, onde a estrutura HTML é definida.
- `musicas.json`: Arquivo JSON contendo a lista de músicas, incluindo informações como intérprete, código, título e letra.
- `script.js`: Arquivo JavaScript que carrega as músicas, aplica a lógica de pesquisa e paginação.
- `style.css`: Arquivo de estilos CSS que define a aparência da aplicação.

## Como Usar

1. **Clonando o Repositório**  
   Para começar, clone o repositório para a sua máquina local:

   ```bash
   git clone https://github.com/lucasweacked/videoke.git
   ```

2. **Abrindo o Projeto**  
   Após clonar o repositório, abra o arquivo `index.html` no seu navegador.

3. **Buscando Músicas**  
   Utilize o campo de pesquisa para buscar músicas pelo nome do artista, título ou código. A lista de músicas será filtrada automaticamente conforme a pesquisa.

4. **Paginação**  
   O projeto inclui um sistema de paginação que exibe até 25 músicas por página. Navegue entre as páginas usando os botões de navegação.

## Funcionalidades

- **Pesquisa**: Permite buscar músicas por título, intérprete ou código.
- **Paginações**: Exibe até 25 músicas por página e permite navegar entre elas.
- **Interface Responsiva**: A interface se ajusta a diferentes tamanhos de tela para uma boa experiência de usuário em dispositivos móveis e desktop.

## Tecnologias Usadas

- **HTML**: Estrutura básica da aplicação.
- **CSS**: Estilização da página e layout responsivo.
- **JavaScript**: Lógica para carregar, filtrar e paginar as músicas.
- **JSON**: Armazenamento dos dados das músicas (interprete, título, código, etc.).

## Exemplo de Música no JSON

```json
{
  "interprete": "Red Hot Chili Peppers",
  "codigo": "4816",
  "titulo": "CALIFORNICATION",
  "letra": "Psychic spies from Chi...",
  "idioma": "EUA"
}
```

## Contribuindo

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, basta seguir os seguintes passos:

1. Faça um fork deste repositório.
2. Crie uma branch para a sua modificação (`git checkout -b minha-modificacao`).
3. Faça o commit das suas alterações (`git commit -am 'Adicionando minha modificação'`).
4. Envie a branch para o repositório remoto (`git push origin minha-modificacao`).
5. Abra um pull request.

##
