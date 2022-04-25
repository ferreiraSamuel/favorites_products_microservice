
# Micro-serviço de Produtos Favoritos

A Magalu está expandindo seus negócios e uma das novas missões do time de
tecnologia é criar uma funcionalidade de Produtos Favoritos de nossos Clientes, em
que os nossos aplicativos irão enviar requisições HTTP para um novo backend que
deverá gerenciar nossos clientes e seus produtos favoritos.

#### Fluxograma e Diagrama
[https://whimsical.com/fluxograma-diagrama-db-U8QV1WALZjn6WjLfL9Vwr3](https://whimsical.com/fluxograma-diagrama-db-U8QV1WALZjn6WjLfL9Vwr3)


## Uso/Exemplos
Todo o projeto pode ser usado e testado pelo Swagger, na qual possibilita fazer as
consultas e consumir os end-points (substituindo por exemplo: Insomnia, Postman)

Obs: O microservice está exposto na porta 3001


**Acesse o Swagger:**
 ```bash
  http://localhost:3001/api/docs/
```


### Teste - Fluxo
- Crie um cliente no endpoint /client
- Faça a autenticação no endpoint /login e copie o access_token retornado pela API
- Adicione o access_token copiado para autenticar nos endpoints (Botão verde no inicio da tela "Authorize")

- Atualize seu usuário no endpoint /me (PATH)

- Adicione um produto na lista de favoritos no endpoint /favoritesProducts/{id} (POST)
- Consulte a lista de favoritos no endpoint favoritesProducts (GET)

## Stack utilizada

**Linguagem, Frameworks e libs:**

- NodeJS

- NestJS

- TypeORM

- Express

- Jest

- Swagger

- Typescript

- Axios

**Banco de dados:**

- Postgres



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/ferreiraSamuel/favorites_products_microservice.git
```

Entre no diretório do projeto

```bash
  cd favorites_products_microservice
```

Instale as dependências

```bash
  yarn install
```
Antes de prosseguir, renomeie o .env.example para .env e verifique as variáveis de ambiente de acordo com a seção abaixo 

Crie os containers do projeto

```bash
  docker-compose up
```

Com o container rodando, em outra aba do terminal, cria as tabelas do banco

```bash
  yarn migrate
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_USER:` admin

`DATABASE_HOST:` favorites_products_database

`DATABASE_NAME:` favorites_products

`DATABASE_PASSWORD:` 102030

`DATABASE_PORT:` 5432

`JWT_SECRET:` <cria sua jwt_secret>

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  # test
  yarn test

  # cobertura
  yarn test:cov
```


## Melhorias

Para melhor performance do micro-serviço, para trazer os produtos favoritados
de um cliente não foi consultado novamente na API de produtos, pois 
isso resultaria em muitas consultas na api de produtos, para contornar tal problema os produtos são
armazenados em uma tabela local (melhorando a performance e rapidez ao buscar
todos os produtos e blindando caso a API de produtos por algum motivo venha
a ficar indisponível por um breve período) 
e o produto é atualizado quando é salvo novamente. Porém é indicado
e essencial ter um cron-job para indexação e atualizar toda essa tabela de produtos.
