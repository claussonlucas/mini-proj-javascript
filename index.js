/*
    parei em como mostrar e esconder a camada cinza
 */
// abre formulario e camada cinza
function abrirForm() {
    document.getElementById("layer-cinza").style.display = "block";
    document.getElementById("cont-form").style.display = "block";
}

function fecharForm() {
    document.getElementById("layer-cinza").style.display = "none";
    document.getElementById("cont-form").style.display = "none";
}

// funcao que converter o endereço do servidor em json e chama outra função (inserir)
function buscarLembretes() {
    fetch("http://localhost:3000/lembretes")
    .then(resposta => resposta.json())
    .then(resposta => {
        inserirLembretes(resposta);
    });
} buscarLembretes();

// função que vai de fato inserir objeto no api.json
function inserirLembretes(listaLembretes) {
    // verifica se a array listaLembretes não está vazia
    if (listaLembretes.length > 0) {
        lembrete.innerHTML = "";
        
        listaLembretes.map(cadaLembrete => {
            lembrete.innerHTML += `
            <li>
                <h4>${cadaLembrete.titulo}</h4>
                <p>${cadaLembrete.descricao}</p>
                <img src="images/lixeira1.svg" alt="Lixeira"
                onclick="apagaLembrete(${cadaLembrete.id})">
            </li>`
        })
    }
}

// cria uma nova tarefa
function novoLembrete() {
    event.preventDefault(); // nao deixa atualizar pagina
    alert("Lembrete criado");
    //document.getElementById("tit-lemb").innerHTML = tituloLemb.value;
    //document.getElementById("des-lemb").innerHTML = descricao.value;

    // cria objeto
    let lembretes = {
        titulo : tituloLemb.value,
        descricao : descricao.value
    };

    // envia para servidor virtual
    fetch("http://localhost:3000/lembretes", {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(lembretes)
    })
    .then(resposta => resposta.json())
    .then(resposta => {
        fecharForm();
        buscarLembretes();
        let form = document.querySelector("#criarLembrete form");
        form.reset();
    });
    

}

// deleta lembretes
function apagaLembrete(id) {
    fetch(`http://localhost:3000/lembretes/${id}`,
        {
            method : "DELETE"
        }
    )
    .then(resposta => resposta.json())
    .then(resposta => {
        alert("Lembrete apagado!");
        buscarLembretes();
    })
}

function pesquisarLembrete() {
    let lista = document.querySelectorAll("ul li");

    if (pesquisa.value.length > 0) {
        lista.forEach(li => {
            if (!li.children[0].innerText.includes(pesquisa.value)) {
                li.classList.add("oculto");
            } else {
                li.classList.remove("oculto");
            }
        });
    } else {
        lista.forEach(li => {
            li.classList.remove("oculto");
        });
    }
}
