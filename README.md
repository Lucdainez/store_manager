
# Store Manager

Projeto da trybe onde foi criado uma API REST que conversa com um banco de dados MYSQL, a 
partir da biblioteca Express. Foram criados vários Endpoints de requisição
com validações de regras de negócio e de valores requisitados, toda a aplicação foi testada
com testes de unidade jest. Esse projeto foi realizado com arquitetura de Software no modelo 
de camadas,  utilizamos 3 camadas principais: 

#### camada Controller 

responsável pela requisição e envia os dados para a camada "Service".

#### camada Service

responsável por validar os dados ou a requisição da camada Controller com regras de 
negócio e enviar o comando para a camada "Model".

#### camada Model

responsável por consultar o banco de dados diretamente e retornar o dado requisitado para
a camada "Service" que envia para a camada "Controller" e chega até o cliente.
## Stack utilizada

**Back-end:** Node, Express, JavaScript, MySql, jest, mocha, chai, sinon

