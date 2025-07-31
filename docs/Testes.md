# Vite Config Paths

O Vite não consegue lidar diretamente com aliases de caminho definidos dentro do `tsconfig.json`. Para integrar essa funcionalidade, é necessário instalar o plugin `vite-tsconfig-paths`.

**Comando de Instalação:**

```bash
npm i vite-tsconfig-paths
```

**Como usar:** Para usar, basta criar um arquivo `vite.config.ts`, e adicionar o código:

```typescript
import { defineConfig } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
});
```

O define config é uma função de configuração do vite. Ele recebe um objeto, e dentro desse objeto tem a propriedade plugins, que recebe tsconfigPaths como valor. A partir dessa atribuição, o vite consegue lider com os caminhos criados dentro do tsconfig.

# Configuração do package.json

Por padrão, o Vitest utiliza o modo `watch` para ficar sempre observando as alterações dentro do arquivo de teste. Sendo assim, a cada modificação no código, ele automaticamente refaz os testes.

Para controlar o comportamento de execução dos testes, você pode usar as seguintes flags:

- **`vitest run`**: Essa flag faz com que o Vitest rode os testes **uma única vez** e pare assim que finalizar, sem observar alterações contínuas.
- **`vitest watch`**: Embora seja o comportamento padrão ao rodar `vitest` sem flags, você pode usar `vitest watch` explicitamente para garantir que ele permaneça observando os arquivos de teste para atualizações contínuas.

**Exemplo de scripts no `package.json`:**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest watch"
  }
}
```

# Testes Vitest

**`expect`**: O `expect` é uma função que serve para definir qual o resultado esperado de um teste. Ele também pode ser tratado para testes com promessas, utilizando os matchers `rejects` (para promessas que são esperadas para serem rejeitadas) e `resolves` (para promessas que são esperadas para serem resolvidas com sucesso).

**Exemplo:**

```typescript
// Testando se um caso de uso rejeita com um erro específico
expect(async () => {
  await registerUseCase.execute({
    name: "John Doe",
    email,
    password: "123456",
  });
}).rejects.toBeInstanceOf(UserAlreadyExistsError);
```

### `expect.any()`

O `expect` possui um método interessante chamado `any`. Ele recebe como parâmetro um tipo de dado (um construtor, como `String`, `Number`, `Boolean`, `Array`, `Object`, `Function` ou uma classe definida por você), onde é validado se um certo valor corresponde ao tipo colocado.

### `expect().toHaveLength()`

O `toHaveLength()` é um matcher usado para verificar o **comprimento** de estruturas que possuem a propriedade `length`, como arrays ou strings.

**Exemplo:**

```typescript
// Supondo que 'registerUseCase.execute' retorna um objeto 'user'
const { user } = await registerUseCase.execute({
  name: "John Doe",
  email: "johndoe@example.com",
  password: "123456",
});

// Valida se o 'id' do usuário é do tipo String
expect(user.id).toEqual(expect.any(String));

// Outros exemplos:
// expect(user.createdAt).toEqual(expect.any(Date)); // Valida se é uma instância de Date
// expect(user.age).toEqual(expect.any(Number));     // Valida se é um número
```

## Coverage

O coverage é um **recurso/funcionalidade** do Vitest que gera relatórios sobre os testes da aplicação. Ele é um conjunto de vários indicadores que medem diferentes aspectos da execução do código.

**O que ele mede:**

- **Cobertura de linhas:** Quantas linhas do código foram testadas.
- **Cobertura de funções:** Quantas funções do código foram chamadas durante os testes.
- **Cobertura de Branch:** Quantos ramos de decisão foram executados (ex: `if/else`, `switch`, `&&`, `||`).
- **Cobertura de declarações:** Uma forma geral para verificar declarações dentro do código. Elas podem ser variáveis, funções, instruções como o `return`, condicionais e loops. Seria uma forma de checagem mais geral.

### Como executar

Primeiramente, é feita a instalação do pacote de cobertura por meio do comando:

```bash
npm i @vitest/coverage-v8
```

Logo após isso, basta adicionar o comando nos scripts do package.json.

```json
  "scripts": {
    "test:coverage": "vitest run --coverage"
  },
```

## Vitest UI

O Vitest UI é um pacote do Vitest que torna os testes mais visuais. Ele é uma plataforma que está diretamente ligada aos testes da aplicação. Ele fica no modo `watch`, e pode executar testes diretamente da página criada por ele no `localhost`.

### Como executar

Primeiro, é feita a instalação do pacote por meio do comando:

```bash
npm i -D @vitest/ui

```

Logo após isso, basta adicionar o comando nos scripts do package.json

```json
  "scripts": {
    "test:ui": "vitest --ui"
  },
