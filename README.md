# 🏋️ API Sólida - Estilo Gympass

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E941C?style=for-the-badge&logo=vitest&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📝 Sobre

Esta é uma API para um aplicativo no estilo Gympass, construída em Node.js com TypeScript. O grande foco do projeto é a aplicação dos princípios **SOLID** e de padrões de arquitetura limpa, como o **Repository Pattern**, para criar um software robusto, escalável e de fácil manutenção.

## ⚙️ Tecnologias Utilizadas

* **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript para o back-end.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[Fastify](https://www.fastify.io/)**: Framework web focado em alta performance e baixo overhead.
* **[PostgreSQL](https://www.postgresql.org/)**: Sistema de gerenciamento de banco de dados relacional robusto e confiável.
* **[Prisma](https://www.prisma.io/)**: ORM (Object-Relational Mapper) que facilita a comunicação com o banco de dados.
* **[Zod](https://zod.dev/)**: Biblioteca para validação de esquemas.
* **[Vitest](https://vitest.dev/)**: Framework de testes moderno para garantir a qualidade do código.
* **[Docker](https://www.docker.com/)**: Plataforma usada para rodar o banco de dados em um ambiente isolado.
* **[TSup](https://tsup.egoist.dev/)**: Ferramenta para build de projetos TypeScript.

## 🚀 Começando

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **Docker** e **Docker Compose**
* **npm**

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o banco de dados com Docker:**
    ```bash
    docker-compose up -d
    ```

4.  **Configure as variáveis de ambiente:**
    Copie o arquivo `.env.example` para um novo arquivo `.env`. O `DATABASE_URL` já está configurado para o Docker.
    ```bash
    cp .env.example .env
    ```

5.  **Execute as migrations do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

## ▶️ Executando a Aplicação

* **Modo de Desenvolvimento:**
    ```bash
    npm run start:dev
    ```
* **Build para Produção:**
    ```bash
    npm run build
    ```
* **Executar em Produção:**
    ```bash
    npm run start
    ```

## 🧪 Testes

* **Testes unitários/integração (Casos de Uso):**
    ```bash
    npm test
    ```
* **Testes End-to-End (Controladores):**
    ```bash
    npm run test:e2e
    ```
* **Gerar relatório de cobertura:**
    ```bash
    npm run test:coverage
    ```

## 📄 Licença

Este projeto está sob a licença **ISC**.
