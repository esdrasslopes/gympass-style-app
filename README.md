# 📘 Documentação Essencial de Desenvolvimento

Este documento abrange conceitos fundamentais em desenvolvimento de software, incluindo os Princípios SOLID para escrita de código limpo e a utilização do Prisma ORM para gestão de banco de dados.

---

## 🧱 Princípios SOLID

Os princípios SOLID são um conjunto de diretrizes de design de software que ajudam a criar sistemas mais compreensíveis, flexíveis e de fácil manutenção.

---

### 🔹 S - Single Responsibility Principle (Princípio da Responsabilidade Única)

Classes, entidades ou uma função deve ter uma única responsabilidade.

---

### 🔹 O - Open/Closed Principle (Princípio Aberto/Fechado)

Classes, entidades ou uma função devem estar abertas para extensão, mas fechadas para modificação. Na programação orientada a objetos, isso significa manter uma lógica central estável e, para adicionar novas funcionalidades, estender o sistema (adicionando novo código que se baseia em abstrações) em vez de modificar o código existente. Isso permite que a lógica principal seja mantida intacta.

---

### 🔹 L - Liskov Substitution Principle (Princípio da Substituição de Liskov)

O objeto de uma classe pai deve poder ser substituído por um objeto da subclasse sem quebrar o funcionamento do programa. Esse princípio garante que as subclasses sigam o comportamento esperado da superclasse, evitando desvios em seu sentido principal.  
Por exemplo, se uma classe `Ave` possui um método `voar()`, apenas pássaros que realmente voam devem ser subclasses de `Ave`. Um pinguim não voa, então não deveria ser uma subclasse de `Ave` nesse contexto, mas um pica-pau, sim.

---

### 🔹 I - Interface Segregation Principle (Princípio da Segregação de Interfaces)

Uma classe não deve ser forçada a implementar métodos de uma interface que ela não utiliza.  
Em vez de interfaces grandes e "inchadas", é melhor ter várias interfaces pequenas e específicas, garantindo que as classes implementem apenas os métodos que são relevantes para suas responsabilidades.

---

### 🔹 D - Dependency Inversion Principle (Princípio da Inversão de Dependência)

Módulos de alto nível (lógica de negócio) não devem depender diretamente de módulos de baixo nível (detalhes de implementação, como um banco de dados específico).  
Ambos devem depender de abstrações (interfaces ou classes abstratas).

---

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

## Docker

O Docker funciona de forma a facilitar a execução consistente de aplicações. Ao invés de a aplicação ser executada diretamente sobre o sistema operacional, o Docker a empacota em um container, que é uma imagem (arquivo executável contendo o código e todas as suas dependências). O Docker utiliza apenas o núcleo do sistema operacional hospedeiro, fornecendo um ambiente isolado e mínimo para o container. Isso otimiza a execução do ambiente da aplicação e garante que ela rode de forma padronizada em diversas máquinas diferentes.

### Criação de Container

Para criar um container Docker, o comando é:

```bash
docker run -d \
  --name api-solid-pg \
  -e POSTGRESQL_USERNAME=docker \
  -e POSTGRESQL_PASSWORD=docker \
  -e POSTGRESQL_DATABASE=apisolid \
  -p 5433:5432 \
  -v api-solid-pg-data:/bitnami/postgresql \
  bitnami/postgresql:latest
```

#### Explicação das flags

**d:** Faz com que o container rode em segundo plano (detached mode) após ser criado, liberando o terminal.

**-v:** Serve para que o Docker gerencie e guarde de forma consistente os dados gerados pelo container (volume mapeado). Isso garante que, mesmo se o container for removido, os dados persistam.

**-e:** Define variáveis de ambiente dentro do container, que o software (como o PostgreSQL) utiliza para sua configuração, incluindo credenciais para autenticar o acesso ao banco de dados.

**-p:** Configura o mapeamento de portas do servidor. No exemplo 5433:5432, a porta 5433 da sua máquina hospedeira acessa a porta 5432 que está rodando dentro do container Docker, permitindo a comunicação externa.

# Comandos Essenciais do Docker

Este documento lista e explica os comandos Docker mais utilizados para gerenciar o ciclo de vida dos seus containers.

---

### `docker ps`

- **O que faz:** Lista todos os **containers que estão atualmente em execução** na sua máquina.
- **Uso:** É o comando mais comum para verificar rapidamente quais dos seus serviços Docker estão ativos.
- **Exemplo:**
  ```bash
  docker ps
  ```
  Isso mostraria seu container `api-solid-pg` se ele estiver rodando.

---

### `docker start <nome_container>`

- **O que faz:** Inicia um container Docker que está **parado**.
- **Uso:** Se você parou um container anteriormente (com `docker stop`) e quer iniciá-lo novamente com suas configurações e dados existentes, use este comando.
- **Exemplo:**
  ```bash
  docker start api-solid-pg
  ```
  Isso iniciaria seu container PostgreSQL se ele estivesse parado.

---

### `docker stop <nome_container>`

- **O que faz:** Para um container Docker que está **em execução**.
- **Uso:** Usado para desligar um container de forma controlada. O Docker envia um sinal de desligamento (SIGTERM) para o processo principal do container, dando a ele um tempo para finalizar suas operações antes de ser forçado a parar.
- **Exemplo:**
  ```bash
  docker stop api-solid-pg
  ```
  Isso pararia seu container PostgreSQL.

---

### `docker ps -a`

- **O que faz:** Lista **todos os containers**, incluindo aqueles que estão **parados** ou que já foram encerrados.
- **Uso:** Útil para ver o histórico de containers, encontrar containers que não estão mais rodando, ou identificar containers que precisam ser removidos.
- **Exemplo:**
  ```bash
  docker ps -a
  ```
  Isso mostraria tanto os containers `Up` quanto os `Exited`.

---

### `docker rm <nome_container>`

- **O que faz:** Remove (deleta) um container Docker **parado**.
- **Uso:** Usado para limpar containers que não são mais necessários. Você só pode remover um container se ele não estiver em execução. Se ele estiver rodando, você precisará pará-lo primeiro com `docker stop`.
- **Exemplo:**
  ```bash
  docker rm api-solid-pg
  ```
  Isso deletaria o container `api-solid-pg` da sua lista de containers.

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
