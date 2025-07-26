# 📘 Documentação Essencial de Desenvolvimento

Este documento abrange conceitos fundamentais em desenvolvimento de software, incluindo os Princípios SOLID, Repository Pattern e Factory Pattern para escrita de código limpo.

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

## Repository Pattern

O Repository Pattern é um padrão de arquitetura de software que busca organizar melhor os códigos de um sistema, facilitando as manutenções sobre esse código. Esse padrão diz que as regras de negócio de um sistema (ou seja, o que aquele sistema propõe executar) devem estar separadas dos detalhes de como os dados são armazenados e acessados no banco de dados.

## Solid e Repository Pattern Juntos

### 🔹 D - Dependency Inversion Principle & Repository Pattern

Juntando ambas as arquiteturas, podemos exemplificar as suas operações em conjunto:

Se temos a necessidade de criar um usuário, a **regra de negócio** seria quais as condições para criar um usuário. Por exemplo, o e-mail deve ter no máximo X caracteres. Já os **casos de uso** seriam a função principal de criação desse usuário, que não depende de qual repositório será usado. Cada **repositório** é a parte de alteração no banco de dados.

Juntando os princípios, o **Dependency Inversion Principle (DIP)** opera na tentativa de tornar os módulos independentes, onde a lógica de alto nível ("o chefe") não depende dos detalhes de implementação ("o funcionário"). Aqui, a **lógica de alto nível** seria o **caso de uso** que orquestra a criação do usuário baseando-se nas regras de negócio. Os **detalhes de implementação** (ou lógica de baixo nível), seriam os **repositórios** em si, que lidam diretamente com o banco de dados (por exemplo, usando o Prisma, um driver de SQL, etc.).

O **Repository Pattern**, por sua vez, opera na separação da regra de negócio da lógica de alteração no banco de dados, atuando como a abstração que o DIP recomenda para essa dependência. Isso permite que o "chefe" (caso de uso) execute a ação de criar o usuário sem se preocupar com os detalhes de como o "funcionário" (repositório) fará o trabalho de persistência.

A requisição seria a camada intermediária que torna o Dependency Inversion Principle possível.

## Factory Pattern

O **Factory Pattern** é um padrão de projeto (design pattern) de Programação Orientada a Objetos (POO) que busca generalizar e abstrair o processo de criação de objetos instanciados. Ele faz isso fornecendo uma interface para criar objetos, permitindo que o código cliente solicite um objeto sem precisar saber a sua classe concreta ou os detalhes complexos de sua criação.
