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

## Docker Compose

O Docker Compose é uma ferramenta (`um executável`) do Docker que utiliza um arquivo de configuração (geralmente `docker-compose.yml` ou `compose.yaml`) para definir e orquestrar como múltiplos containers serão criados, configurados e executados juntos como uma aplicação. Ao invés de rodar comandos `docker run` longos e complexos no terminal para cada container, o Docker Compose nos permite declarar toda essa configuração de forma legível no campo `services` do arquivo. Ele utiliza a extensão `.yml` (ou `.yaml`), que facilita a visualização e o entendimento do arquivo.

---

### Estrutura e Exemplo

A estrutura básica para definir um serviço (um container) no Docker Compose é apresentada no exemplo abaixo:

```yaml
services:
  api-solid-pg: # Nome do serviço (container)
    image: bitnami/postgresql # Imagem Docker a ser utilizada
    ports:
      - "5433:5432" # Mapeamento de portas: <porta_na_maquina_hospedeira>:<porta_no_container>
    environment:
      - POSTGRESQL_USERNAME=docker # Variáveis de ambiente para configuração do software no container
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
```

Dentro da seção `services`, cada entrada representa um serviço (um container Docker). Para cada serviço, você define: a **imagem Docker** a ser utilizada, o **mapeamento de portas** para acesso externo, e as **variáveis de ambiente**, que o software no container utiliza para sua configuração (incluindo autenticação do banco de dados). Isso facilita o gerenciamento, pois com o comando `docker compose up -d`, todos os containers são criados e ficam rodando em segundo plano. Para parar de executar os containers, basta utilizar `docker compose stop`, ou `docker compose down` para parar e remover os containers e suas redes.
