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
let contatoEscolhido = 'Todos';
let escondido = "hidden";
let ultimoSelecionado = '';
let cont = 0;
let contatoSelecionado;
let =  visibilidadeEscolhida = "message";

document.addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        const btn = document.querySelector('.caixa-de-mensagem ion-icon');
        btn.click();


        while(cont < 1){
            const btnLogin = document.querySelector('.login button');
            btnLogin.click();
            cont++
        }
    }
})



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
        cont = 0;
        return;
    }

    let promessaEnviada = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', nome)
    promessaEnviada.then(tudoCertoEnvioNome);
    promessaEnviada.catch(deuErroEvioNome);

}



function tudoCertoEnvioNome(resposta){
    janelaLogin.classList.add('hidden');
    ReceberMensagens();
    receberParticipantes();
    setInterval(ReceberMensagens, 3000);
    setInterval(receberParticipantes, 15000);
    setInterval(online, 5000);
    cont++
}

function deuErroEvioNome(resposta){
    alert('Nome ja existente, digite outro nome para prosseguir');
}

function online(){
    statusOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
    statusOnline.then(status);
    
}

function status(resposta){

}


function ReceberMensagens(){
    let promessaRecebida = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessaRecebida.then(tudoCertoRetorno);
    promessaRecebida.catch(deuErroRetorno);
}


function tudoCertoRetorno(resposta){
    adicionarMensagens(resposta);
    const loading = document.querySelector('.loading');
    loading.classList.add('hidden');

}

function deuErroRetorno(resposta){
    alert('erro ao tentar carregar as mensagens');
    console.log(resposta);
}

function receberParticipantes(){
    let promessaParticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promessaParticipantes.then(tudoCertoPartcipantes);
    promessaParticipantes.catch(deuErroParticipantes);
}

function tudoCertoPartcipantes(resposta){
    adicionarParticipantes(resposta);

}

function deuErroParticipantes(resposta){
    console.log(resposta)
}


function adicionarParticipantes(participantesOnline){
    let contatos = document.querySelector('.opcoes-contato')
    contatos.innerHTML = `
    <div class="todos" onclick="selecionarParticipante(this)">
    <ion-icon name="people"></ion-icon>
    <span>Todos</span>
    <img class="hidden" src="imgs/Vector (1).png">
    </div>
    `;

    for(let i = 0; i < participantesOnline.data.length; i++){
        let participante =
        `<div class="contato" onclick="selecionarParticipante(this)">
        <ion-icon name="person-circle"></ion-icon>
        <span>${participantesOnline.data[i].name}</span>
        <img class="hidden" src="imgs/Vector (1).png">
    </div>
        `;
    
    contatos.innerHTML += participante;

    }

}

function selecionarParticipante(participante){
   contatoSelecionado = document.querySelector('.opcoes-contato .selecionado')

   if(contatoSelecionado !== null){
    contatoSelecionado.classList.remove('selecionado');
    contatoSelecionado.classList.add('hidden');
   }
   

    if(participante.children[2].className === 'hidden'){
        participante.children[2].classList.remove('hidden');
        participante.children[2].classList.add('selecionado');
    }

    contatoEscolhido = participante.children[1].innerHTML;
    console.log(contatoEscolhido);
    const nomeContato = document.querySelector('.selecao-contato');
    nomeContato.innerHTML= contatoEscolhido;
}


function selecionarVisibilidade(opcao){
const visibilidadeSelecionada = document.querySelector('.opcoes-visibilidade .selecionado');

if(visibilidadeSelecionada !== null){
    visibilidadeSelecionada.classList.remove('selecionado');
    visibilidadeSelecionada.classList.add('hidden');
}

    opcao.children[2].classList.add('selecionado');
    opcao.children[2].classList.remove('hidden');

    const visibilidade = document.querySelector('.visibilidade');
    visibilidadeEscolhida = opcao.children[1].innerHTML;
    visibilidade.innerHTML = `(${visibilidadeEscolhida})`;

    if(visibilidadeEscolhida !== "Público"){
        visibilidadeEscolhida = "message"
    }else{
        visibilidadeEscolhida = "private_message"
    }

}





function adicionarMensagens(mensagens){
quadroDeMensagens = document.querySelector('.mensagens');
quadroDeMensagens.innerHTML = '';


for(let i = 0; i < mensagens.data.length; i++){

    if(mensagens.data[i].type === 'status'){
        mensagem =
        `<div class="mensagem status">
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

    } else if(mensagens.data[i].to === entradaNome.value){
        mensagem =
        `<div class="mensagem reservada">
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

    }else if(mensagens.data[i].to !== 'Todos'){
    }else{

        let mensagem =
        `<div class="mensagem">
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
    
}

while(contador < 1){
    const elementoApareca = document.querySelectorAll('.mensagem');
    elementoApareca[elementoApareca.length - 1].scrollIntoView();
    contador++;
}

if (mensagemAnterior === ''){
    mensagemAnterior = mensagens.data[99];

}else if(novaMensagem === ''){
    novaMensagem = mensagens.data[99];

    if(mensagemAnterior === novaMensagem){
        novaMensagem = '';
    }else{
        const elementoQueQueroQueApareca = document.querySelectorAll('.mensagem');
        elementoQueQueroQueApareca[elementoQueQueroQueApareca.length - 1].scrollIntoView();

        mensagemAnterior = '';
        novaMensagem = '';
    }
}

}




function mandarMensagem(){
    CampoDeMensagem = document.querySelector('.campo-de-mensagem input');
    mensagem = CampoDeMensagem.value;

    if (mensagem !== ''){

        let MensagemParaEnviar ={
            from: entradaNome.value,
	        to: contatoEscolhido,
	        text: mensagem,
	        type: visibilidadeEscolhida
        }
        console.log(MensagemParaEnviar)
        let promessaMensagemEnviada = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', MensagemParaEnviar)
            promessaMensagemEnviada.then(tudoCertoMensagem);
            promessaMensagemEnviada.catch(deuErroMensagem);
    }
    
    }
    
    
    function tudoCertoMensagem(resposta){
    CampoDeMensagem.value = '';
    ReceberMensagens();
    }
    
    function deuErroMensagem(resposta){
        alert('Sua sessão expirou');
        window.location.reload()
    }