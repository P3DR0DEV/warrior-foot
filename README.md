# WarriorFoot ⚽

**WarriorFoot** é um jogo de gerenciamento de futebol desenvolvido para o navegador, onde o usuário assume o papel de manager de um time, sendo responsável por decisões estratégicas como gestão, convites, ligas e progressão no jogo.

Este projeto está sendo desenvolvido como um **desafio técnico para mim mesmo**, com foco em **arquitetura, regras de negócio e backend**, simulando um sistema real de múltiplos usuários e ligas.

---

## 🧠 Visão Geral

- Cada usuário inicia em um **universo com 32 times**, distribuídos em 4 divisões.
- O sistema realiza a **geração automática de times e ligas**.
- Usuários podem **convidar outros jogadores** para participar do mesmo universo.
- O projeto foi pensado para evoluir de forma incremental, com regras claras de negócio.

---

## 🚀 Funcionalidades Implementadas

- Cadastro de usuários com validações
- Login e logout com **persistência de sessão**
- Geração automática de **32 times por liga**, distribuídos por divisão
- Sistema de **convites por e-mail**
- Aceite de convite com vínculo ao mesmo universo
- Suporte a **múltiplas ligas por usuário**
- Estrutura preparada para evolução do jogo (temporadas, jogadores, partidas)

---

## 🛠 Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Fastify
- Redis (persistência de sessão)
- PostgreSQL

### Frontend
- React
- TypeScript
- Next.js
---

## 🧩 Conceitos e Desafios Técnicos

- Modelagem de regras de negócio complexas
- Geração procedural de dados (times e ligas)
- Controle de sessão distribuída
- Relacionamento entre usuários, ligas e convites
- Preparação para algoritmos de calendário (Round Robin)

---

## ▶️ Como Executar o Projeto

```bash
# Clonar o repositório
git clone https://github.com/P3DR0DEV/warrior-foot.git

# Instalar dependências do backend
cd server
npm install
npm run dev

# Instalar dependências do frontend
cd ../client
npm install
npm run dev
```
Observação: é necessário configurar variáveis de ambiente para banco de dados e Redis.

## 📌 Status do Projeto
🚧 Em desenvolvimento
O projeto foi estruturado para receber novas funcionalidades, como:
- geração de jogadores
- temporadas
- simulação de partidas
- rankings e estatísticas

## 📄 Contexto
  Este projeto foi desenvolvido a partir de um desafio de modelagem de um jogo de manager de futebol, com foco em backend, regras de negócio e escalabilidade, simulando cenários reais de aplicações multiusuário
