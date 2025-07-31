# JWT

O token JWT (JSON Web Token), serve como um token de identificação. Ele é como um crachá que otimiza o fluxo de autenticação e autorização no sistema, especialmente em APIs stateless (sem estado). Ao invés de utilizar dados do usuário diretamente (que exigiriam consultas ao banco de dados para cada requisição para verificar a sessão), o token é utilizado como forma de identificação.

## Fluxo

O fluxo para a utilização de um token JWT é a seguinte:

- **Login:** o usuário faz login, envia email/senha, o back-end cria um token ÚNICO, não-modificável e STATELESS.

- **Stateless:** não armazenado em nenhuma estrutura de persistência de dados (banco de dados).

- **Back-end:** quando o token for criado, ele utiliza uma palavra-chave de algum formato de dado, sendo assim o sistema pode validar algum token enviado.

- **Palavra-chave:** uma palavra chave é alguma base utilizada para a criação do token.

## Como é formado

Um token JWT é formado pelo Header da aplicação, por um conjunto de claims (que são declarações sobre a entidade que está utilizando o token - que formam o Payload), e uma palavra-chave secreta. Ao juntar o Header codificado, o Payload codificado e a palavra-chave secreta, é formada a Assinatura (Signature), que é um hash criptográfico. Finalmente, ao concatenar o Header, o Payload e a Assinatura (todos codificados em Base64, separados por pontos), é criado o token JWT final.

## Estrutura

Um JWT é uma string compacta dividida em três partes separadas por pontos (`.`), cada uma delas codificada em Base64Url:

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
A primeira parte é o header da aplicação:
```

### A Primeira Parte: Header (Cabeçalho)

É o cabeçalho da aplicação. Contém metadados sobre o token.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

No header, as propriedades são:

alg (Algorithm): O algoritmo de hashing e assinatura utilizado para gerar a assinatura do token (no exemplo, HMAC com SHA-256).

typ (Type): O tipo de token, que é JWT.

### A Segunda Parte: Payload (Carga)

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```

Dentro do payload, estão as claims (informações ou declarações) sobre a entidade (geralmente um usuário) que está utilizando o token, além de metadados adicionais como tempo de expiração. O payload é um objeto JSON.

### A Terceira Parte: Signature (Assinatura)

É a assinatura do token. A assinatura é criada a partir do Header codificado em Base64Url, do Payload codificado em Base64Url e de uma chave secreta (conhecida apenas pelo servidor). O resultado desse processo de hashing e assinatura criptográfica é a Signature.

Exemplo de uma Chave Secreta: `a-string-secret-at-least-256-bits-long`
(Esta string é um exemplo de uma chave secreta usada para gerar a assinatura, e não a assinatura em si. A assinatura é a terceira parte da string JWT codificada).

## JWT no Fastify

O fastify tem um pluggin que facilita a utilização de JWT nnas aplicações. Para baixar basta dar comando `npm i @fastify/jwt`

### Configuração

```typescript
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
```

Após registrar o uso do fastifyJwt, é necessário passar a palavra-chave que será usada dentro dos tokens. Esse valor é passado para a chave secret, no objeto de configuração do fastifyJwt.

### Como criar

Um token é criado a partir do método `jwtSign` que fica dentro da resposta da requisição. Esse método aceita dois parâmetros, sendo um os payloads e o segundo um objeto de configuração. Ex:

```typescript
// Suponha que você tem os dados do usuário autenticado:
const userLogged = {
  id: "user-01",
  name: "João Silva",
  email: "joao@example.com",
  role: "member",
};

// ... dentro de uma rota Fastify, após a autenticação ...

const token = await reply.jwtSign(
  // PRIMEIRO OBJETO: O payload "principal" ou personalizado
  // Aqui vão as claims que você quer adicionar diretamente do seu domínio/lógica
  {
    name: userLogged.name,
    role: userLogged.role,
    // Note: 'id' não é 'sub'. 'sub' é injetado abaixo nas opções de assinatura.
  },
  // SEGUNDO OBJETO: As opções de assinatura
  // Contém claims padrão da JWT e outras configurações da assinatura
  {
    sign: {
      sub: userLogged.id, // <--- Claim "sub" (subject) padrão da JWT. Será injetada no payload. Ela se refere a entidade que o token pertence.
      expiresIn: "10m", // <--- Claim "exp" (expiration time) padrão. O token expira em 10 minutos.
    },
  }
);
```

### Principais Propriedades de Assinatura (Sign Options) do JWT

A seguir, as principais propriedades que você pode configurar dentro do objeto `sign`:

---

### `sub` (Subject)

- **O que faz:** Identifica o **principal do token** (o "assunto"). Geralmente, é o **ID único do usuário** ou da entidade a quem o token se refere.
- **Tipo:** `string`
- **Exemplo:** `sub: user.id`

---

### `expiresIn` (Expiration Time)

- **O que faz:** Define o **tempo de expiração** do token. Após este período, o token se torna inválido.
- **Tipo:** `string` (ex: `'1h'`, `'10m'`, `'2d'`) ou `number` (em segundos).
- **Exemplo:** `expiresIn: '10m'` (token expira em 10 minutos)

---

### `jti` (JWT ID)

- **O que faz:** Fornece um **identificador único para o JWT**. Pode ser usado para evitar ataques de repetição de token ou para implementar listas de revogação.
- **Tipo:** `string`
- **Exemplo:** `jti: randomUUID()` (se você gera IDs únicos para os tokens)

---

### `aud` (Audience)

- **O que faz:** Identifica os **receptores** para quem o JWT se destina. Um token só deve ser aceito por quem está na lista de `aud`.
- **Tipo:** `string` ou `string[]`
- **Exemplo:** `aud: 'minha-api'` ou `aud: ['minha-api', 'outro-servico']`

---

### `iss` (Issuer)

- **O que faz:** Identifica o **emissor** do JWT (quem gerou o token).
- **Tipo:** `string`
- **Exemplo:** `iss: 'minha-api-auth'`

---

### `iat` (Issued At)

- **O que faz:** Indica o **momento em que o JWT foi emitido (criado)**. É um timestamp Unix.
- **Detalhe:** Frequentemente é adicionado automaticamente pelo `@fastify/jwt` se `expiresIn` for usado, mas pode ser definido explicitamente.
- **Tipo:** `number` (timestamp Unix) ou `Date`
- **Exemplo:** `iat: Math.floor(Date.now() / 1000)`

---

Ao usar essas propriedades, você adiciona informações cruciais e de segurança ao seu token JWT, controlando seu ciclo de vida e seu propósito.

## Importante

O header do token JWT já é criado e adicionado automaticamente ao token quando o método `jwtSign` é chamado.

## Como verificar se o token é válido?

Para verificar se um token de autenticação é válido, basta utilizar o método `jwtVerify` de dentro do request. Esse método, automaticamente vê se o token enviado nos headers é válido, e se ele está de acordo com as configurações feitas, como a palavra chave. Se o token for válido, ele automaticamente guarda os dados resgatados dos payloads dentro da propriedade `user` dentro do request. Ex:

```typescript
await request.jwtVerify();

console.log(request.user);
```

Se o token não for valido, automaticamente ele lança um erro na aplicação. É interessante saber também que as propriedades de user precisam ser tipadas a partir de um `declare`, pois o typescript não sabe desde o começo quais as propriedades ele vai receber nesse objeto. Para isso, basta utilizar o padrão da documentação:

```typescript
// fastify-jwt.d.ts
import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number };
    user: {
      id: number;
      name: string;
      age: number;
    };
  }
}
```
