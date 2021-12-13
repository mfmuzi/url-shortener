# URL Shortener

Este projeto teve como objetivo criar um encurtador de URL com NodeJS, Typescript e MongoDB para a base de dados.

Utilizei o supervisor no lugar do nodemon para conexão com o banco de dados e fiz o redirecionamento do erro 400 para uma página personalizada.



## Rodando o projeto

Na pasta raiz digite os comandos:

- `npm install`
- `npm run build:watch`
- `npm run dev`



### Conexão om o MongoDB:

Substituir os parâmetros no arquivo Constants.ts:

```
mongodb+srv://<user>:<password>@<database>.q5vfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

- Substitua <user> pelo nome do usuário do banco de dados.

- Substitua <password> pela senha do banco de dados.

- Substitua <database> pelo nome do banco de dados.

- Substitua myFirstDatabase pelo nome do banco de dados.



### Executando o encurtador

Após a conexão com o MongoDB:

- realizar o post da URL a ser encurtada pelo Postman ou Insomnia:

```
http://localhost:5000/shorten

com o corpo:
{
"originURL":"URL para encurtar"
}
```

Como saída temos a URL encurtada.
