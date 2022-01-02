const mysql = require("mysql")
const conexao = mysql.createConnection({
    
    host: 'mysql-container',
    user:'root',
    ports: 3306,  
    password:'root',
    database:'base_medico',
    insecureAuth : true

})

module.exports = conexao;