/* Ejecuta la pagina
* Comenzar Inicia la aplicacion
* being created
*/
$(document).ready(function() {
	$.getJSON("preguntas.json", function(preguntas) {
		for(var i = 1; i <= preguntas.juego.length; i++) {
			$("#dificultad-set").append('<option value="' + i + '">' + i + '</option>');
		}
		$("#pre-comenzar").show();
		$("#comenzar").click(function() {
			var index = $('#dificultad-set').find(":selected").val() - 1;
			ko.applyBindings(new MillionaireModel(preguntas.juego[index]));
			$("#pre-comenzar").fadeOut('slow', function() {
				comenzarSonido('sonidoFondo', true);
				$("#juego").fadeIn('slow');
			});
		});
	});
});

/**
* Edita el formato de los numeros
*
* @param numero Representa el numero a fijar decimales, por defecto es 2.
* @param decimalDelim representa el delimitador decimal
* @param milesDelim representa el delimitador de miles
* @return retorna el numero con el siguiente formato: x.xxx.xxxx,xx
*/
Number.prototype.moneda = function(numero){
	var n = this, 
	numero = isNaN(numero = Math.abs(numero)) ? 2 : numero, 
	decimalDelim = ",", 
	milesDelim = ".", 
	negativo = n < 0 ? "-" : "", 
	i = parseInt(n = Math.abs(+n || 0).toFixed(numero)) + "", 
	j = (j = i.length) > 3 ? j % 3 : 0;
	return negativo + (j ? i.substr(0, j) +
		 milesDelim : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + milesDelim) +
		  (numero ? decimalDelim + Math.abs(n - i).toFixed(numero).slice(2) : "");
}

/**
* Reproduce sonido via HTML5
*
* @require requiere el id que es el indentificador de la etiqueta <audio>.
* @param id el id del elemento a reproducir.
* @param loop un boolean que indica si se debe reproducir.
*/
comenzarSonido = function(id, loop) {
	soundHandle = document.getElementById(id);
	if(loop)
		soundHandle.setAttribute('loop', loop);
	soundHandle.play();
}

/**
* Carga la vista del juego
* @param pregunta pregunta del banco de preguntas
*/
var MillionaireModel = function(pregunta) {
	var self = this;

	// Carga las preguntas
    this.preguntas = pregunta.preguntas;

    // bandera de transicion de los niveles
    this.transicion = false;

    // obtiene la moneda inicial
 	this.moneda = new ko.observable(0);

 	// inicializa el nivel
 	this.nivel = new ko.observable(1);

 	// Uso de las ayudas
 	this.usoCincuenta = new ko.observable(false);
 	this.usoLlamada = new ko.observable(false);
 	this.usoAudiencia = new ko.observable(false);

 	// opntiene la pregunta
 	self.getTextoPregunta = function() {
 		return self.preguntas[self.nivel() - 1].pregunta;
 	}

 	// obtiene la respuesta
 	self.getTextoRespuesta = function(index) {
 		return self.preguntas[self.nivel() - 1].contenido[index];
 	}

 	// uso de la opcion 50-50
 	self.cincuenta = function(item, event) {
 		if(self.transicion)
 			return;
 		$(event.target).fadeOut('slow');
 		var correcta = this.preguntas[self.nivel() - 1].correcta;
 		var primero = (correcta + 1) % 4;
 		var segundo = (primero + 1) % 4;
 		if(primero == 0 || segundo == 0) {
 			$("#respuesta-uno").fadeOut('slow');
 		}
 		if(primero == 1 || segundo == 1) {
 			$("#respuesta-dos").fadeOut('slow');
 		}
 		if(primero == 2 || segundo == 2) {
 			$("#respuesta-tres").fadeOut('slow');
 		}
 		if(primero == 3 || segundo == 3) {
 			$("#respuesta-cuatro").fadeOut('slow');
 		}
 	}

 	// desvanece las ayudas cuando son uadas
 	self.opcionDesvanecer = function(item, event) {
 		if(self.transicion)
 			return;
 		$(event.target).fadeOut('slow');
 	}

 	// Valida la respuesta
 	self.respuestaPregunta = function(indice, elm) {
 		if(self.transicion)
 			return;
 		self.transicion = true;
 		if(self.preguntas[self.nivel() - 1].correcta == indice) {
 			self.respuestaCorrecta(elm);
 		} else {
 			self.respuestaMala(elm);
 		}
 	}

 	// Procedimiento de respuesta Correcta
 	// Valida si el jugador gano cuando completa los niveles
 	self.respuestaCorrecta = function(elm) {
 		$("#" + elm).slideUp('slow', function() {
 			comenzarSonido('sonidoCorrecto', false);
 			$("#" + elm).css('background', 'green').slideDown('slow', function() {
 				self.moneda($(".active").data('amt'));
 				if(self.nivel() + 1 > 8) {
	 				$("#juego").fadeOut('slow', function() {
	 					$("#fin-juego").html('Ganaste!');
	 					$("#fin-juego").fadeIn('slow');
	 				});
 				} else {
 					self.nivel(self.nivel() + 1);
 					$("#" + elm).css('background', 'none');
			 		$("#respuesta-uno").show();
			 		$("#respuesta-dos").show();
			 		$("#respuesta-tres").show();
			 		$("#respuesta-cuatro").show();
			 		self.transicion = false;
 				}
 			});
 		});
 	}

 	// Proceso de perder juego
 	self.respuestaMala = function(elm) {
 		$("#" + elm).slideUp('slow', function() {
 			comenzarSonido('sonidoIncorrecto', false);
 			$("#" + elm).css('background', 'red').slideDown('slow', function() {
 				$("#juego").fadeOut('slow', function() {
 					$("#fin-juego").html('Game Over!');
 					$("#fin-juego").fadeIn('slow');
 					self.transicion = false;
 				});
 			});
 		});
 	}

 	// Gontiene el formato de la moneda
 	self.formatoMoneda = function() {
	    return self.moneda().moneda(2);
	}
};

