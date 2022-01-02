const Medico = require("../models/medicos")

module.exports = server =>{

    server.get('/', (req, res)=>{

        res.send("<h1>Bem-vindo a aplicação Teste_Medico</h1>")
      
        

    })


    server.post('/medico', checkCampos , (req, res)=>{
        
        const medico = req.body
        
        Medico.adiciona(medico, res)

    })

    server.patch('/medico/', checkCampos , (req, res)=>{

    
        const medico = req.body;
        const crm = parseInt(req.body.crm)

        Medico.altera(crm, medico, res);

    })

    server.get('/medico/crm/:crm', (req, res)=>{

        const crm = parseInt(req.params.crm);
        const medico = req.body;

        Medico.pesquisa(crm, res);

      
        

    })

    server.delete('/medico/' , (req, res)=>{

        const crm = parseInt(req.body.crm);

        Medico.deletar(crm, res);


    })

    server.get('/medico/crm/:crm', (req, res)=>{

        const crm = parseInt(req.params.crm);
        const medico = req.body;

        Medico.pesquisa(crm, res);

      
        

    })

    server.get('/medico/nome/:nome', (req, res)=>{

        const nome = req.params.nome;
        const medico = req.body;

        Medico.pesquisaNome(nome, res);

      
        

    })

    server.get('/medico/telefone/:telefone', (req, res)=>{

        const telefone = parseInt(req.params.telefone);
        const medico = req.body;

        Medico.pesquisaTelefone(telefone, res);

      
        

    })

    server.get('/medico/celular/:celular', (req, res)=>{

        const celular = parseInt(req.params.celular);
        const medico = req.body;

        Medico.pesquisaCelular(celular, res);

      
        

    })

    server.get('/medico/cep/:cep', (req, res)=>{

        const cep = req.params.cep;
        const medico = req.body;

        Medico.pesquisaCep(cep, res);

      
        

    })

    server.get('/medico/logradouro/:logradouro', (req, res)=>{

        const logradouro = req.params.logradouro;
        const medico = req.body;

        Medico.pesquisaLogradouro(logradouro, res);

      
        

    })

    server.get('/medico/bairro/:bairro', (req, res)=>{

        const bairro = req.params.bairro;
        const medico = req.body;

        Medico.pesquisaBairro(bairro, res);

      
        

    })

    server.get('/medico/localidade/:localidade', (req, res)=>{

        const localidade = req.params.localidade;
        const medico = req.body;

        Medico.pesquisaLocalidade(localidade, res);

      
        

    })

    server.get('/medico/uf/:uf', (req, res)=>{

        const uf = req.params.uf;
        const medico = req.body;

        Medico.pesquisaUf(uf, res);

      
        

    })

    

}

//
function checkCampos  (req, res, next)  {
    var EhNumero = /^[A-z.]+$/

    if (!req.body.crm) { 
        return res.status(400).json({ error: 'CRM não pode estar vazio' }); 
    }

    
    if(req.body.crm.length > 7){
        return res.status(400).json({ error: 'CRM maior que 7' });
    }

    if(EhNumero.test(req.body.crm)){
        return res.status(400).json({ error: 'Só é permitido numeros em CRM' }); 
    }


    if (!req.body.nome) { 
        return res.status(400).json({ error: 'Nome não pode estar vazio' }); 
    }

    if (req.body.nome.length >120) { 
        return res.status(400).json({ error: 'Nome deve estar abaixo de 120 caracteres' }); 
    }



    if(EhNumero.test(req.body.telefone)){
        return res.status(400).json({ error: 'Só é permitido numeros em telefone' })
    }
    
    if(EhNumero.test(req.body.celular)){
        return res.status(400).json({ error: 'Só é permitido numeros em celular' })
    }


    if (!req.body.cep) { 
        return res.status(400).json({ error: 'CEP não pode estar vazio' }); 
    }
    
    if(EhNumero.test(req.body.cep)){
        return res.status(400).json({ error: 'Só é permitido numeros em cep' })
    }

    return next(); 
}
