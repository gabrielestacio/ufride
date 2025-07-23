# UFRide - Aplicativo de Caronas

UFRide é um aplicativo móvel de caronas, desenvolvido como um protótipo funcional. A aplicação permite que usuários se cadastrem, façam login, ofereçam caronas com origem e destino reais, e visualizem as caronas disponíveis.

## Funcionalidades Implementadas

- **Autenticação de Usuários:** Cadastro e Login de usuários com persistência em banco de dados.
- **Busca de Endereços em Tempo Real:** Integração com a API do Google Places para busca e autocomplete de endereços de origem e destino.
- **Cadastro de Caronas:** Fluxo multi-etapas para que motoristas possam cadastrar os detalhes de uma nova carona (origem, destino, data, preço, assentos).
- **Listagem Dinâmica de Caronas:** A tela de passageiros busca e exibe as caronas cadastradas diretamente do backend, atualizando em tempo real.

## Tech Stack

| Frontend                                                                                      | Backend                                                                                   | Banco de Dados |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------- |
| [React Native](https://reactnative.dev/)                                                      | [Node.js](https://nodejs.org/)                                                            | [PostgreSQL](https://www.postgresql.org/)   |
| [Expo](https://expo.dev/) & [Expo Router](https://docs.expo.dev/router/introduction/)           | [Express.js](https://expressjs.com/)                                                      | -              |
| [Axios](https://axios-http.com/)                                                              | [node-postgres (pg)](https://node-postgres.com/)                                          | -              |
| Estilização com `StyleSheet`                                                                   | -                                                                                         | -              |

## Pré-requisitos

Antes de começar, garanta que você tenha o seguinte software instalado na sua máquina:

- [Node.js](https://nodejs.org/en) (versão LTS recomendada)
- [NPM](https://www.npmjs.com/) (geralmente instalado com o Node.js)
- [PostgreSQL](https://www.postgresql.org/download/)
- Uma ferramenta de administração de banco de dados, como o [pgAdmin](https://www.pgadmin.org/) (recomendado) ou DBeaver.
- O aplicativo **Expo Go** instalado no seu smartphone (Android/iOS).

## Configuração do Ambiente

Siga estes passos na ordem para configurar o projeto.

### 1. Clone o Repositório

```bash
git clone [URL_DO_SEU_REPOSITORIO_AQUI]
cd UFRide_App

### 2. Configuração do Banco de Dados (PostgreSQL)

1.  Abra seu cliente PostgreSQL (ex: pgAdmin) e crie um novo banco de dados (ex: `ufride_db`).
2.  Crie um usuário e uma senha para este banco (ex: user `ufride_user`, password `senha_segura`).
3.  Abra a **Ferramenta de Consulta (Query Tool)** para o banco que você acabou de criar e execute o script SQL abaixo para criar as tabelas `users` e `rides`.

```sql
-- Cria a tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cria a tabela de caronas
CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    ride_date TIMESTAMP WITH TIME ZONE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    seats INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

### 3. Configuração do Backend

1.  Navegue até a pasta do backend:
    ```bash
    cd backend
    ```
2.  Crie um arquivo chamado `db.js` e cole o conteúdo abaixo, **substituindo os placeholders com as suas credenciais do PostgreSQL**.

    **`backend/db.js`**
    ```javascript
    const { Pool } = require('pg');

    const pool = new Pool({
        // !!! SUBSTITUA PELAS SUAS CREDENCIAIS DO POSTGRESQL !!!
        user: 'seu_usuario_do_banco',
        host: 'localhost',
        database: 'seu_banco_de_dados',
        password: 'sua_senha_do_banco',
        port: 5432,
    });

    module.exports = {
        query: (text, params) => pool.query(text, params),
    };
    ```

3.  Instale as dependências do backend:
    ```bash
    npm install
    ```

### 4. Configuração do Frontend

1.  Navegue para a pasta do frontend a partir da raiz do projeto:
    ```bash
    cd frontend 
    ```
    *(Se você estiver na pasta `backend`, use `cd ../frontend`)*

2.  **Configuração da API do Google Maps:**
    - Siga um tutorial para obter uma **Chave de API da Plataforma Google Maps**. Você precisará ativar as APIs **"Places API"** e **"Geocoding API"** e configurar uma **conta de faturamento** (há uma camada gratuita generosa).
    - Crie uma pasta `config` na raiz do `frontend`.
    - Dentro de `config`, crie um arquivo `settings.js`.
    - Cole o código abaixo no arquivo, substituindo pela sua chave.

        **`frontend/config/settings.js`**
        ```javascript
        export const Maps_API_KEY = 'COLE_AQUI_SUA_CHAVE_DE_API_DO_Maps';
        ```

3.  **Configuração da URL da API Local (Passo Crucial):**
    - Descubra o endereço de IP da sua máquina na sua rede local (ex: `192.168.0.10`).
        - No Windows, abra o `cmd` e digite `ipconfig`.
        - No Mac/Linux, abra o terminal e digite `ifconfig` ou `ip addr`.
    - Abra o arquivo `frontend/api/axiosConfig.js` e substitua `'SEU_IP_LOCAL'` pelo seu IP.

4.  Instale as dependências do frontend:
    ```bash
    npm install
    ```

    ## Executando o Projeto

Para rodar a aplicação, você precisará de dois terminais abertos.

**Passo 1: Iniciar o Backend**
- No primeiro terminal, navegue até a pasta `backend` e execute:
    ```bash
    npm start
    ```
- Você deve ver a mensagem `Servidor backend rodando na porta 3001`. Mantenha este terminal aberto.

**Passo 2: Iniciar o Frontend**
- No segundo terminal, navegue até a pasta `frontend` e execute:
    ```bash
    npx expo start
    ```
- Isso iniciará o Metro Bundler e exibirá um QR Code.

**Passo 3: Conectar o Aplicativo (Expo Go)**
- Certifique-se de que seu smartphone e seu computador estão na **mesma rede Wi-Fi**.
- Abra o aplicativo Expo Go no seu celular e escaneie o QR Code do terminal.
- O aplicativo UFRide será carregado.

## Fluxo de Teste Sugerido

1.  **Cadastro:** Abra o app, vá para a tela de Cadastro e crie um novo usuário.
2.  **Login:** Após o cadastro, você será redirecionado. Faça o login com as credenciais que acabou de criar.
3.  **Cadastrar Carona:** Após o login, escolha "Sou Motorista". Siga o fluxo de 3 passos para cadastrar uma nova carona, usando a busca de endereços real.
4.  **Verificar Carona:** Após cadastrar, volte e escolha "Sou Passageiro". A carona que você acabou de criar deverá aparecer na lista, vinda diretamente do banco de dados.
5.  **Persistência:** Para confirmar que os dados estão salvos, pare o servidor do backend (`Ctrl+C`) e inicie-o novamente (`npm start`). Volte para a tela de passageiro e puxe a lista para baixo para atualizar. A carona ainda estará lá.

---

**Autores:** Gabriel Estácio, Gabriel Torres, Luis Henrique, Luiz Gustavo e Vinícius Melo