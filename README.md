# Movie Parsing API

#### Autor: Felipe Lacerda Fernandes de Assis

#### Documento: [Link para o documento]()

## Requisitos

| `Requisitos`                              |
| :---------------------------------------- |
| `Node.js: Versão 18 ou superior`          |
| `Extensões do Visual Studio Code: DotENV` |

## Guia de execução

**1. Clonar o Repositório**

```bash
git clone https://github.com/FelipeLacerda500/movie-parsing-api.git
```

**2. Navegar até o Diretório do Projeto**

```bash
cd movie-parsing-api
```

**3. Instalar Dependências**

```bash
npm install
```

**4. Iniciar o Servidor de Desenvolvimento**

```bash
npm run dev
```

## Rotas da API

- `GET /filmes` - Retorna uma lista de filmes com as seguintes transformações:

  - Lucro: Calculado com base nas propriedades "orcamento" e "bilheteria", apresentado como uma string formatada.

  - Premiação de maior relevância: Exibe a premiação mais relevante com base na propriedade "relevância".

  - Duração em Segundos: Converte a duração dos filmes de minutos para segundos.

  - Nota IMDb: Apresenta a nota numérica do IMDb.

  - Sinopse: Retorna a sinopse em Português (Brasil), se disponível; caso contrário, retorna em inglês ou outro idioma disponível.

  - Remoção de Propriedades: A resposta exclui propriedades "locações", "poster" e "trailer".
