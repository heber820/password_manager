let nombreUsuario;

class Password {
    constructor(category, sitie, username, pass, observations) {
      this.category = category;
      this.sitie = sitie;
      this.username = username;
      this.pass = pass;
      this.observations = observations;
    }
  }



  
document.getElementById("formulario-usuario").addEventListener("submit", manejadorFormularioUsuario);

function manejadorFormularioUsuario(e) {
  console.log(e);
  e.preventDefault();
  nombreUsuario = document.getElementById("user").value;

  const listPassword = document.getElementById("listPassword");
  const passwords = JSON.parse(localStorage.getItem(nombreUsuario));

  // OPERADOR TERNARIO

  passwords == null ? listPassword.innerHTML = "<h2>Aun no tienes contraseñas almacenadas</h1>" : verPassword(passwords)

  mostrarPanel();
}



function verPassword(passwords) {
  let listPassword = document.getElementById("listPassword");
  listPassword.innerHTML = "";

  passwords.forEach(password => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <th scope="row" class="table-secondary border-primary" >${ password.category }</th>
        <td class="table-secondary border-primary">${ password.sitie }</td>
        <td class="table-secondary border-primary">${ password.username }</td>
        <td class="table-secondary border-primary">${ password.pass }</td>
        <td class="table-secondary border-primary">${ password.observations }</td>`;
        
      const botonBorrar = crearBotonEliminar(password);
      tr.appendChild(botonBorrar);
      listPassword.appendChild(tr);

});
}

//Crear boton Eliminar
function crearBotonEliminar(password){
  const botonBorrar = document.createElement("button");
    botonBorrar.classList.add('btn', 'btn-danger');
    botonBorrar.innerText = "Borrar";
    botonBorrar.addEventListener("click", () => {
 
  eliminarPassword(password);
        
      })
      return botonBorrar;
    }
    


//Funcion Mostrar Contraseñas

function mostrarPanel() {
  const contenedorFormulario = document.getElementById("contenedorFormulario");

  contenedorFormulario.innerHTML =`
  <h2>Guarda una Contraseña ${nombreUsuario}</h2>
    <form id="formulario-password" onsubmit="return validarCampos()">
    <label for="categoria">Seleccione una categoría</label>
        <select id="category" class="form-select" required>
            <option value="">Seleccione una Categoría</option>
            <option value="Banca">Banca</option>
            <option value="Correo">Correo</option>
            <option value="Ordenador">Ordenador</option>
            <option value="Web">Web</option>
            <option value="Tarjetas de Crédito">Tarjetas de Crédito</option>
            <option value="Tiendas Electrónicas">Tiendas Electrónicas</option>
            <option value="Otras">Otras</option>
        </select>
    <label for="sitie">Nombre del Sitio</label>
    <input id="sitie" type="text"  placeholder="Sitio" required>
    <label for="nombreusuario">Ingrese Usuario</label>
    <input id="username" type="text"  placeholder="Usuario" required>
    <label for="password">Ingrese Contraseña</label>
    <input id="pass" type="password" placeholder="Contraseña" required>
    <label for="recordatorio">Ingrese Recordatorio</label>
    <input id="observations" type="text"  placeholder="Recordatorio">
    <br>
    <div class="col-lg text-center">
    <br>
    <button id="btnAgregar" class="btn btn-primary" type="submit">Agregar</button>
    <input class="btn btn-primary" type="reset" value="Borrar Formulario">
    </div>
    </form>`;

  document.getElementById("formulario-password").addEventListener("submit", agregarPassword);
}

function validarCampos() {

  const btnAgregar = document.getElementById('btnAgregar');

const validate = (e) => {
  // e.preventDefault();
  const sitie = document.getElementById('sitie');
  const username = document.getElementById('username');
  const pass = document.getElementById('pass');
  if (sitie.value === "") {
    avisoCampoVacio();
    sitie.focus();
    return false;
  }
  if (username.value === "") {
    avisoCampoVacio();
    username.focus();
    return false;
  }
  if (pass.value === "") {
    avisoCampoVacio();
    pass.focus();
    return false;
  }
  
  return true;
}

btnAgregar.addEventListener('click', validate);
}


  function avisoCampoVacio(){
    Swal.fire({
      title: 'Error!',
      text: 'Los campos "Sitio", "Usuario" y "Contraseña" no pueden estar vacios.',
      icon: 'error',
      confirmButtonText: 'Aceptar '
  })

  }

function Bienvenida(){
  Swal.fire({
    title: 'Bienvenido a su Gestor de Contraseñas',    
    backdrop: true,
    timer: 4000,
    timerProgressBar: true,
    position: 'top',
    allowOutsideClick: true,
    imageUrl: 'media/candado.png',
    imageWidth: '200px',
    imageAlt: 'candado',
    background: '#E2D9C2',  
})
}



function agregarPassword(e) {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const sitie = document.getElementById("sitie").value;
  const username = document.getElementById("username").value;
  const pass = document.getElementById("pass").value;
  const observations = document.getElementById("observations").value;

  const password = new Password (category, sitie, username, pass, observations);

  validarCampos(password);

  const passwordsEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));

  if (passwordsEnLocalStorage == null) {
    localStorage.setItem(nombreUsuario, JSON.stringify([password]));
    verPassword([password]);
  } else {
    passwordsEnLocalStorage.push(password);
    localStorage.setItem(nombreUsuario, JSON.stringify(passwordsEnLocalStorage));
    verPassword(passwordsEnLocalStorage);
  }
  e.target.reset();
}


function eliminarPassword(password) {
  const passwordsEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));
  const nuevoArray = passwordsEnLocalStorage.filter(item => item.sitie != password.sitie);
  localStorage.setItem(nombreUsuario, JSON.stringify(nuevoArray));
  verPassword(nuevoArray);
}

// Mostrar Ejemplos desde JSON
var contenido = document.querySelector('#contenido')

function traer() {
  fetch('tabla.json')
    .then(res => res.json())
    .then(datos => {
                    
    tabla(datos)
                })
        }

function tabla(datos) {
          
  contenido.innerHTML = ''
  for(let valor of datos){
              
  contenido.innerHTML += `  
  <tr class="table-secondary border-primary">
    <th scope="row">${ valor.categoria }</th>
    <td>${ valor.sitio }</td>
    <td>${ valor.usuario }</td>
   <td>${ valor.contraseña }</td>
    <td>${ valor.recordatorio }</td>
  </tr>
`
  }
}

// Ocultar Ejemplos desde JSON

var contenido = document.querySelector('#contenido')
function ocultarEjemplos() {
  contenido.innerHTML = ''
 }