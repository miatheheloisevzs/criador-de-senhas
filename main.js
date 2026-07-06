
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
// tamanhoSenha = tamanhoSenha-1;
tamanhoSenha--;
}
numeroSenha.textContent = tamanhoSenha;
geraSenha();
}
function aumentaTamanho(){
if(tamanhoSenha < 20){
// tamanhoSenha = tamanhoSenha+1;
tamanhoSenha++;
}
numeroSenha.textContent = tamanhoSenha;
geraSenha();
}

for (i=0; i < checkbok.length;i++){
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
for (let i = 0; i < tamanhoSenha;i++){
let numeroAleatorio = Math.random()*alfabeto.length;
numeroAleatorio = Math.floor(numeroAleatorio);
senha = senha + alfabeto[numeroAleatorio];
}
campoSenha.value = senha;
classficaSenha(alfabeto.length);
}

function classficaSenha(tamanhoSenha){
let entropia = tamanhoSenha * Math.log2(alfabeto.length);
console.log(entropia);
forcaSenha.classList.remove('fraca','media','forte');
if(entropia > 57){
forcaSenha.classList.add('forte');
} else if (entropia > 35 && entropia < 57 ){
forcaSenha.classList.add('media');
} else if (entropia <= 35)
forcaSenha.classList.add('fraca');

const valorEntropia = document.querySelector('.entropia');
valorEntropia.textContent = 2**Math.floor(entropia)/(100e6*60*60*24);
}