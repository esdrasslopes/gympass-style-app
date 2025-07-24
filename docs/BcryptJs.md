# Bcryptjs

É uma biblioteca JavaScript que trabalha com hash de senhas, sendo fundamental para armazená-las de forma segura em aplicações.

## Download

Por ser uma biblioteca javascript, é necessário instalar tanto a biblioteca `npm i bycriptjs`, quanto os tipos typescript dentro dela `npm i -D @types/bcryptjs`

## Método hash

O bcrypt tem um método chamado hash. Esse método retorna uma Promise, que aceita como primeiro parâmetro o valor a ser "hashado". Como segundo parâmetro, aceita um salt (um valor aleatório adicionado à senha antes de iniciar o hash) ou um round (que define o número de iterações internas do algoritmo, aumentando o custo computacional e o tempo para gerar o hash, buscando maior segurança).

```typescript
const password_hash = await hash(
  password,
  6 | "valor a ser adicionado no hash"
);
```
