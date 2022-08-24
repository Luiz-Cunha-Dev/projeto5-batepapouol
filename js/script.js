function tirarHidden(){
    let menuLateral = document.querySelector('.menu-lateral');
    let janelaVazia = document.querySelector('.janela-vazia');
    let janelaVaziaEscondida = janelaVazia.className
    console.log(janelaVaziaEscondida);
    if(janelaVaziaEscondida === 'janela-vazia'){
        menuLateral.classList.add('hidden');
        janelaVazia.classList.add('hidden');
    }else{
        menuLateral.classList.remove('hidden');
        janelaVazia.classList.remove('hidden');
    }

}