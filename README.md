
# Projeto de Receitas

Este projeto foi desenvolvido como parte da disciplina **Programação Web Fullstack**. Trata-se de uma aplicação frontend utilizando React.js, Material UI e Redux para consumir dados de uma API de receitas.

## 📋 Descrição

A aplicação exibe categorias de receitas, permite a busca de receitas específicas e apresenta detalhes sobre cada receita. Utilizando o conceito de **Single Page Application (SPA)**, todas as interações são feitas sem redirecionamento, proporcionando uma experiência fluida ao usuário.

### Tecnologias Utilizadas
- **React.js**: Biblioteca JavaScript para construção da interface.
- **Material UI**: Biblioteca de componentes React para estilização.
- **Redux**: Gerenciamento de estado global da aplicação.
- **API de Receitas**: Fonte de dados utilizada para exibir as categorias e detalhes das receitas.
- **Async/Await**: Para manipulação de requisições assíncronas.

## 🔧 Funcionalidades

- Listagem de categorias de receitas utilizando dados da API.
- Busca de receitas por categoria.
- Exibição de detalhes da receita, incluindo imagem, ingredientes e instruções.
- Interface amigável e responsiva utilizando Material UI.
- Gerenciamento de estado com Redux para facilitar a comunicação entre componentes.
- Manipulação assíncrona de dados com `async` e `await`.

## 🚀 Tecnologias e Bibliotecas

- [React.js](https://react.dev/)
- [Material UI](https://mui.com/)
- [Redux](https://redux.js.org/)
- [API de Receitas](https://www.themealdb.com/api.php)

## 🛠️ Instalação e Execução

- Antes de iniciar todo o processo, execute o comando `cd receita-react` para garantir que está dentro da pasta correta.

### 1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Instale as bibliotecas necessárias:
```bash
npm install react-redux @reduxjs/toolkit
npm install axios
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
```

### 4. Inicie a aplicação:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## 🌐 Consumo da API

A aplicação consome dados da API **TheMealDB**, que fornece informações sobre categorias de receitas, detalhes das receitas e imagens. Abaixo um exemplo de resposta da API:

```json
{
  "categories": [
    {
      "idCategory": "1",
      "strCategory": "Beef",
      "strCategoryThumb": "https://www.themealdb.com/images/category/beef.png",
      "strCategoryDescription": "Beef is the culinary name for meat from cattle..."
    }
  ]
}
```

## 📂 Hooks e Funcionalidades

O projeto utiliza os seguintes hooks e funcionalidades:
- **Redux** para gerenciamento de estado global.
- **Async/Await** para manipulação de requisições assíncronas.
- **Material UI** para componentes estilizados e responsivos.

## 🤝 Contribuições

Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do projeto.
2. Crie uma branch para a sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Faça o commit das suas alterações:
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Faça o push para a branch:
   ```bash
   git push origin feature/nome-da-feature
   ```
5. Abra um pull request.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedores

- Matheus Marinho Rodrigues
- Felipe Bras Coutinho de Oliveira
