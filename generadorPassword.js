(function(){
	/* Variables y Objetos Generales */
	

	// Variable donde guardamos el formulario de la app.
	var app = document.getElementById('app');

	// Variable donde guardamos el input de numero de caracteres.
	var inputCaracteres = document.getElementById('numero-caracteres');

// Selecctor de opciones de password//
	var configuracion = {
		caracteres: parseInt(inputCaracteres.value),
		simbolos: true,
		numeros: true,
		mayusculas: true,
		minusculas: true,
	}

	var caracteres = {
		numeros: '0 1 2 3 4 5 6 7 8 9',
		simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
		mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
		minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
	}

	/* Eventos */


	// Evento para evitar que la app haga un submit para enviar los datos y se refresque la pagina.
	app.addEventListener('submit', function(e){
		e.preventDefault();
	});

	// Evento para el boton que incrementa en uno el numero de caracteres.
	app.elements.namedItem('btn-mas-uno').addEventListener('click', function(){
		configuracion.caracteres++;
		inputCaracteres.value = configuracion.caracteres;

	
	});

	// Evento para el boton que decrementa en uno el numero de caracteres.
	app.elements.namedItem('btn-menos-uno').addEventListener('click', function(){
		// Validamos que no puedan seleccionar un numero menor a 1
		if (configuracion.caracteres > 1) {
			configuracion.caracteres--;
			inputCaracteres.value = configuracion.caracteres;
		}
	});

	// Evento para el boton de simbolos que activara o desactivara si queremos simbolos en la contraseña.
	app.elements.namedItem('btn-simbolos').addEventListener('click', function(){
		btnToggle(this);

		// Alternamos entre true y false en la propiedad del objeto de configuracion.
		configuracion.simbolos = !configuracion.simbolos;

	});

	// Evento para el boton de numeros que activara o desactivara si queremos numeros en la contraseña.
	app.elements.namedItem('btn-numeros').addEventListener('click', function(){
		
		btnToggle(this);

		// Alternamos entre true y false en la propiedad del objeto de configuracion.
		configuracion.numeros = !configuracion.numeros;
	});

	// Evento para el boton de mayusculas que activara o desactivara si queremos mayusculas en la contraseña.
	app.elements.namedItem('btn-mayusculas').addEventListener('click', function(){
		// Ejecutamos la funcion que alternara el icono y el fondo del boton.
		btnToggle(this);

		// Alternamos entre true y false en la propiedad del objeto de configuracion.
		configuracion.mayusculas = !configuracion.mayusculas;
	});

	// Evento para el boton de generar contraseña.
	app.elements.namedItem('btn-generar').addEventListener('click', function(){
		// Ejecutamos la funcion que generara la contraseña.
		generarPassword();
		
	});

	// Evento para el input de contraseña cuando reciba un click.
	app.elements.namedItem('input-password').addEventListener('click', function(){
		// Ejecutamos la funcion que copiara el texto.
		copiarPassword();
	});
	
	/* Funciones */
	
	// Funcion que permite alternar el estilo e icono de los botones.
	function btnToggle(elemento){
		elemento.classList.toggle('false');
		elemento.childNodes[0].classList.toggle('fa-check');
		elemento.childNodes[0].classList.toggle('fa-times');
	}
	
	// Funcion que genera la contraseña.
	function generarPassword(){
		
		var caracteresFinales = '';
		var password = '';

		for(propiedad in configuracion){
		
			if (configuracion[propiedad] == true){
				caracteresFinales += caracteres[propiedad] + ' ';
			}
		}

		// Eliminamos el ultimo espaciado que sobra en la cadena de texto.
		caracteresFinales = caracteresFinales.trim();


		// Convertimos la cadena de texto de caracteres finales a un arreglo.
		caracteresFinales = caracteresFinales.split(' ');

		// Ciclo que genera la contraseña letra por letra al azar.
		for(var i = 0; i < configuracion.caracteres; i++){
			password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
		}

		// Mostramos la password en el input de contraseña.
		app.elements.namedItem('input-password').value = password;
	}

	// Funcion que nos permite copiar el texto al portapapeles.
	function copiarPassword(){
		// Selecciona el texto de un input
		app.elements.namedItem('input-password').select();
		// Copiamos el Texto
		document.execCommand("copy");
		document.getElementById('alerta-copiado').classList.add('active');
		
		setTimeout(function(){
			document.getElementById('alerta-copiado').classList.remove('active');
		}, 2000)
	}

}())