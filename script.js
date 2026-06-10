const materiais = [

{
emoji:"📰",
tipo:"papel",
erro:"O desperdício de papel aumenta a necessidade de derrubada de árvores."
},

{
emoji:"📦",
tipo:"papel",
erro:"Materiais de papel podem ser reciclados várias vezes."
},

{
emoji:"🥤",
tipo:"plastico",
erro:"O plástico pode permanecer séculos na natureza."
},

{
emoji:"🧴",
tipo:"plastico",
erro:"O plástico descartado incorretamente chega aos rios e oceanos."
},

{
emoji:"🍾",
tipo:"vidro",
erro:"O vidro pode causar acidentes e incêndios."
},

{
emoji:"🥫",
tipo:"metal",
erro:"Metais podem contaminar o solo e a água."
}

];

const gameArea = document.getElementById("gameArea");
const feedback = document.getElementById("feedback");
const pointsElement = document.getElementById("points");

let pontos = 0;

function criarItem(){

const material =
materiais[Math.floor(Math.random()*materiais.length)];

const item = document.createElement("div");

item.classList.add("item");
item.innerHTML = material.emoji;

item.dataset.tipo = material.tipo;
item.dataset.erro = material.erro;

item.style.left =
Math.random()*600 + "px";

item.style.top = "-80px";

gameArea.appendChild(item);

arrastar(item);

let posY = -80;

const queda = setInterval(()=>{

if(item.arrastando) return;

posY += 2;

item.style.top = posY+"px";

if(posY > 350){
clearInterval(queda);
item.remove();
}

},20);

item.queda = queda;
}

function arrastar(item){

let offsetX, offsetY;

item.addEventListener("mousedown",(e)=>{

item.arrastando = true;

offsetX = e.offsetX;
offsetY = e.offsetY;

});

document.addEventListener("mousemove",(e)=>{

if(!item.arrastando) return;

const rect = gameArea.getBoundingClientRect();

item.style.left =
(e.clientX - rect.left - offsetX)+"px";

item.style.top =
(e.clientY - rect.top - offsetY)+"px";

});

document.addEventListener("mouseup",()=>{

if(!item.arrastando) return;

item.arrastando = false;

verificar(item);

});

}

function verificar(item){

const bins =
document.querySelectorAll(".bin");

const itemRect =
item.getBoundingClientRect();

bins.forEach(bin=>{

const binRect =
bin.getBoundingClientRect();

const colidiu =
itemRect.left < binRect.right &&
itemRect.right > binRect.left &&
itemRect.top < binRect.bottom &&
itemRect.bottom > binRect.top;

if(colidiu){

clearInterval(item.queda);

if(item.dataset.tipo === bin.dataset.type){

pontos += 10;

feedback.innerHTML =
"🎉 Parabéns! Descarte correto!";

feedback.style.color = "green";

pointsElement.innerHTML = pontos;

}else{

feedback.innerHTML =
"❌ "+item.dataset.erro;

feedback.style.color = "#c62828";
}

item.remove();

}

});

}

setInterval(criarItem,1800);