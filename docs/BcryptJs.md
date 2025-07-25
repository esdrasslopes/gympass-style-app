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

## Método compare

O método `compare` do Bcrypt recebe dois argumentos. O primeiro é uma `string` (a senha em texto puro), e o segundo é um `hash` (a senha hashada que foi armazenada). O `compare` verifica se o hash fornecido foi gerado a partir do valor em texto puro específico, e retorna `true` se corresponder, ou `false` caso contrário.

**Exemplo:**

```typescript
// Supondo que 'registerUseCase.execute' cria e retorna um usuário com a senha já hashada
const { user } = await registerUseCase.execute({
  name: "John Doe",
  email: "johndoe@example.com",
  password: "123456", // Senha em texto puro fornecida pelo usuário
});

// 'compare' verifica se "123456" corresponde ao 'user.password_hash' armazenado
const isPasswordCorrectlyHash = await compare("123456", user.password_hash);

// isPasswordCorrectlyHash será 'true' se a senha estiver correta, 'false' caso contrário
if (isPasswordCorrectlyHash) {
  console.log("Senha correta!");
} else {
  console.log("Senha incorreta!");
}
```
