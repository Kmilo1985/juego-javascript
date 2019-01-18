//declaracion de objetos y variables


var contPregunta = 0;
var totalPreguntas= 12;
var listaPreguntas = [];
var respuestaCorrecta = "";
var indicePregunta= 0;
var final = false;
var contadorIndice = 0;

window.addEventListener('load',inicial);

//Fucion iniciar Juego
function inicial(){
	Bienvenida();
	sonidoEntrada();
	pintarNiveles();
	cargarPreguntas();
}


//Funcion cargar preguntas y finalizar juego
 function cargarPreguntas()
{	//nivelesColor()
	cambiarNumero();
	contPregunta = indicePregunta;
	

 	if (!final) 
	{
		cuestionariover();
			
	} 	
}		  



//Funcion para hacer el ramdon a las seccion de preguntas
function cambiarNumero()
{

     //validamos si ya respondio todas las preguntas
	if(listaPreguntas.length == totalPreguntas){
		document.getElementById("validacion").innerHTML = "Ganaste!";
		final = true;
	//si no ha respondido todas las preguntas consultamos un numero
	
	}else{
		//consultamos el numero random
		indicePregunta = Math.floor((Math.random() * totalPreguntas));

		//si el numero ya esta volvemos a entrar a este metodo y consultamos denuevo
		if(listaPreguntas.indexOf(indicePregunta) != -1){
			cambiarNumero();

		// si no esta lo agregamos a nuestra lista de numeros	
		}else{
			listaPreguntas.push(indicePregunta);
		}
	}
}

//funcion para mostrar questionario y oranizar vector con cada seccion de preguntas.
function cuestionariover() 
{
	respuestaCorrecta = cuestionario["preguntas"][contPregunta].correcta;

	var pregunta = "<h4>" + cuestionario["preguntas"][contPregunta].pregunta +"</h4>";
	var respuestaA =  " <input type='radio' onclick='validarRespuestas()' id='r1' value='" + cuestionario["preguntas"][contPregunta].r1 + "' name='r1' />" + "<label for='r1'>"+ cuestionario["preguntas"][contPregunta].r1  + "</label>";
	var respuestaB =  " <input type='radio' onclick='validarRespuestas()' id='r2' value='" + cuestionario["preguntas"][contPregunta].r2 + "' name='r2' />" + "<label for='r2'>"+ cuestionario["preguntas"][contPregunta].r2  + "</label>";
	var respuestaC =  " <input type='radio' onclick='validarRespuestas()' id='r3' value='" + cuestionario["preguntas"][contPregunta].r3 + "' name='r3' />" + "<label for='r3'>"+ cuestionario["preguntas"][contPregunta].r3  + "</label>";
	var respuestaD =  " <input type='radio' onclick='validarRespuestas()' id='r4' value='" + cuestionario["preguntas"][contPregunta].r4 + "' name='r4' />" + "<label for='r4'>"+ cuestionario["preguntas"][contPregunta].r4  + "</label>";

	document.getElementById("cuestionarioVista").innerHTML = pregunta;
	document.getElementById("a1").innerHTML = respuestaA;
	document.getElementById("a2").innerHTML = respuestaB;
	document.getElementById("a3").innerHTML = respuestaC;
	document.getElementById("a4").innerHTML = respuestaD;	
	}

//Funcion para validar respuestas	
function validarRespuestas(elm)
{
	var flagEntro = false;
	try {

		if(document.getElementById("r1").checked
			&& document.getElementById("r1").defaultValue==respuestaCorrecta){
			  document.getElementById("validacion").innerHTML="Correcto, Continúa!";         
	            
	            flagEntro = true;
				pintarNiveles();
				cargarPreguntas();
				sonidoGano();
		
		}
	}catch(err) {}

	try {
		if(document.getElementById("r2").checked
			&& document.getElementById("r2").defaultValue == respuestaCorrecta){
			document.getElementById("validacion").innerHTML= "Correcto, Continúa!";
			
			flagEntro = true;
			pintarNiveles();
			cargarPreguntas();
			sonidoGano();
			
		}
	}catch(err) {}

	try {
		if(document.getElementById("r3").checked
			&& document.getElementById("r3").defaultValue == respuestaCorrecta){
			document.getElementById("validacion").innerHTML= "Correcto, Continúa!";
			
			flagEntro = true;
			pintarNiveles();
			cargarPreguntas();
			sonidoGano();
	
		} 
	}catch(err) {}

	try {

		if(document.getElementById("r4").checked
			&& document.getElementById("r4").defaultValue == respuestaCorrecta){
			document.getElementById("validacion").innerHTML= "Correcto, Continúa!";
			
			flagEntro = true;
			pintarNiveles();
			cargarPreguntas();
			sonidoGano();
			
		} 
	}catch(err) {}

	if(!flagEntro){
					
		activarModal();
		ganancia();
		sonidoperdio();
			
	}

}


