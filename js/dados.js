
var dbVeiculos = {

    "registros": [
        
        {        
        "id": 1,
        "veiculo": "Sandero",
        "versao": "Tech-Run",
        "montadora": "Renault",
        "ano": "2014",
        "combustivel": "Gas/alcool",
        "potencia": "80cv",
        "fipe": "R$ 34 000,00",
        "imagem": "img/Sandero.jpg"       
        },
        {        
        "id": 2,
        "veiculo": "Palio",
        "versao": "Weekend",
        "montadora": "Fiat",
        "ano": "2017",
        "combustivel": "Gasolina",
        "potencia": "104cv",
        "fipe": "R$ 46 000,00",
        "imagem": "img/palio-weekend.jpg"       
        },

        {  
        "id": 3,
        "veiculo": "Hillux",
        "versao": "Turbo",
        "montadora": "Toyota",
        "ano": "2018",
        "combustivel": "Gasolina",
        "potencia": "170cv",
        "fipe": "R$ 145 000,00",
        "imagem": "img/hillux.jpg"         
        },
        {  
                "id": 4,
                "veiculo": "Amarok",
                "versao": "TDI V6",
                "montadora": "Volkswagen",
                "ano": "2018",
                "combustivel": "Gasolina",
                "potencia": "206cv",
                "fipe": "R$ 187 990,00",
                "imagem": "img/amarok.jpg"         
                },
]
}

        //Recupera os dados do local Storage, caso exita.
        var db = JSON.parse(localStorage.getItem('db'));
        if (!db) {
        db = dbVeiculos;
        };

        // Exibe mensagem em um elemento de ID msg
        function displayMessage(msg) {
                $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
        }

        function inserirRegistros(veiculo) {
                // Calcula novo Id a partir do último código existente no array
                let novoId = db.registros[db.registros.length - 1].id + 1;
                let novoVeiculo = {
                    "id": novoId,
                    "veiculo": veiculo.veiculo,
                    "versao": veiculo.versao,
                    "montadora": veiculo.montadora,
                    "ano": veiculo.ano,
                    "combustivel": veiculo.combustivel,
                    "potencia": veiculo.potencia,
                    "fipe": veiculo.fipe,
                    "imagem": veiculo.imagem
                };
        // Insere o novo objeto no array
        db.registros.push(novoVeiculo);
        displayMessage("Veiculo cadastrado com sucesso");

        // Atualiza os dados no Local Storage
        localStorage.setItem('db', JSON.stringify(db));
        }

        function alterarRegistro(id, veiculo) {
                // Localiza o indice do objeto a ser alterado no array a partir do seu ID
                let index = db.registros.map(obj => obj.id).indexOf(id);
            
                // Altera os dados do objeto no array
                
                db.registros[index].veiculo = veiculo.veiculo,
                db.registros[index].versao = veiculo.versao,
                db.registros[index].montadora = veiculo.montadora,
                db.registros[index].ano = veiculo.ano,
                db.registros[index].combustivel = veiculo.combustivel,
                db.registros[index].potencia = veiculo.potencia,
                db.registros[index].fipe = veiculo.fipe,   
                db.registros[index].imagem = veiculo.imagem            
            
                displayMessage("Veiculo alterado com sucesso");
            
                // Atualiza os dados no Local Storage
                localStorage.setItem('db', JSON.stringify(db));
            }

        function deletarRegistro(id) {    
                // Filtra o array removendo o elemento com o id passado
                db.registros = db.registros.filter(function (element) { return element.id != id });
            
                displayMessage("Registro deletado");
            
                // Atualiza os dados no Local Storage
                localStorage.setItem('db', JSON.stringify(db));
            }            
