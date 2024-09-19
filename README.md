# Movie Parsing API

#### Autor: Felipe Lacerda Fernandes de Assis

#### Documento com a explicação do desafio: [Link para o documento](https://drive.google.com/file/d/1HI8SdRSc4ARPcGj28F-dpWgy9twOQyuf/view?usp=sharing)

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

## Scripts

- dev: Inicia o servidor em modo de desenvolvimento com recarregamento automático.

  ```bash
  npm run dev
  ```

- precommit-lint: Executa o linting dos arquivos que serão commitados, garantindo que o código siga as regras de estilo definidas.

  ```bash
  npm run precommit-lint
  ```

- prepare: Configura o Husky para gerenciar hooks de Git, como pre-commit e pre-push.

  ```bash
  npm run prepare
  ```

- build: Compila o código TypeScript em JavaScript, minifica os arquivos de saída e limpa o diretório de distribuição anterior.

  ```bash
  npm run build
  ```

- test: Executa todos os testes definidos na aplicação.

  ```bash
  npm run test
  ```

- test:watch: Executa os testes em modo de observação, reiniciando automaticamente sempre que há mudanças no código.

  ```bash
  npm run test:watch
  ```

- test:ui: Executa os testes com uma interface de usuário interativa, facilitando a visualização dos resultados.

  ```bash
  npm run test:ui
  ```
