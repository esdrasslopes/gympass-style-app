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
