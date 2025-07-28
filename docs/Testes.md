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