```

## TDD - (Test-Driven-Development ou Desenvolvimento Orientado a Testes)

O TDD é uma metodologia de desenvolvimento onde os testes são escritos antes do código de produção. Ele é constituído por 3 fases:

**Red (Vermelho):** Escreva um teste automatizado para uma nova funcionalidade, onde se espera que ele falhe inicialmente.

**Green (Verde):** Escreva apenas o código de produção necessário para que o teste que falhou (e os demais) passe, de maneira mais objetiva e simples possível.

**Refactor (Refatorar):** Otimize o código que foi feito na fase "Green" (e o código existente), melhorando seu design e legibilidade, sempre garantindo que todos os testes continuem passando.

## Vi

O `vi` é uma ferramenta dentro do Vitest que ajuda no trabalho de testes com dados "mockados". Isso é necessário devido a testes que envolvem tempo, por exemplo, onde os dados podem ser fictícios, facilitando assim a execução do teste. Abaixo, algumas das funções importantes do `vi`:

- **`vi.fn()`**: Usado para criar **funções mock (simuladas)**. Você pode controlar o que elas retornam, quantas vezes foram chamadas e com quais argumentos. Ideal para substituir dependências simples.
- **`vi.spyOn()`**: Usado para **monitorar (espiar)** métodos de objetos existentes. Ele permite que você verifique se um método foi chamado e com quais argumentos, sem alterar seu comportamento original (a menos que você explicitamente o faça).
- **`vi.useFakeTimers()`**: Substitui as funções de tempo reais do JavaScript (`Date`, `setTimeout`, `setInterval`) por versões controláveis.
- **`vi.setSystemTime()`**: Define uma data e hora específicas que `Date.now()` e `new Date()` retornarão quando `vi.useFakeTimers()` estiver ativo.
- **`vi.advanceTimersByTime()` / `vi.advanceTimersByDate()`**: Avança o tempo nos testes quando `vi.useFakeTimers()` está ativo, permitindo testar lógicas baseadas em tempo.
- **`vi.mock()` / `vi.unmock()`**: Usados para **mockar módulos inteiros**, substituindo implementações de arquivos ou bibliotecas importadas por versões simuladas para o teste.

### Exemplo de Uso de Timers Falsos

```typescript
beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository(); // Inicializa o repositório em memória
  sut = new CheckInUseCase(checkInsRepository); // Inicializa o caso de uso

  vi.useFakeTimers(); // <--- Ativa o uso de timers falsos no Vitest
});

afterEach(() => {
  vi.useRealTimers(); // <--- Restaura o uso de timers reais após cada teste
});

it("should be able to check in", async () => {
  // Define uma data e hora específicas para o sistema de tempo falso
  vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

  const { checkIn } = await sut.execute({
    gymId: "gym-01",
    userId: "user-01",
  });

  console.log(checkIn.created_at); // Irá imprimir a data definida por setSystemTime (2022-01-20T08:00:00.000Z)

  expect(checkIn.id).toEqual(expect.any(String)); // Verifica se o ID é uma string
});
```

### Explicação

O código acima executa o seguinte:

- `vi.useFakeTimers()`: Indica ao JavaScript (no ambiente de testes) para que ele use um sistema de tempo falso (mockado) em vez do relógio real da máquina.
- O `afterEach` retira essa utilização por meio do método `vi.useRealTimers()`, sendo uma boa prática para restaurar o ambiente de tempo original e evitar que testes subsequentes sejam afetados por tempos falsos.
- `vi.setSystemTime()`: Recebe uma data e hora específicas e altera o relógio do sistema de tempo falso para essa data. Assim, `Date.now()` e `new Date()` retornarão essa data "mockada" para todo o sistema da aplicação durante a execução do teste.

## Ambiente de Teste Customizado no Vitest

Este documento explica a estrutura e o propósito de um ambiente de teste customizado no Vitest, baseado no padrão da documentação. Ambientes customizados permitem um controle preciso sobre o contexto em que seus testes são executados.

---

### Estrutura Base do Ambiente Customizado

Uma estrutura de variáveis de ambiente personalizada é essencial durante o período de testes. Nos testes, deve-se utilizar um banco de dados separado, e, consequentemente, um arquivo .env diferente. Por meio de um environment customizado, conseguimos definir qual arquivo .env o Vitest irá carregar durante os testes, redirecionando a aplicação para um banco de dados exclusivo de teste.

```typescript
import type { Environment } from "vitest/environments"; // Importa o tipo 'Environment' para tipagem

