# 📌 Recipe Haven - API de Receitas

## 📌 Visão Geral  
O projeto *Recipe Haven* é uma aplicação web desenvolvida em *React.js* (Front-end) e *Express.js* (Back-end) com integração ao *MongoDB. A API permite que usuários autenticados realizem **buscas e inserções de receitas* dentro da plataforma.  

A aplicação segue uma *arquitetura em 3 camadas*:  
- *Front-end:* React.js (SPA)  
- *Back-end:* Express.js (REST API)  
- *Banco de Dados:* MongoDB  

---

## 📌 Funcionalidades Principais  

✔ *Login de Usuários* (apenas usuários autenticados podem acessar recursos protegidos)  
✔ *Busca de Receitas* (com base no nome, categoria, ingredientes, etc.)  
✔ *Inserção de Receitas* (usuários autenticados podem adicionar novas receitas)  
✔ *Gerenciamento de Favoritos* (salvar e remover receitas favoritas)  
✔ *Sistema de Comentários* (adicionar e remover comentários em receitas)  

---

## 📌 Tecnologias Utilizadas  

### 🔹 *Front-end*  
- React.js  
- React Router DOM  
- Material UI (MUI)  
- Axios (para chamadas HTTP)  

### 🔹 *Back-end*  
- Express.js  
- Mongoose (ODM para MongoDB)  
- bcrypt (hash de senhas)  
- express-session (gerenciamento de autenticação)  
- cors (segurança entre domínios)  
- dotenv (variáveis de ambiente)  

### 🔹 *Banco de Dados*  
- MongoDB (Atlas ou Local)  

---

## 📌 Como Rodar o Projeto?  

### *1️⃣ Clone o repositório*  
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
