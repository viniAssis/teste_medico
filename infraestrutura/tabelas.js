class Tabelas{
    init(conexao){
        this.conexao = conexao;
        
        this.criarMedicos();

    }

    criarMedicos(){
        const sql = 'CREATE TABLE IF NOT EXISTS medico ('+
            'crm int NOT NULL,'+
            'nome varchar(45) NOT NULL,'+
            'telefone int DEFAULT NULL,'+
            'celular int DEFAULT NULL,'+
            'cep varchar(45) NOT NULL,'+
            'logradouro varchar(45) NULL,'+ 
            'bairro varchar(45) NULL,'+
            'localidade varchar(45) NULL,'+ 
            'uf varchar(45) NULL,'+
            'deletado tinyint null,'+
            'PRIMARY KEY (crm)'+
          ')'
            
        this.conexao.query(sql, (erro) =>{

            if(erro){
                console.log(erro);
            } else{
                console.log('Tabela Medicos criada com sucesso');
            }
            
        })
    }

}

module.exports = new Tabelas