## 🛠️ Prisma

Prisma é um Mapeador Objeto-Relacional (ORM) moderno que permite a você interagir com seu banco de dados usando objetos e métodos JavaScript/TypeScript, em vez de SQL puro.

---

### 🔸 Definição de Modelos

Dentro do **`schema.prisma`**, são definidas as **tabelas** de um banco de dados.  
Cada tabela é definida a partir do **bloco `model`**. Este bloco receberá um nome e definirá quais são as propriedades (colunas) da tabela.

Dentro do `model`, alguns **atributos** auxiliam na definição de campos e da estrutura do banco de dados.

Quando se usa `@`, o atributo se refere a uma **coluna** da minha tabela.  
Quando se usa `@@`, o atributo se refere à **estrutura do `model` (tabela) em si**.

---

### 🔸 Atributos de Campo (`@`)

Aplicados a um campo individual de um modelo:

- `@id`: Define o campo como a **chave primária** do modelo.
- `@unique`: Garante que os valores do campo sejam **únicos** em toda a tabela.
- `@default(<valor_ou_funcao>)`: Atribui um **valor padrão** ao campo se nenhum for fornecido ao criar um registro. (Ex: `now()`, `uuid()`, `false`).
- `@updatedAt`: Atualiza automaticamente a data/hora do campo **sempre que o registro é modificado**.
- `@relation(...)`: Define um **relacionamento** entre dois modelos (tabelas).

---

### 🔸 Atributos de Bloco (`@@`)

Aplicados a todo o bloco do modelo (à tabela):

- `@@map("<nome_da_tabela>")`: Mapeia o nome do modelo no Prisma para um **nome de tabela diferente no banco de dados**.
- `@@unique([campo1, campo2])`: Cria uma restrição de **unicidade combinada** em múltiplos campos.
- `@@index([campo1, campo2])`: Cria um **índice** em um ou mais campos para otimizar consultas.

---

### 🔸 Exemplo de Definição de Model

```prisma
model User {
  id    String @id @default(uuid())
  name  String
  email String @unique

  @@map("users")
}
```

---

### 🔸 Geração e Uso do Prisma Client

Após as definições do model, o comando `npx prisma generate` cria a estruturação de tipos e métodos do Prisma Client.

Este cliente é uma biblioteca tipada que reflete a estrutura das suas tabelas (modelos) e seus métodos. Isso resulta na possibilidade de acesso aos campos já tipados dentro da sua aplicação.

Para que esses dados do model possam ser utilizados, o PrismaClient deve ser baixado (a partir do comando `npm i @prisma/client`) e deve haver uma instância do client. Esse client é quem possibilita o acesso aos models e métodos criados pelo generate.

---

### 🔸 Exemplo de Uso:

```ts
import { PrismaClient } from "generated/prisma/client";

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Esdras Lopes",
    email: "esdras@gmail.com",
  },
});
```

# Guia Rápido: Propriedades Essenciais do Prisma Client

## Propriedades Dentro dos Modelos (`prisma.<seuModelo>.<metodo>()`)

Essas propriedades são os métodos que você chama diretamente em um modelo (por exemplo, `prisma.user`) para executar operações CRUD e de relacionamento.

### Operações de Criação (Create)

- **`.create()`**:
  - **O que faz**: Cria um **novo registro** (uma nova linha) na tabela correspondente ao modelo.
  - **Uso principal**:
    - `data`: Um objeto contendo os valores para as colunas do novo registro.
    - `include` (opcional): Inclui dados de relacionamentos do registro recém-criado.
    - `select` (opcional): Seleciona apenas campos específicos para retornar do registro recém-criado.
  - **Exemplo**:
    ```typescript
    prisma.user.create({
      data: {
        name: "Novo Usuário",
        email: "novo@exemplo.com",
        posts: {
          // Exemplo de criação aninhada de relacionamento
          create: { title: "Meu Primeiro Post" },
        },
      },
      include: {
        posts: true, // Inclui os posts criados na resposta
      },
    });
    ```

