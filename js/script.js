let entradaNome;
let janelaLogin;
let nome;
let statusOnline;
let quadroDeMensagens;
let mensagem;
let CampoDeMensagem;
let mensagemAnterior = '';
let novaMensagem = '';
let contador = 0;

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

    let promessaEnviada = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', nome)
    promessaEnviada.then(tudoCertoEnvioNome);
    promessaEnviada.catch(deuErroEvioNome);

}



function tudoCertoEnvioNome(resposta){
    janelaLogin.classList.add('hidden');
    setInterval(ReceberMensagens, 3000);
    setInterval(online, 5000);
}

function deuErroEvioNome(resposta){
    alert('nome ja existente, digite outro nome para prosseguir');
}

function online(){
    statusOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
    statusOnline.then(status);
    
}

function status(resposta){
    console.log(resposta);
}


function ReceberMensagens(){
    let promessaRecebida = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessaRecebida.then(tudoCertoRetorno);
    promessaRecebida.catch(deuErroRetorno);
}


function tudoCertoRetorno(resposta){
    adicionarMensagens(resposta)

}

function deuErroRetorno(resposta){
    alert('erro ao tentar carregar as mensagens');
    console.log(resposta);
}

function adicionarMensagens(mensagens){
quadroDeMensagens = document.querySelector('.mensagens');
quadroDeMensagens.innerHTML = '';



for(let i = 0; i < mensagens.data.length; i++){
    
    let mensagem =
    `<div class="mensagem-normal">
    <p>
    <span class="hora">(${mensagens.data[i].time})</span>
    <span class="nome negrito">${mensagens.data[i].from}</span>
    <span>para</span>
    <span class="destinatario"><span class="negrito">${mensagens.data[i].to}</span>:</span>
     <span class="texto">${mensagens.data[i].text}</span>
    <p>
    </div>
    `;

quadroDeMensagens.innerHTML += mensagem;


}

while(contador < 1){
    const elementoApareca = document.querySelectorAll('.mensagem-normal ');
    elementoApareca[[99]].scrollIntoView();
    contador++;
}

if (mensagemAnterior === ''){
    mensagemAnterior = mensagens.data[99];
    console.log( mensagemAnterior);

}else if(novaMensagem === ''){
    novaMensagem = mensagens.data[99];
    console.log( novaMensagem);

    if(mensagemAnterior === novaMensagem){
        novaMensagem = '';
        console.log( novaMensagem);
    }else{
        const elementoQueQueroQueApareca = document.querySelectorAll('.mensagem-normal ');
        elementoQueQueroQueApareca[[99]].scrollIntoView();

        mensagemAnterior = '';
        novaMensagem = '';
    }
}

}





function mandarMensagem(){
    CampoDeMensagem = document.querySelector('.campo-de-mensagem input');
    mensagem = CampoDeMensagem.value;
    console.log(mensagem)

    if (mensagem !== ''){

        let MensagemParaEnviar ={
            from: entradaNome.value,
	        to: "Todos",
	        text: mensagem,
	        type: "message"
        }
        console.log(MensagemParaEnviar)
        let promessaMensagemEnviada = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', MensagemParaEnviar)
            promessaMensagemEnviada.then(tudoCertoMensagem);
            promessaMensagemEnviada.catch(deuErroMensagem);
    }
    
    }
    
    
    function tudoCertoMensagem(resposta){
    console.log(resposta);
    CampoDeMensagem.value = '';
    ReceberMensagens();
    }
    
    function deuErroMensagem(resposta){
        window.location.reload()
    }
    
