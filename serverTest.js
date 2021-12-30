
const express = require('express'); //importa o express

const server = express(); //cria uma variável chamada server que chama a função express

server.use(express.json()); //faz com que o express entenda JSON

const geeks = ['Brendon', 'Lara', 'Gregory', 'Hunter']; //as informações ficarão armazenadas dentro deste array

server.use((req, res, next) => { //server.use cria o middleware global
    console.time('Request'); //marca o início da requisição
    console.log(`Método: ${req.method}; URL: ${req.url}; `); //retorna qual o método e url foi chamada

    next(); //função que chama as próximas ações

    console.log('Finalizou'); //será chamado após a requisição ser concluída
    console.timeEnd('Request'); //marca o fim da requisição
});



server.get('/geeks', (req, res) => {
    return res.json(geeks);
}) //rota para listar todos os geeks

server.get('/geeks/:index', checkGeekInArray, (req, res) => {
    return res.json(req.geek);
})

server.post('/geeks', checkGeekExists, (req, res) => {
    const { name } = req.body; //buscar o name informado dentro do body da requisição
    geeks.push(name);

    return res.json(geeks); //retorna a informação da variável geeks
})

server.put('/geeks/:index', checkGeekInArray, checkGeekExists, (req, res) => {
    const { index } = req.params; //recupera o index com os dados
    const { name } = req.body;

    geeks[index] = name; //sobrepõe o index obtido na rota de acordo com o novo valor

    return res.json(geeks);
}) //retorna novamente os geeks atualizados após o update

server.delete('/geeks/:index', checkGeekInArray, (req, res) => {
    const { index } = req.params; //recupera o index com os dados

    geeks.splice(index, 1); //percorre o vetor até o index selecionado e deleta uma posição no array

    return res.send();
}) // retorna os dados após a exclusão

server.listen(3000); //faz com que o servidor seja executado na porta 3000 do seu localhost:3000

///////////////////////////

function checkGeekExists(req, res, next) {
    const geek = geeks[req.params.index];
    if (!req.body.name) { //middleware local que irá checar se a propriedade name foi informada corretamente
        return res.status(400).json({ error: 'geek does not exist' }); //caso negativo, irá retornar um erro 400 - BAD REQUEST
    }
    req.geek = geek;

    return next(); //se o nome for informado corretamente, a função next() chama as próximas ações
}

function checkGeekInArray(req, res, next) {
    const geek = geeks[req.params.index];
    if (!geek) {
        return res.status(400).json({ error: 'geek does not exist in array' });
    } //checa se o Geek existe no array, caso negativo informa que o index não existe
    req.geek = geek;

    return next();
}