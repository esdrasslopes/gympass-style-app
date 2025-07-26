# Day.js

Day.js é uma biblioteca JavaScript projetada para manipular, validar e exibir datas e horas de forma eficiente.

## Instalação

```bash
npm i dayjs
```

# Principais Métodos do Day.js

Aqui estão alguns dos principais métodos da biblioteca Day.js e o que eles fazem:

---

### Criação e Manipulação de Instâncias

- **`dayjs()` / `dayjs(dateString)` / `dayjs(DateObject)`**:

  - **O que faz:** Cria uma nova instância do objeto Day.js.
  - **Detalhe:** Se chamado sem argumentos, retorna a data e hora atuais. Pode receber uma string de data, um objeto `Date` nativo do JavaScript, ou um timestamp para criar uma data específica.

- **`.add(value, unit)`**:

  - **O que faz:** Adiciona uma quantidade de tempo à data.
  - **Detalhe:** Retorna uma _nova_ instância do Day.js (imutável).
  - **Exemplo:** `dayjs().add(7, 'day')` adiciona 7 dias à data atual. `unit` pode ser 'day', 'month', 'year', 'hour', 'minute', 'second', etc.

- **`.subtract(value, unit)`**:
  - **O que faz:** Subtrai uma quantidade de tempo da data.
  - **Detalhe:** Retorna uma _nova_ instância do Day.js (imutável).
  - **Exemplo:** `dayjs().subtract(1, 'month')` subtrai 1 mês da data atual.

---

### Formatação de Datas

- **`.format(templateString)`**:
  - **O que faz:** Formata a data para uma string de acordo com um modelo fornecido.
  - **Exemplo:** `dayjs().format('YYYY-MM-DD HH:mm:ss')` retornaria "2025-07-26 17:37:29" (usando a data e hora atual).

---

### Normalização de Datas

- **`.startOf(unit)`**:

  - **O que faz:** Define a data para o início de uma unidade de tempo específica.
  - **Detalhe:** Retorna uma _nova_ instância do Day.js (imutável). Útil para normalizar datas.
  - **Exemplo:**
    - `dayjs('2025-07-26 15:30:45').startOf('day')` retorna `2025-07-26 00:00:00`.
    - `dayjs('2025-07-26 15:30:45').startOf('month')` retorna `2025-07-01 00:00:00`.
    - `dayjs('2025-07-26 15:30:45').startOf('year')` retorna `2025-01-01 00:00:00`.

- **`.endOf(unit)`**:
  - **O que faz:** Define a data para o **final** de uma unidade de tempo específica.
  - **Detalhe:** Retorna uma _nova_ instância do Day.js (imutável). Útil para definir limites de tempo ou intervalos.
  - **Exemplo:**
    - `dayjs('2025-07-26 15:30:45').endOf('day')` retorna `2025-07-26 23:59:59.999`.
    - `dayjs('2025-07-26 15:30:45').endOf('month')` retorna `2025-07-31 23:59:59.999` (assumindo julho tem 31 dias).
    - `dayjs('2025-07-26 15:30:45').endOf('year')` retorna `2025-12-31 23:59:59.999`.

---

### Comparação e Diferença entre Datas

- **`.isBefore(dayjsObject)`**:

  - **O que faz:** Verifica se a data atual é anterior à data fornecida.
  - **Detalhe:** Retorna `true` ou `false`.
  - **Exemplo:** `dayjs('2025-01-01').isBefore(dayjs('2025-07-01'))` retornaria `true`.

- **`.isAfter(dayjsObject)`**:

  - **O que faz:** Verifica se a data atual é posterior à data fornecida.
  - **Detalhe:** Retorna `true` ou `false`.

  * **Exemplo:** `dayjs('2025-07-01').isAfter(dayjs('2025-01-01'))` retornaria `true`.

- **`.isSame(dayjsObject, unit)`**:

  - **O que faz:** Verifica se a data atual é igual à data fornecida, opcionalmente comparando até uma unidade específica (ex: 'day' para comparar apenas o dia, ignorando horas, minutos, etc.).
  - **Detalhe:** Retorna `true` ou `false`.
  - **Exemplo:** `dayjs('2025-07-26 10:00:00').isSame(dayjs('2025-07-26 15:00:00'), 'day')` retornaria `true`.

- **`.diff(dayjsObject, unit, float)`**:
  - **O que faz:** Calcula a diferença entre duas datas em uma unidade específica.
  - **Detalhe:** `unit` (ex: 'day', 'hour'). `float` (booleano, `true` para retornar um número decimal).
  - **Exemplo:** `dayjs('2025-07-30').diff(dayjs('2025-07-26'), 'day')` retornaria `4`.
