const X = 'X'
const O = 'O'
const EMPTY = ''

let turn;
let restart1 = document.querySelector('#restart1')
let restart2 = document.querySelector('#restart2')
let squares = document.querySelectorAll("td")
let ganador;

function changeTurn() {
	turn=turn==X? O:X;
	$('#turnoJugador').text("Turno del jugador: "+turn);
	
	$('#turnoJugador2').text("Turno del jugador: "+turn);
}

function init() {
	console.log("en el init");
	ganador=EMPTY;
	turn =Math.floor(Math.random() * 2)==0? X:O;
	$('#msjGanador').text("");
	$('#turnoJugador').text("Turno del jugador: "+turn);
	$('#turnoJugador2').text("Turno del jugador: "+turn);
	for (let i = 0; i < squares.length; i++) {
		squares[i].textContent = EMPTY;
		squares[i].style.background="white";
	}
}

function markHere() {
	console.log("--> evento del click  <--")
	if (ganador != EMPTY&&this.textContent==EMPTY) {
		this.textContent=EMPTY;
	} else {
		if (this.textContent == EMPTY) {
			this.textContent = turn
			changeTurn()
		} else if ((this.textContent == X || this.textContent == O) && ganador==EMPTY) {
			alert("you can not mark in a marked cell!!!");
		}
	}
	if (hayGanador()) {
		$('#msjGanador').text("el ganador es: "+ganador);
	}else if(hayEmpate()){
		$('#msjGanador').text("EMPATE TECNICO!!");
	}
}
function hayGanador() {
	res = false;
	let aux;
	for (let i = 0; i < 3 && !res; i++) {
		aux = squares[i].textContent;
		if (aux != EMPTY && aux == squares[i + 3].textContent && aux == squares[i + 6].textContent) {
			res = true;
			ganador = aux;
			squares[i].style.background="#00b300";
			squares[i+3].style.background="#00b300";
			squares[i+6].style.background="#00b300";
			
		}
	}
	for (let i = 0; i < 9 && !res; i += 3) {
		aux = squares[i].textContent;
		if (aux != EMPTY && aux == squares[i + 1].textContent && aux == squares[i + 2].textContent) {
			res = true;
			ganador = aux;
			squares[i].style.background="#00b300";
			squares[i+1].style.background="#00b300";
			squares[i+2].style.background="#00b300";
		}
	}
	aux = squares[0].textContent;
	if (aux != EMPTY && aux == squares[4].textContent && aux == squares[8].textContent) {
		res = true;
		ganador = aux;
		squares[0].style.background="#00b300";
		squares[4].style.background="#00b300";
		squares[8].style.background="#00b300";
	}
	aux = squares[2].textContent;
	if (aux != EMPTY && aux == squares[4].textContent && aux == squares[6].textContent) {
		res = true;
		ganador = aux;
		
		squares[2].style.background="#00b300";
		squares[4].style.background="#00b300";
		squares[6].style.background="#00b300";
	}
	return res;
}
function hayEmpate(){
	res=true;
	for(let i=0;i<squares.length&&res;i++){
		if(squares[i].textContent==EMPTY){
			res=false;
		}
	}
	return res;
}
restart1.addEventListener('click', init)
restart2.addEventListener('click', init)


for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', markHere);
}


init();

$("td").hover(function () {
	//console.log("en una celda");
	//otra();
	if (this.textContent == EMPTY&&ganador==EMPTY) {
		$(this).css("background-color", "lightblue");
	}
},
	function () {
		//console.log("deje la celda");
		if(ganador==EMPTY){
			$(this).css("background-color", "white");
		}
	});