### Operações de Leitura (Read)

- **`.findUnique()`**:

  - **O que faz**: Encontra um **único registro** que corresponde a uma condição específica, geralmente usando uma chave primária (`@id`) ou um campo com restrição de unicidade (`@unique`).
  - **Uso principal**:
    - `where`: Um objeto com a condição de busca (obrigatório, usa campos únicos/ID).
    - `include` (opcional): Inclui dados de relacionamentos.
    - `select` (opcional): Seleciona apenas campos específicos para retornar.
  - **Exemplo**:
    ```typescript
    prisma.user.findUnique({
      where: {
        email: "esdras@gmail.com",
      },
      select: {
        name: true,
        email: true,
        posts: {
          select: { title: true },
        },
      },
    });
    ```

- **`.findMany()`**:
  - **O que faz**: Encontra **múltiplos registros** (ou todos) que correspondem a uma condição. Ideal para buscar listas de dados.
  - **Usos principais**:
    - `where` (opcional): Objeto com a(s) condição(ões) de filtro (com operadores como `contains`, `startsWith`, `equals`, `AND`, `OR`, `NOT`, etc.).
    - `orderBy` (opcional): Objeto para ordenar os resultados (ex: `{ createdAt: 'desc' }`).
    - `take` (opcional): Limita o número de resultados retornados (como `LIMIT` no SQL, útil para paginação).
    - `skip` (opcional): Pula um número de resultados (como `OFFSET` no SQL, útil para paginação).
    - `include` (opcional): Inclui dados de relacionamentos.
    - `select` (opcional): Seleciona apenas campos específicos para retornar.
  - **Exemplo**:
    ```typescript
    prisma.user.findMany({
      where: {
        name: {
          contains: "Esdras",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // Pega os 10 primeiros
      skip: 0, // Pula 0
      include: { posts: true },
    });
    ```

### Operações de Atualização (Update)

- **`.update()`**:

  - **O que faz**: Atualiza um **único registro** que corresponde a uma condição.
  - **Usos principais**:
    - `where`: Condição para encontrar o registro a ser atualizado (obrigatório, usa campos únicos/ID).
    - `data`: Objeto contendo os campos e novos valores a serem definidos.
    - `include` (opcional): Inclui dados de relacionamentos do registro atualizado.
    - `select` (opcional): Seleciona apenas campos específicos para retornar do registro atualizado.
  - **Exemplo**:
    ```typescript
    prisma.user.update({
      where: {
        email: "esdras@gmail.com",
      },
      data: {
        name: "Esdras Lopes Atualizado",
        posts: {
          updateMany: {
            // Exemplo de atualização aninhada
            where: { published: false },
            data: { published: true },
          },
        },
      },
    });
    ```

- **`.updateMany()`**:
  - **O que faz**: Atualiza **múltiplos registros** que correspondem a uma condição.
  - **Usos principais**:
    - `where`: Condição para encontrar os registros a serem atualizados.
    - `data`: Objeto com os campos e novos valores a serem definidos.
  - **Exemplo**:
    ```typescript
    prisma.user.updateMany({
      where: {
        name: { startsWith: "João" },
      },
      data: {
        isActive: false,
      },
    });
    ```

### Operações de Deleção (Delete)

- **`.delete()`**:

  - **O que faz**: Deleta um **único registro** que corresponde a uma condição.
  - **Uso principal**:
    - `where`: Condição para encontrar o registro a ser deletado (obrigatório, usa campos únicos/ID).
  - **Exemplo**:
    ```typescript
    prisma.user.delete({
      where: {
        email: "esdras@gmail.com",
      },
    });
    ```

- **`.deleteMany()`**:
  - **O que faz**: Deleta **múltiplos registros** que correspondem a uma condição.
  - **Uso principal**:
    - `where`: Condição para encontrar os registros a serem deletados.
  - **Exemplo**:
    ```typescript
    prisma.user.deleteMany({
      where: {
        isActive: false,
      },
    });
    ```

