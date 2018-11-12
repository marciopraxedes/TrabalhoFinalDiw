function init() {
    initDBEngine();
    openDB();

    // Adiciona Listerners
    $("#btnInsert").click(function () {
        if (!$('#form-contato')[0].checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }
        let campoNome = $("#inputNome").val();
        let campoTelefone = $("#inputTelefone").val();
        let campoEmail = $("#inputEmail").val();
        let contato = { nome: campoNome, telefone: campoTelefone, email: campoEmail };

        insertContato(contato);
        $("#form-contato")[0].reset();
        setTimeout(exibeContatos, 200);
    });

    // Intercepta o click do botão Alterar
    $("#btnUpdate").click(function () {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Informe o ID do contato a ser alterado e a alteração desejada.");
            return;
        }
        let campoNome = $("#inputNome").val();
        let campoTelefone = $("#inputTelefone").val();
        let campoEmail = $("#inputEmail").val();
        let contato = { nome: campoNome, telefone: campoTelefone, email: campoEmail };

        updateContato(campoId, contato);
        $("#form-contato")[0].reset();
        setTimeout(exibeContatos, 200);
    });

    // Intercepta o click do botão Excluir
    $("#btnDelete").click(function () {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Informe o ID do contato a ser excluído.");
            return;
        }
        deleteContato(campoId);
        $("#form-contato")[0].reset();
        setTimeout(exibeContatos, 200);
    });

    // Intercepta o click do botão Listar Contatos
    $("#btnList").click(function () {
        exibeContatos();
    });

    // Intercepta o click do botão Listar Contatos
    $("#btnClear").click(function () {
        $("#form-contato")[0].reset();
    });

    // Oculta a mensagem de aviso após alguns segundos
    $('#msg').bind("DOMSubtreeModified", function () {
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);
    });

    $("#grid-contatos").on("click", "tr", function (e) {
        let linhaContato = this;
        $("#inputId").val(linhaContato.childNodes[0].firstChild.nodeValue);
        $("#inputNome").val(linhaContato.childNodes[1].firstChild.nodeValue);
        $("#inputTelefone").val(linhaContato.childNodes[2].firstChild.nodeValue);
        $("#inputEmail").val(linhaContato.childNodes[3].firstChild.nodeValue);
    });

    setTimeout(exibeContatos, 200);
}

function exibeContatos() {
    $("#table-contatos").html("");
    getAllContatos(function (contato) {
        $("#table-contatos").append("<tr><td scope=\"row\">" + contato.id + "</th><td>" + contato.nome
            + "</td><td>" + contato.telefone + "</td><td>" + contato.email + "</td></tr>");
    });
}
