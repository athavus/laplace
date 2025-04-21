# Laplace

Laplace é um aplicativo web desenvolvido para substituir o Trello no LAPLIN (Laboratório de Análise e Processamento de Linguagem Natural). Ele serve como uma ferramenta para organização de projetos, oferecendo um sistema de kanban e gerenciamento de tarefas. Esse software não é o usado pelo laboratório, é uma versão que fiz para ser open source que ao invés de acessar o backend, apenas deixa tudo salvo no localStorage e não tem como ser usada em equipe. Disponível em: https://laplace-l.vercel.app/

---

## 📋 Funcionalidades

- **Organização de Projetos:** Criação de múltiplos projetos para diferentes equipes ou objetivos.
- **Sistema de Kanban:** Cada projeto possui um quadro kanban personalizável para a gestão visual das tarefas.
- **Gerenciamento de Tarefas:** Adicione, edite e mova tarefas entre as colunas do quadro kanban.
- **Interface Intuitiva:** Design simples e fácil de usar.

---

## 🚀 Tecnologias Utilizadas

Laplace foi desenvolvido utilizando as seguintes tecnologias:

- **React** (61.9%): Lógica do aplicativo e funcionalidades interativas.
- **CSS** (37.5%): Estilização e design da interface do usuário.
- **HTML** (0.6%): Estrutura básica das páginas da aplicação.

---

## 🛠️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/athavus/laplace.git
   cd laplace
   ```

2. **Instale as dependências (caso necessário):**
   Verifique o arquivo `package.json` para dependências e use o gerenciador de pacotes apropriado (ex.: npm ou yarn):
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação em seu navegador:**
   - Normalmente disponível em: `http://localhost:3000`

---

## 📦 Estrutura do Projeto

```plaintext
laplace/
├── public/                # Arquivos estáticos
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas principais
│   ├── assets/            # imagens e complementos (CSS)
│   └── services/          # Serviços do "backend"
├── package.json           # Gerenciador de dependências
└── README.md              # Documentação do projeto
```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch com sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça o commit das suas alterações:
   ```bash
   git commit -m 'Minha nova feature'
   ```
4. Envie as alterações para o seu fork:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no repositório original.

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📞 Contato

Caso tenha dúvidas ou sugestões, entre em contato:

- **Autor:** [Athavus](https://github.com/athavus)
- **Repositório:** [Laplace](https://github.com/athavus/laplace)
