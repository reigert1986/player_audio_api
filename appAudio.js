

const canciones = [
	{
		file : "audios/Devil_Leaf-Green_Force_Domain(2021).mp3" ,
		song : "Devil_Leaf-Green_Force_Domain"
	},
	{
		file : "audios/Stoned_Alive-Paradigm(2022).mp3" ,
		song : "Stoned_Alive-Paradigm(2022)"
	},
	{
		file : "audios/Varada-Detours(2022).mp3" ,
		song : "Varada-Detours(2022)"
	},
	{
		file : "audios/Dark Minimal Techno Mix 2022.m4a" ,
		song : "Dark Minimal Techno Mix 2022"
	},
	{
		file : "audios/Deborah De Luca & Marika Rossa & Alberto Ruiz.m4a" ,
		song : "Deborah De Luca & Marika Rossa & Alberto Ruiz"
	},
	{
		file : "audios/EDM Minimal & Psy Minimal Mix 2022.m4a" ,
		song : "EDM Minimal & Psy Minimal Mix 2022"
	},
	{
		file : "audios/Minimal Bounce & Minimal House Mix 2021.m4a" ,
		song : "Minimal Bounce & Minimal House Mix 2021"
	},
	{
		file : "audios/Progressive Psytrance mix April 2020.m4a" ,
		song : "Progressive Psytrance mix April 2020"
	},
	{
		file : "audios/TECH HOUSE CLASSIC MIX.m4a" ,
		song : "TECH HOUSE CLASSIC MIX"
	},
]

let index = 0; // INDICE DEL OBJETO CANCIONES

const play = document.querySelector(".play");
const pausa = document.querySelector(".pause");
let audio = document.createElement("audio");
const siguiente = document.querySelector(".siguiente");
const anterior = document.querySelector(".anterior");
const display = document.querySelector(".display"); 
const bar = document.querySelector(".barraProg");
const btn = document.querySelector(".btn");


/* HACER LA FUNCION PARA CARGAR Y REPRODUCIR CANCIONES */
function cargarCancion(){
	
	audio.src = canciones[index].file;
	audio.play();
	audio.addEventListener("timeupdate", () => {
		
		display.innerHTML = `
			
			<h3>tiempo transcurrido</h3> 
			<span>${segundosAString(Number.parseInt(audio.currentTime))}</span> 
			<br><span><h4>${canciones[index].song} </h4></span> 
			<br><span>Pista: </span><span>${index+1} de ${canciones.length}  </span>
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
		pausa.innerHTML = "Pause"
		return audio.play();
	} else {
		pausa.innerHTML = "Pause";
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



/* voy a añadir la lista de canciones o lo que salga*/
function listOfSong(){
	const list = document.querySelector(".list");
	for (let i = 0 ; i < canciones.length; i++){
		list.innerHTML += `<p> ${canciones[i].song} </p>`;
	}
}	
listOfSong()



