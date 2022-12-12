

const canciones = [
	{
		file : "./audio/pista1.mp3",
		song : "pista1"
	},
	{
		file : "./audio/pista2.mp3",
		song : "pista2"
	},
	{
		file : "./audio/pista3.mp3",
		song : "pista3"
	},
	{
		file : "./audio/pista4.mp3",
		song : "pista4"
	},
	
]



let index = 0; // INDICE DEL OBJETO CANCIONES

const play = document.querySelector(".play");
const pausa = document.querySelector(".pause");
let audio = document.createElement("audio");
const siguiente = document.querySelector(".siguiente");
const anterior = document.querySelector(".anterior");
let display = document.querySelector(".display"); 
let bar = document.querySelector(".barraProg");

/* HACER LA FUNCION PARA CARGAR Y REPRODUCIR CANCIONES */
function cargarCancion(){
	
	audio.src = canciones[index].file;
	audio.play();
	audio.addEventListener("timeupdate", () => {
		
		display.innerHTML = `
			<h3>Tiempo Transcurrido</h3> 
			<span>${segundosAString(Number.parseInt(audio.currentTime))}</span> 
			<br><span><h4>${canciones[index].song} </h4></span> 
			<br><span><h5>${porcentaje()} %  </h5></span>  	
			<br><span>Pista: ${index+1} de ${canciones.length}  </span>
			<br><span>${countBack()}</span><br>
				
			
			`;
	playSongList();
		 
	})
	
	
}

play.addEventListener("click", cargarCancion )
 
  /* asociar al boton Pause */
pausa.addEventListener("click", pausePlay)



// Funcion para pausar o darle play 
function pausePlay() {
	if (audio.paused){
		pausa.innerHTML = "push pause"
		return audio.play();
	} else {
		pausa.innerHTML = "dale al pausa otra vez ";
		return audio.pause();
	}
}

// Cambiar Canciones con el boton

siguiente.addEventListener("click", siguienteCancion);
anterior.addEventListener("click", anteriorCancion);

function siguienteCancion() {
	index ++;
	cargarCancion();
}
function anteriorCancion(){
	index --;
	cargarCancion();	
}
// REPRODUCIR Lista entera

function playSongList(){
	audio.addEventListener("ended", siguienteCancion )
}



//Funcion para convertir segundos a minutos y horas
function segundosAString(segundos) {
	var hora="";
	if (segundos>3600){
		hora = Math.floor(segundos / 3600);
		hora = (hora < 10)? '0' + hora : hora;
		hora+=":"
	}
	var minutos = Math.floor((segundos / 60) % 60);
	minutos = (minutos < 10)? '0' + minutos : minutos;
	var segundos = segundos % 60;
	segundos = (segundos < 10)? '0' + segundos : segundos;
	return hora  + minutos + ':' + segundos;
}

// FUNCION que muestre el porcentaje 

function porcentaje(){
	let porcent = parseInt((audio.currentTime / audio.duration) * 100);
	bar.style.width = porcent + "%";
	return porcent;
}



// FUNCION PARA RESETEAR CANCIONES
let reset = document.querySelector(".reset");
    reset.addEventListener("click", resetear);
	
function resetear(){
	index = 0;
	cargarCancion()
}

function countBack(){
	let cont = parseInt(audio.duration - audio.currentTime);
	return 	segundosAString(cont);
	 
	
}
