const mysql = require("mysql")
const conexao = mysql.createConnection({
    
    host: 'mysql-container',
    user:'root',
    ports: 3308,  
    password:'',
    database:'base_medico',
    

})

module.exports = conexao;