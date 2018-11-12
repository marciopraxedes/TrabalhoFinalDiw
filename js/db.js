///------------------------------------------
//  Este arquivo representa uma abstração do banco de dados para uma aplicação de exemplo
//  OBS: parte do código e ideias da estrutura foram extraídos dos sites 
//       https://www.w3.org/TR/IndexedDB
//       https://developer.mozilla.org/pt-BR/docs/IndexedDB/Usando_IndexedDB
//
//  Autor: Rommel Vieira Carneiro
///------------------------------------------

// variáveis que armazenam a conexão ao banco de dados
var db_app;
// Constantes para nomes do banco de dados e ObjectStores
const CONST_DB_APP = "pucminas.br.db_app";
const CONST_OS_VEICULO = "os_veiculo";

function initDBEngine() {
    // Na linha abaixo, você deve incluir os prefixos do navegador que você vai testar.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // Não use "let indexedDB = ..." se você não está numa function.
    // Posteriormente, você pode precisar de referências de algum objeto window.IDB*:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla nunca usou prefixo nesses objetos, então não precisamos window.mozIDB*)

    if (!window.indexedDB) {
        window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
    }
}

function getObjectStore(store_name, mode) {
    let tx = db_app.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function openDB() {
    request = indexedDB.open(CONST_DB_APP);

    request.onerror = function (event) {
        alert("Você não habilitou minha web app para usar IndexedDB?!");
    };
    request.onsuccess = function (event) {
        db_app = request.result;
    };
    request.onupgradeneeded = function (event) {
        let store = event.currentTarget.result.createObjectStore(
            CONST_OS_VEICULO, { keyPath: 'id', autoIncrement: true });

        store.createIndex('nome', 'nome', { unique: true });
        store.createIndex('versao', 'versao', { unique: false });
        store.createIndex('montadora', 'montadora', { unique: true });
        store.createIndex('ano', 'ano', { unique: true });
        store.createIndex('combustivel', 'combustivel', { unique: true });
        store.createIndex('potencia', 'potencia', { unique: true });
        store.createIndex('fipe', 'fipe', { unique: true });

        // Carrega dados ficticios
        loadDadosVeiculos(store);
    };
}

function insertVeiculo(veiculo) {
    let store = getObjectStore(CONST_OS_VEICULO, 'readwrite');
    let req;
    req = store.add(veiculo);

    req.onsuccess = function (evt) {
        console.log("Contato inserido com sucesso.");
        displayMessage("Contato inserido com sucesso");
    };

    req.onerror = function () {
        console.error("Erro ao adicionar contato", this.error);
        displayMessage(this.error);
    };
}

function getAllVeiculos(callback) {
    let store = getObjectStore(CONST_OS_VEICULO, 'readonly');
    let req = store.openCursor();
    req.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            req = store.get(cursor.key);
            req.onsuccess = function (event) {
                let value = event.target.result;
                callback(value);
            }
            cursor.continue();
        }
    };
    req.onerror = function (event) {
        displayMessage("Erro ao obter contatos:", event.target.errorCode);
    };
}

function getVeiculo(id, callback) {
    let store = getObjectStore(CONST_OS_VEICULO, 'readwrite');
    if (typeof id == "string") { id = parseInt(id); }
    let req = store.get(id);
    req.onsuccess = function (event) {
        let record = req.result;
        callback (record);
    };
    req.onerror = function (event) {
        displayMessage("Contato não encontrado:", event.target.errorCode);
    };
}

function deleteVeiculo(id) {
    let store = getObjectStore(CONST_OS_VEICULO, 'readwrite');
    if (typeof id == "string") { id = parseInt(id); }
    let req = store.delete(id);
    req.onsuccess = function (event) {
        displayMessage("Contato removido com sucesso");
    };
    req.onerror = function (event) {
        displayMessage("Contato não encontrado ou erro ao remover:", event.target.errorCode);
    };
}

function updateveiculo(id, veiculo) {
    let store = getObjectStore(CONST_OS_VEICULO, 'readwrite');
    if (typeof id == "string") { id = parseInt(id); }
    let req = store.get(id);
    req.onsuccess = function (event) {
        let record = req.result;
        record.nome = (veiculo.nome != "") ? veiculo.nome : record.nome;
        record.versao = (veiculo.versao != "") ? veiculo.versao : record.versao;
        record.montadora = (veiculo.montadora != "") ? veiculo.montadora : record.montadora;
        record.ano = (veiculo.ano != "") ? veiculo.ano : record.ano;
        record.combustivel = (veiculo.combustivel != "") ? veiculo.combustivel : record.combustivel;
        record.potencia = (veiculo.potencia != "") ? veiculo.potencia : record.potencia;
        record.fipe = (veiculo.fipe != "") ? veiculo.fipe : record.fipe;

        let reqUpdate = store.put(record);
        reqUpdate.onsuccess = function () {
            displayMessage("Contato alterado com sucesso");
        }
        reqUpdate.onerror = function (event) {
            displayMessage("Erro ao alterar contato:", event.target.errorCode);
        };
    };
    req.onerror = function (event) {
        displayMessage("Contato não encontrado ou erro ao alterar:", event.target.errorCode);
    };
}

function loadDadosVeiculos(store) {
    // Isso é o que os dados de nossos clientes será.
    const dadosVeiculos = [
        { nome: "Sandero", versao: "Tech-Run", montadora: "Renault", ano: "2014", combustivel: "gas/alcool", potencia: "80cv", fipe: "R$ 34 000,00" },
        { nome: "Palio", versao: "Economic", montadora: "Fiat", ano: "2018", combustivel: "gas/alcool", potencia: "77cv", fipe: "R$ 25 000,00" },
        { nome: "Sandero", versao: "Tech-Run", montadora: "Renault", ano: "2014", combustivel: "gas/alcool", potencia: "80cv", fipe: "R$ 34 000,00" },
        { nome: "Sandero", versao: "Tech-Run", montadora: "Renault", ano: "2014", combustivel: "gas/alcool", potencia: "80cv", fipe: "R$ 34 000,00" },
        { nome: "Sandero", versao: "Tech-Run", montadora: "Renault", ano: "2014", combustivel: "gas/alcool", potencia: "80cv", fipe: "R$ 34 000,00" },
        { nome: "Sandero", versao: "Tech-Run", montadora: "Renault", ano: "2014", combustivel: "gas/alcool", potencia: "80cv", fipe: "R$ 34 000,00" },
    ];

    let req;
    dadosVeiculos.forEach((element, index) => { req = store.add(element) });
    req.onsuccess = function (evt) { };
    req.onerror = function () { };
}

