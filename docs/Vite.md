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