### Operações de Agregação

- **`.count()` / `.sum()` / `.avg()` / `.min()` / `.max()`**:
  - **O que faz**: Realiza operações de agregação (contagem, soma, média, mínimo, máximo) no banco de dados.
  - **Usos principais**:
    - `where` (opcional): Para filtrar os registros antes da agregação.
    - `_count`, `_sum`, `_avg`, `_min`, `_max`: Objetos especificando os campos para agregar.
  - **Exemplo**:
    ```typescript
    prisma.user.count({
      where: {
        name: {
          startsWith: "E",
        },
      },
    });
    ```

---

## Propriedades Fora dos Modelos (`prisma.<propriedade>()`)

Essas propriedades são métodos diretamente no objeto `prisma` (a instância do `PrismaClient`) e controlam aspectos mais globais da interação com o banco de dados.

- **`$transaction()`**:

  - **O que faz**: Permite agrupar **múltiplas operações do Prisma em uma única transação atômica**. Isso significa que todas as operações são bem-sucedidas ou nenhuma delas é (se uma falha, todas são revertidas).
  - **Uso principal**: Recebe um array de operações do Prisma.
  - **Exemplo**:
    ```typescript
    await prisma.$transaction([
      prisma.user.create({
        data: { name: "Tx User 1", email: "tx1@example.com" },
      }),
      prisma.post.create({
        data: {
          title: "Tx Post",
          author: { connect: { email: "tx1@example.com" } },
        },
      }),
    ]);
    ```

- **`$connect()`**:

  - **O que faz**: Abre explicitamente a conexão com o banco de dados. Geralmente o Prisma faz isso automaticamente na primeira consulta, mas pode ser útil para inicialização de longa duração.
  - **Exemplo**:
    ```typescript
    await prisma.$connect();
    ```

- **`$disconnect()`**:

  - **O que faz**: Fecha explicitamente a conexão com o banco de dados. Importante em aplicações de curta duração (como scripts) ou para gerenciar o ciclo de vida da conexão.
  - **Exemplo**:
    ```typescript
    await prisma.$disconnect();
    ```

- **`$queryRaw()` / `$executeRaw()`**:
  - **O que faz**: Permitem que você execute **consultas SQL puras** diretamente no banco de dados. `$queryRaw()` retorna resultados, `$executeRaw()` retorna o número de linhas afetadas (para `INSERT`, `UPDATE`, `DELETE`). Use com cautela e apenas quando as abstrações do Prisma Client não forem suficientes.
  - **Uso principal**: Recebe uma template string de SQL e parâmetros.
  - **Exemplo**:
    ```typescript
    const users =
      await prisma.$queryRaw`SELECT * FROM "users" WHERE email = ${"esdras@example.com"}`;
    const result =
      await prisma.$executeRaw`DELETE FROM "posts" WHERE "authorId" = ${"user-id"}`;
    ```

### Relacionamentos nos models

- **Como funciona:** Um relacionamento transmite a ideia de conexão entre tabelas de um banco de dados. Os principais tipos de relacionamento são: **Um-para-Um (1:1)**, **Um-para-Muitos (1:N)** e **Muitos-para-Muitos (N:M)**. No Prisma, esses relacionamentos são definidos usando o atributo `@relation` e campos de relacionamento específicos nos modelos.

**Exemplo de Relacionamento Um-para-Muitos (1:N):**

```typescript
model CheckIn {
  id           String    @id @default(uuid())
  created_at   DateTime  @default(now())
  validated_at DateTime?

  // Lado "Muitos" do relacionamento (cada CheckIn pertence a UM User)
  user         User      @relation(fields: [user_id], references: [id])
  user_id      String // Chave estrangeira (FK) que aponta para o id do User

  @@map("check_ins")
}
```