function ayudas5050(){

	/* Este las elimina reposicionando las demas respuestas
	document.getElementById(cuestionario["preguntas"][contPregunta].quitar1).style.display = "none";
	document.getElementById(cuestionario["preguntas"][contPregunta].quitar2).style.display = "none";
	*/
	// este remplaza la respuesta con textos invalidos
	document.getElementById(cuestionario["preguntas"][contPregunta].quitar1).disabled = true;
	document.getElementById(cuestionario["preguntas"][contPregunta].quitar2).disabled = true;
	document.getElementById("continuar").style.display="none";
	// validarRespuestas()

}
//trae datos del json
function pintarNiveles(){
	var niveles = "";
	
	for (var i =1; i <= 12; i++) {
		
		niveles += "<div id='" + ((listaPreguntas.length + 1) == i ? "activo" : "celda") + "' class='col s3'><a href='#!' class='collection-item' id='level" + i + "'>$" + listaValores[i] + "</a></div>";
	}
	
	document.getElementById("conteoNiveles").innerHTML = niveles;
	
}

//Funcion para reiniciar despues de ganar o perder el juego.
 function refresh(){
            
   location.reload(true);                 
}

//Funcion para Mostrar la ganancia obtenida
function ganancia(){

	var totalb = listaValores[listaPreguntas.length - 1];

	if (totalb == "") {

		document.getElementById("ganancia").innerHTML="$0. Intenta otra vez!";

	} else {
		listaValores.slice(totalb);
		document.getElementById("ganancia").innerHTML="$" + totalb +", Quieres Ganar mas, intenta otra vez!";

	}
}



function activarModal() {
	$(document).ready(function(){ 
    $('.modal-trigger').leanModal();
    $('#modal1').openModal({dismissible: false})

  });
}


// aqui define las propiedades del modal juego terminado
function modalvis(){

$('.modal-trigger').leanModal({
      opacity: 2.5, 
      in_duration: 300, 
      out_duration: 200, 
      starting_top: '4%', 
      ending_top: '10%', 
    }
  );
}		


// AQUI ejecuto animacion y sonidos alternos

function Bienvenida(){

	$(document).ready(function(){
	
	
	$('.contenido').fadeOut(500)
	// .animate({height : '1rem'}, 'slow')
	// .animate({width : '12rem'}, 'swing')
	$('.test').fadeOut(1000)
		//.animate({left : '60%'}, 'swing')
		.animate({'font-size' : '1rem'}, 'swing')
		.animate({'font-size' : '8rem'}, 300)
		.animate({show: {
          effect: "blind",
          duration: 1000
				      },
					 hide: {
				        effect: "explode",
				        duration: 1000
    						}


				 }, 500)
							
})

$(document).ready(function(){
	// $('.test').fadeOut(2000);
	$('.contenido').fadeIn(2000);
	$('.test').fadeIn(2000);
})

}

// function sonidoError(){

// 	$(document).ready(function(){

// 		$("#audio2")[0].pause();
// 		$("#audio2")[0].play();
// 	})
// }

function sonidoEntrada()
{
var inicio = document.createElement("audio");
    inicio.src= "sound/background.mp3";
	return inicio.play();
}

function sonidoGano()
{
var gano = document.createElement("audio");
    gano.src= "sound/right.mp3";
	return gano.play();
}

function sonidoperdio()
{
var perdio = document.createElement("audio");
    perdio.src= "sound/wrong.mp3";
	return perdio.play();
}
 