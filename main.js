const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 5;
numeroSenha.textContent = tamanhoSenha;
const letrasMaisculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbok = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho(){
    if(tamanhoSenha > 1){
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho(){
    if(tamanhoSenha < 20){
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Adicionado 'let' antes do i
for (let i=0; i < checkbok.length; i++){
    checkbok[i].onclick = geraSenha;
}

geraSenha();

function geraSenha(){
    let alfabeto = '';
    if (checkbok[0].checked){
        alfabeto = alfabeto + letrasMaisculas;
    }
    if (checkbok[1].checked){
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbok[2].checked){
        alfabeto = alfabeto + numeros;
    }
    if (checkbok[3].checked){
        alfabeto = alfabeto + simbolos;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++){
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    
    // Passamos o tamanho do alfabeto atual para a função
    classficaSenha(alfabeto.length);
}

// Alterado o nome do parâmetro para 'tamanhoAlfabeto' para fazer sentido
function classficaSenha(tamanhoAlfabeto){
    
    // Se nenhum checkbox estiver marcado, a entropia é 0
    if (tamanhoAlfabeto === 0) {
        forcaSenha.classList.remove('media', 'forte');
        forcaSenha.classList.add('fraca');
        return;
    }

    // A fórmula usa o tamanho da senha (global) e o tamanho do alfabeto (passado por parâmetro)
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    
    forcaSenha.classList.remove('fraca','media','forte');
    
    if(entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia >= 36 && entropia <= 57 ){ // Ajustado para evitar brechas entre os números
        forcaSenha.classList.add('media');
    } else if (entropia < 36) {
        forcaSenha.classList.add('fraca');
    }

    const valorEntropia = document.querySelector('.entropia');
    if (valorEntropia) {
        valorEntropia.textContent = Math.floor(2**entropia / (100e6 * 60 * 60 * 24)) + " dias";
    }
}