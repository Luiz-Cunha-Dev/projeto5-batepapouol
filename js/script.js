let entradaNome;
let janelaLogin;
let nome;
let statusOnline;
let quadroDeMensagens;

function tirarHidden(){
    let menuLateral = document.querySelector('.menu-lateral');
    let janelaVazia = document.querySelector('.janela-vazia');
    let janelaVaziaEscondida = janelaVazia.className

    if(janelaVaziaEscondida === 'janela-vazia'){
        menuLateral.classList.add('hidden');
        janelaVazia.classList.add('hidden');
    }else{
        menuLateral.classList.remove('hidden');
        janelaVazia.classList.remove('hidden');
    }

}


function login(){
    janelaLogin = document.querySelector('.janela-login');
    entradaNome = document.querySelector('.entrada-nome');
    nome = {name:`${entradaNome.value}`};

   
    if(entradaNome.value === ''){
        alert('Digite um nome para prosseguir');
        return;
    }
    console.log(nome);

    let promessaEnviada = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', nome)
    promessaEnviada.then(tudoCertoEnvio);
    promessaEnviada.catch(deuErroEvio);

    let promessaRecebida = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessaRecebida.then(tudoCertoRetorno);
    promessaRecebida.catch(deuErroRetorno);
}

function tudoCertoEnvio(resposta){
    console.log(resposta);
    janelaLogin.classList.add('hidden');
    
    setInterval(online, 5000)

}

function deuErroEvio(resposta){
    console.log(resposta);
    alert('nome ja existente, digite outro nome para prosseguir');
}

function online(){
    statusOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
    statusOnline.then(status);
    
}

function status(resposta){
    console.log(resposta);
}


function tudoCertoRetorno(resposta){
    console.log(resposta);
    adicionarMensagens(resposta)

}

function deuErroRetorno(resposta){
    console.log(resposta);

}

function adicionarMensagens(mensagens){
quadroDeMensagens = document.querySelector('.mensagens');
console.log(mensagens.data.length)
for(let i = 0; i < mensagens.data.length; i++){
    
    let mensagem =
    `<div class="mensagem-normal">
    <div class="hora">(${mensagens.data[i].time})</div>
    <div class="nome negrito">${mensagens.data[i].from}</div>
    <div>para</div>
    <div class="destinatario"><span class="negrito">${mensagens.data[i].to}</span>:</div>
 <div class="texto">${mensagens.data[i].text}</div>
</div>
`;

quadroDeMensagens.innerHTML += mensagem;
}


}

