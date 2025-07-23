# 📘 Documentação Essencial de Desenvolvimento

Este documento abrange conceitos fundamentais em desenvolvimento de software, incluindo os Princípios SOLID para escrita de código limpo e a utilização do Prisma ORM para gestão de banco de dados.

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
