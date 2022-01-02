
//const conexao = require('./infraestrutura');

const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

const PORT = 3000;
const HOST = '0.0.0.0';

conexao.connect(erro =>{
    
    if(erro){
        console.log(erro);
        console.log("teste teste")
    }
    else{
        console.log('Conectado ao MySql');


        Tabelas.init(conexao)
        const server = customExpress();
        

        
        server.listen(PORT,HOST, () => console.log('servidor rodando na porta 3000'));



    }
})


