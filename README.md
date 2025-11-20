# AutoElite Motors - Concessionária Premium

Sistema completo de concessionária de veículos premium desenvolvido com React, Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **Google Gemini API** - Inteligência Artificial para análises

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure a API Key do Gemini (opcional):
   - Edite o arquivo `config/gemini.js`
   - Adicione sua chave da API: `export const GEMINI_API_KEY = "sua-chave-aqui";`

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento na porta 3000 (http://localhost:3000)

### Build para Produção
```bash
npm run build
```
Gera os arquivos otimizados na pasta `dist/`

### Preview da Build
```bash
npm run preview
```
Visualiza a build de produção localmente

### Lint
```bash
npm run lint
```
Verifica erros de código

## 📁 Estrutura do Projeto

```
concessionaria/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   ├── index.css        # Estilos globais
│   ├── components/      # Componentes React
│   │   ├── Navbar.js
│   │   ├── HeroCarousel.js
│   │   ├── CarCard.js
│   │   ├── StockView.js
│   │   ├── AdminDashboard.js
│   │   └── ...
│   ├── config/          # Configurações
│   │   └── gemini.js    # API Gemini
│   ├── data/            # Dados mockados
│   │   └── mockData.js
│   └── utils/           # Utilitários
│       └── helpers.js
├── public/               # Arquivos estáticos
│   └── vite.svg
├── index.html           # HTML principal
├── package.json         # Dependências
├── vite.config.js       # Configuração Vite
├── tailwind.config.js   # Configuração Tailwind
└── postcss.config.js    # Configuração PostCSS
```

## 🎯 Funcionalidades

- ✅ Catálogo de veículos com filtros avançados
- ✅ Sistema de favoritos
- ✅ Comparador de veículos (até 2 carros)
- ✅ Avaliação inteligente com IA
- ✅ Calculadora de financiamento
- ✅ Chatbot com IA para atendimento
- ✅ Painel administrativo
- ✅ Design responsivo
- ✅ Animações e transições suaves

## 🔐 Acesso Administrativo

- **Usuário:** admin
- **Senha:** admin

## 📝 Notas

- As imagens dos carros são carregadas do Unsplash
- A API Gemini requer uma chave válida para funcionar
- O projeto está configurado para desenvolvimento local

## 📄 Licença

© 2024 AutoElite Motors. Todos os direitos reservados.

