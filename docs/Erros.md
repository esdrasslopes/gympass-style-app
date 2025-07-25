# Erros

O Fastify tem por padrão um método chamado `setErrorHandler`. Ele é um método do Fastify que gerencia erros não capturados por blocos como `try` e `catch`. Por padrão, ele recebe 3 parâmetros: o `error`, `request` e `reply`. Caso um argumento não seja utilizado, ele pode ser substituído por um `_`, o que faz com que o TypeScript e o linter entendam que ele não será utilizado.

```typescript
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // Aqui devemos enviar o erro para uma ferramenta externa como DataDog/Sentry/NewRelic
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});
```

### Criação de Erros Personalizados

Outro importante conhecimento é entender que erros podem ser criados a partir da classe `Error` do JavaScript, permitindo a criação de tipos de erros mais específicos para sua aplicação.

**Exemplo:**

```typescript
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists");
  }
}
```