export default <Environment>{
  // Exporta o objeto que define o ambiente, tipado como 'Environment'
  name: "custom", // Nome do ambiente customizado
  transformMode: "ssr", // Modo de transformação para módulos, aqui 'ssr' (Server-Side Rendering)

  // Opcional: Bloco de configuração para o ambiente 'experimental-vm' (se usado)
  async setupVM() {
    const vm = await import("node:vm"); // Importa o módulo 'vm' do Node.js
    const context = vm.createContext(); // Cria um novo contexto de máquina virtual

    return {
      getVmContext() {
        // Retorna uma função para obter o contexto da VM
        return context;
      },
      teardown() {
        // Função chamada após a execução de todos os testes que usam este ambiente 'experimental-vm'
        // Usada para limpeza de recursos relacionados à VM
      },
    };
  },

  // Função principal de setup do ambiente
  async setup() {
    // Esta função é executada ANTES de todos os testes rodarem neste ambiente
    // Lógica de configuração customizada aqui
    // Por exemplo, configurar variáveis globais, mocks específicos, ou iniciar serviços para o ambiente

    return {
      teardown() {
        // Função chamada após a execução de TODOS os testes que usam este ambiente
        // Usada para limpar recursos ou restaurar o estado após os testes
      },
    };
  },
};
```

### Detalhamento dos Componentes

1.  **`import type { Environment } from 'vitest/environments'`**

    - **O que faz:** Importa o tipo TypeScript `Environment` do módulo `vitest/environments`.
    - **Propósito:** Este `import type` garante que o objeto que você está exportando (`export default <Environment>{...}`) esteja em conformidade com a interface esperada pelo Vitest para um ambiente de teste. Ele fornece autocompletar e verificação de erros de tipagem.

2.  **`export default <Environment>{ ... }`**

    - **O que faz:** Exporta a definição do seu ambiente de teste customizado como o módulo padrão.
    - **Propósito:** Este objeto é a implementação do ambiente que o Vitest carregará e utilizará quando você o referenciar no seu `vitest.config.ts` (ex: `environment: './path/to/my-custom-env.ts'`).

3.  **`name: 'custom'`**

    - **O que faz:** Define o nome do seu ambiente de teste customizado.
    - **Propósito:** Este é o nome que você usará na sua configuração do Vitest (`vitest.config.ts`) para ativar este ambiente (ex: `environment: 'custom'`).

4.  **`transformMode: 'ssr'`**

    - **O que faz:** Define como os módulos serão transformados para este ambiente.
    - **Propósito:** É uma dica para o Vitest sobre como lidar com a importação e transformação de arquivos. `ssr` (Server-Side Rendering) é um modo específico que pode ser necessário para certos tipos de código que rodam em um servidor. Outros valores comuns são `'node'` e `'web'`.

5.  **`async setupVM()`** (Opcional)

    - **O que faz:** Este método é específico para ambientes que utilizam o módulo `vm` (Virtual Machine) do Node.js, como o ambiente `experimental-vm` do Vitest. Ele é executado para configurar o contexto da máquina virtual.
    - **Propósito:** Permite um isolamento de contexto mais profundo em alguns casos de uso. `vm.createContext()` cria um ambiente de sandbox para o código, e `getVmContext()` permite que o ambiente de teste acesse esse contexto.
    - **`teardown()` aninhado:** A função `teardown` dentro de `setupVM` é responsável pela limpeza de recursos específicos do contexto da VM.

6.  **`async setup()`** (Principal)
    - **O que faz:** Esta é a função **principal de configuração do ambiente**. Ela é executada **uma vez** antes de cada worker, que seriam as threads criadas pelo vitest para executar os testes dentro da aplicação.
    - **Propósito:** Aqui você coloca qualquer lógica de setup global que seu ambiente customizado precise, como configurar variáveis globais, inicializar bancos de dados em memória, ou realizar qualquer preparação que afete a execução dos testes naquele ambiente.
    - **`teardown()` aninhado:** A função `teardown` retornada por `setup()` é crucial. Ela é chamada **uma vez** após a execução de **todos os testes** que usam este ambiente, garantindo que quaisquer recursos alocados em `setup()` sejam limpos (ex: fechar conexões de DB, limpar mocks globais).

## Configuração de Testes

Para configurar testes para rodar no Vitest com uma configuração específica (como um ambiente customizado ou padrões de inclusão de arquivos), siga este passo a passo:

1.  Crie um novo arquivo de configuração para o Vitest (ex: `vitest.config.controllers.ts`).

2.  Configure este arquivo da seguinte forma:

    ```typescript
    import { defineConfig } from "vitest/config";
    import tsconfigPaths from "vite-tsconfig-paths";

    export default defineConfig({
      plugins: [tsconfigPaths()], // Habilita a resolução de aliases de caminho do tsconfig
      test: {
        // Define o ambiente de teste customizado que será usado
        environment: "./prisma/vitest-environment-prisma/prisma-environment.ts", // Caminho do arquivo do ambiente customizado
        // Define quais arquivos de teste serão incluídos na execução
        include: ["src/http/controllers/**/*.{test,spec}.ts"], // Arquivos inclusos quando o Vitest for chamado
      },
    });
    ```

    - No padrão de inclusão (`src/http/controllers/**/*.{test,spec}.ts`):
      - `**` significa qualquer pasta (ou zero ou mais pastas) dentro de `controllers`.
      - `*` significa qualquer arquivo com a extensão `.test.ts` ou `.spec.ts` dentro dessas pastas.

3.  Após criar o arquivo de configuração, adicione um script no seu `package.json` para executá-lo:

    ```json
    {
      "scripts": {
        "test:prisma": "vitest run --config vitest.config.controllers.ts"
      }
    }
    ```

    - A flag `--config` é utilizada para apontar para um arquivo de configuração do Vitest diferente do padrão (`vitest.config.ts`), permitindo ter setups de teste específicos.
