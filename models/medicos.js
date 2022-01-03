const conexao = require('../infraestrutura/conexao');
const axios = require('axios');

class Medico{

  

   async adiciona(medico, res){
        let sql= '';

        const api = await correiosApi(medico)
        
        if(api == 400){
            console.log(" cep nao encontrado na api")
            sql = `INSERT INTO medico SET ?, deletado = 0`;
        }
        else{
            console.log("cep encontrado na api")
        
            sql = `INSERT INTO medico SET ?,logradouro='${api.data.logradouro}', bairro='${api.data.bairro}',localidade='${api.data.localidade}',uf='${api.data.uf}', deletado = 0`;

        }
                
        
        conexao.query(sql, medico, (erro, resultados) =>{
            if(erro){
                if(erro.code === 'ER_DUP_ENTRY')
                    res.status(400).json({erro:"Medico ja existente "})
                else{
                    console.log(erro)
                    res.status(400).json(erro.code)
                }
            }
            else{
                
                
                console.log(medico)
                console.log(resultados)
                res.status(200).json(resultados)
            }

        })
 
    }
    
    altera(crm, medico, res){
        

        const sql = "UPDATE medico SET ? where crm=? and deletado = 0";
        
        conexao.query(sql, [medico, crm], (erro, resultados) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{

                if(resultados.affectedRows > 0){
                    console.log(resultados)
                    res.status(200).json(resultados)
                }
                else{
                    res.status(400).json({erro: "Medico inexistente"})
                }
            }

        })

    
 
    }

    deletar(crm, res){

        //pesquisa
        var medico = []
        
            conexao.query("SELECT * from medico where crm=?", crm, (erro, result, campos) =>{
                if(erro){
                }
                else{
                     
                    if(result.length > 0){
                    
                        medico = result                              
                    }
                }
    
            })
        

        //Altera
        const sql = "UPDATE medico SET deletado=1 where crm=?";
        
        conexao.query(sql, crm, (erro, resultados) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                


                if(resultados.affectedRows > 0){
                    console.log(medico)
                    console.log("deletado")
                    res.status(200).json(medico)
                }
                else{
                    res.status(400).json({error : 'Nenhum crm encontrado'})
                }
                
                
                
                
            }

        })

    
 
    }

    pesquisa (crm, res){
        
        
        const sql = "SELECT *  FROM medico where crm=? and deletado= 0";
        
        conexao.query(sql, crm, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Crm inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })
       
        

    

    }

    pesquisaNome(nome, res){
        
        nome = '%'+nome+'%';
        const sql = `SELECT *  FROM medico where nome like ? and deletado= 0`;
        
        conexao.query(sql, nome, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Nome inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    }

    pesquisaTelefone(telefone, res){
        
        telefone = '%'+telefone+'%';
        const sql = "SELECT *  FROM medico where telefone like ? and deletado= 0";
        
        conexao.query(sql, telefone, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Telefone inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    }

    pesquisaCelular(celular, res){
        
        
        const sql = "SELECT *  FROM medico where celular=? and deletado= 0";
        
        conexao.query(sql, celular, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Celular inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    }

    pesquisaCep(cep, res){
        
        cep = '%'+cep+'%';
        const sql = "SELECT *  FROM medico where cep like ? and deletado= 0";
        
        conexao.query(sql, cep, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Cep inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    }

    pesquisaLogradouro(logradouro, res){
        
        logradouro = '%'+logradouro+'%';
        const sql = "SELECT *  FROM medico where logradouro like ? and deletado= 0";
        
        conexao.query(sql, logradouro, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Logradouro inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    }

    pesquisaBairro(bairro, res){
        
        bairro = '%'+bairro+'%';
        const sql = "SELECT *  FROM medico where bairro like ? and deletado= 0";
        
        conexao.query(sql, bairro, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Bairro inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    }    

    pesquisaLocalidade(localidade, res){
        
        localidade = '%'+localidade+'%';
        const sql = "SELECT *  FROM medico where localidade like ? and deletado= 0";
        
        conexao.query(sql, localidade, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Localidade inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    }

    pesquisaUf(uf, res){
        
        
        const sql = "SELECT *  FROM medico where uf=? and deletado= 0";
        
        conexao.query(sql, uf, (erro, resultados, campos) =>{
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }
            else{
                
                
                if(resultados.length > 0){
                    res.status(200).json(resultados)
               
                    console.log(resultados)
                    console.log("JSON retornado ao cliente")
                    
                }
                else{
                    res.status(400).json({ error: 'Uf inexistente '})
                    console.log("JSON nao retornado ao cliente")
                    
                }
            }

        })

    } 

    
    



}

async function correiosApi(medico){
    try{
        const endereco = await axios.get(`https://viacep.com.br/ws/${medico.cep}/json/`)
        console.log("TESTETES")
   
        return endereco;
    }catch (err) {
        console.log(err.response.status);
        return err.response.status;
    }
}






module.exports = new Medico;    