Neste caso, o **campo `user`** no modelo `CheckIn` (que é o nome do seu relacionamento) vincula um `CheckIn` a um `User` específico. O `@relation` utiliza dois parâmetros para essa conexão:

- `fields: [user_id]`: Indica que `user_id` é o campo neste modelo (`CheckIn`) que armazena a chave estrangeira.
- `references: [id]`: Aponta para o campo `id` no modelo `User` que `user_id` irá referenciar (a chave primária).

Isso estabelece que um `CheckIn` pode estar conectado a um e somente um usuário.

Já a volta desse relacionamento acontece no modelo `User` a partir do campo `CheckIn[]`:

```typescript

model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password_hash String
  created_at DateTime @default(now())
  checkIns CheckIn[]

  @@map("users")
}
```

No caso, o campo `checkIn` (que é o nome do relacionamento) se conecta ao modelo `CheckIn`. O `[]` serve para mostrar que um `User` pode ter **muitos** `CheckIn`s. Isso, em conjunto com a definição no modelo `CheckIn`, caracteriza um relacionamento **Um-para-Muitos (1:N)**: ou seja, um check-in recebe um e somente um usuário, e um usuário recebe um ou muitos check-ins.

Uma observação importante é que os nomes dos relacionamentos precisam estar em camelcase, pois esses relacionamentos são usados na parte ts do código para consultas e postagem de dados.

# Comandos Prisma

---

### `npx prisma migrate dev`

- **O que faz:** Aplica todas as definições de modelos (`model`s) criadas no seu `schema.prisma` ao banco de dados especificado na `DATABASE_URL`. Este comando gera e executa as migrações SQL necessárias para sincronizar o esquema do seu banco de dados com o seu `schema.prisma`.
- **Detalhes da `DATABASE_URL`:** A `DATABASE_URL` é a URL de conexão que o Prisma utiliza para se conectar ao seu banco de dados (que pode estar rodando em um container Docker, como no seu caso). Ela segue um padrão específico para PostgreSQL:
  ```
  "postgresql://<usuario>:<senha>@<host>:<porta>/<nome_do_banco_de_dados>"
  ```
  - `<usuario>`: Nome de usuário para acesso ao banco.
  - `<senha>`: Senha para o usuário.
  - `<host>`: Endereço do servidor do banco de dados (ex: `localhost` para um container mapeado na sua máquina).
  - `<porta>`: Porta em que o banco de dados está escutando (ex: `5432` ou `5433` se mapeada).
  - `<nome_do_banco_de_dados>`: Nome do banco de dados ao qual você quer se conectar.

#### O que ele gera:

O comando `npx prisma migrate dev` gera uma pasta `migrations`, e dentro dela, uma nova subpasta com o **timestamp e o nome da migração** que você especificou (ou um nome padrão). Esta subpasta contém:

- Um arquivo `migration.sql`, que são os comandos SQL necessários para aplicar as mudanças de esquema ao banco de dados.
- Um arquivo `migration_lock_toml` (no seu caso), que serve como um metadado de controle de integridade para aquela migração específica. Ele contém um checksum do `migration.sql` para garantir que o arquivo não foi alterado desde que foi gerado, e outras informações sobre a migração.

### `npx prisma studio`

- **O que faz:** Gera um servidor local (`localhost`) de acesso via navegador, permitindo a **visualização e interação com a estruturação e os dados** do seu banco de dados de forma gráfica. É uma ferramenta útil para inspecionar, adicionar, editar e deletar registros.

### `npx prisma migrate deploy`

- **O que faz:** Aplica todas as migrações já pré-criadas e versionadas (contidas na pasta `prisma/migrations`) ao banco de dados. Diferente do `npx prisma migrate dev`, que compara o `schema.prisma` com o banco de dados e gera/aplica novas migrações para o ambiente de desenvolvimento, o `npx prisma migrate deploy` **apenas executa as migrações existentes** no banco de dados. Ele é o comando ideal para **ambientes de produção**, onde o esquema do banco de dados já deve estar totalmente estruturado e as migrações são aplicadas de forma controlada.

