
var dbVeiculos = {

    "registros": [
        
        {        
        "id": 1,
        "veiculo": "Sandero",
        "versao": "Tech-Run",
        "montadora": "Renault",
        "ano": "2014",
        "combustivel": "gas/alcool",
        "potencia": "80cv",
        "fipe": "R$ 34 000,00"        
        },

        {  
        "id": 2,
        "veiculo": "Sandero",
        "versao": "Tech-Run",
        "montadora": "Renault",
        "ano": "2014",
        "combustivel": "gas/alcool",
        "potencia": "80cv",
        "fipe": "R$ 34 000,00"        
        },
]
}

        var db = JSON.parse(localStorage.getItem('db'));
        if (!db) {
        db = dbVeiculos
        };