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

### Como executar

Logo após isso, basta adicionar o comando nos scripts do package.json.

```json
  "scripts": {
    "test:coverage": "vitest run --coverage"
  },
```