## Configuração do Prisma Client

Ao instanciar o `PrismaClient`, você pode passar um objeto de configuração para ajustar seu comportamento e logs. Abaixo, as propriedades mais importantes:

---

### `log`

- **O que faz:** Controla o **nível de log** do Prisma Client, definindo quais tipos de eventos ele deve emitir para o console.
- **Detalhes:** É um array de strings.
  - `"query"`: Loga todas as queries SQL executadas pelo Prisma Client. Essencial para depuração.
  - `"info"`: Loga informações gerais do Prisma Client (conexão, inicialização, etc.).
  - `"warn"`: Loga avisos que o Prisma Client pode encontrar.
  - `"error"`: Loga erros que ocorrem no Prisma Client.
- **Exemplo:**

  ```typescript
  import { env } from "../env/index"; // Exemplo de importação de variáveis de ambiente

  export const prisma = new PrismaClient({
    log:
      env.NODE_ENV === "dev" ? ["query", "info", "warn", "error"] : ["error"],
  });
  ```

  _No exemplo acima, em ambiente de desenvolvimento, todas as queries e eventos serão logados. Em produção, apenas erros._

---

### `datasources`

- **O que faz:** Permite **sobrescrever as configurações de conexão do banco de dados** definidas no seu `schema.prisma` em tempo de execução. Útil para conexões dinâmicas, testes ou acesso a múltiplos bancos.
- **Detalhes:** É um objeto onde as chaves são os nomes das `datasource`s definidas no seu `schema.prisma` (ex: `db`), e o valor é um objeto com a `url` do banco de dados.
- **Exemplo:**
  ```typescript
  // Conectando a um banco de dados de teste diferente em um ambiente específico
  export const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_TEST, // Pega a URL de uma variável de ambiente específica
      },
    },
  });
  ```

---

### `errorFormat`

- **O que faz:** Define o **formato dos erros** que o Prisma Client irá retornar.
- **Detalhes:**
  - `"pretty"` (Padrão): Erros formatados para serem legíveis por humanos, com cores e stack traces limpos. Ideal para desenvolvimento.
  - `"colorless"`: Erros formatados para humanos, mas sem cores. Útil para ambientes que não suportam cores no terminal.
  - `"minimal"`: Erros em um formato mais compacto, útil para sistemas de log automatizados ou quando se busca maior controle sobre a formatação do erro.
- **Exemplo:**
  ```typescript
  export const prisma = new PrismaClient({
    errorFormat: "minimal", // Para logs de erro mais concisos em produção
  });
  ```

---

### `rejectOnNotFound` (para `findUnique` e `findFirst`)

- **O que faz:** Controla o comportamento de `findUnique()` e `findFirst()` quando um registro **não é encontrado**. Por padrão, essas funções retornam `null`. Com esta propriedade, elas podem lançar uma exceção (`NotFoundError`).
- **Detalhes:**
  - Pode ser um `boolean` (`true` aplica a todos os `findUnique`/`findFirst`).
  - Pode ser um objeto para configurações mais granulares (ex: `{ all: true }` ou `{ User: true }` para modelos específicos).
- **Exemplo:**

  ```typescript
  export const prisma = new PrismaClient({
    rejectOnNotFound: true, // Lança um erro se o registro não for encontrado
  });

  // Em uso:
  try {
    const user = await prisma.user.findUnique({ where: { id: "nao-existe" } });
    // Se rejectOnNotFound for true, esta linha NUNCA será alcançada se o usuário não for encontrado.
    // Uma exceção será lançada diretamente.
  } catch (e) {
    if (e instanceof Prisma.NotFoundError) {
      console.error("Usuário não encontrado!");
    } else {
      throw e;
    }
  }
  ```
