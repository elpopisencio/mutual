// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}




let inputDocumento = document.querySelector('#dniBuscar');
inputDocumento.addEventListener('input', buscar);
let inputLegajo = document.querySelector('#legajoBuscar');
inputLegajo.addEventListener('input', buscar);
let inputNombre = document.querySelector('#nombreBuscar');
let inputApellido = document.querySelector('#apellidoBuscar');
inputNombre.addEventListener('input', buscar);
inputApellido.addEventListener('input', buscar);

function habilitar(inputs, bool){
	if(!bool){
		for(i in inputs){
			document.getElementById(inputs[i]).setAttribute("disabled","true");
		}
	}else{
		for(i in inputs){
			document.getElementById(inputs[i]).removeAttribute("disabled");
		}
	}
}

function buscar(e){
	e.preventDefault();

	var dni = document.getElementById('dniBuscar').value;
	var legajo = document.getElementById('legajoBuscar').value;
	var nombre = document.getElementById('nombreBuscar').value;
	var apellido = document.getElementById('apellidoBuscar').value;
	
	//Permitir que busque solo por documento o legajo o nombre y apellido
	if(dni!=''){
		habilitar({1:'legajoBuscar', 2:'nombreBuscar', 3:'apellidoBuscar'}, false);
	}else{
		if(legajo!=''){
			habilitar({1:'dniBuscar', 2:'nombreBuscar', 3:'apellidoBuscar'}, false);
		}else{
			if(nombre!='' || apellido!=''){
				habilitar({1:'dniBuscar', 2:'legajoBuscar'}, false);
			}else{
				habilitar({1:'legajoBuscar', 2:'nombreBuscar', 3:'apellidoBuscar', 4:'dniBuscar'}, true);
			}
		}
	}
	
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/busqueda?numero_documento='+dni+'&legajo='+legajo+'&apellido='+apellido+'&nombre='+nombre;
	var cuerpo = '';
	xhr.open('GET', consulta, true);

	xhr.onload = function(){
		var afiliados = JSON.parse(this.responseText);
		if(this.status == 200){
			cuerpo+='<table class="table"> <thead> <tr>'+
				'          <th>Apellido</th> <th>Nombre</th> <th>DNI</th> <th>Estado</th> <th>Acciones</th>'+
				'        </tr> </thead> <tbody>';
			var x = 1;
			for(i in afiliados){
				cuerpo += '<tr>'+
					'        <td>'+afiliados[i].apellido+'</td>'+
					'        <td>'+afiliados[i].nombre+'</td>'+
					'        <td>'+afiliados[i].numero_documento+'</td>'+
					'        <td width="10%">';

				if(afiliados[i].id_estado == 3){
					cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Baja', 'danger');
				}else{
					if(afiliados[i].id_estado == 2){
						cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Inhabilitado', 'warning');
					} else{
						cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Habilitado', 'success');
					}
				}
				cuerpo +='  </td>'+				
					'        <td width="30%">'+
					'          <div class="row">'+
					setBoton('modalMostrar', 'mostrar', afiliados[i].numero_documento, 'Mostrar', 'primary');
				if(afiliados[i].numero_carga == 0){
					cuerpo += setBoton('modalEditarTitular', 'editar', afiliados[i].numero_documento, 'Editar', 'primary');
					cuerpo += setBoton('modalAltaCarga', 'carga', afiliados[i].numero_documento, 'Carga', 'primary');

				}else{
					cuerpo += setBoton('modalEditarCarga', 'editar', afiliados[i].numero_documento, 'Editar', 'primary');
					cuerpo += '<div class="col"></div>';
				}
				cuerpo += '          </div> </td> </tr>';
				x = x+1;
			}
			cuerpo += '</tbody></table>';
			document.getElementById('datos').innerHTML = cuerpo;
			
			for(i in afiliados){
				document.getElementById('mostrar_'+afiliados[i].numero_documento).addEventListener('click',mostrarAfiliado);				
				if(afiliados[i].numero_carga == 0){
					document.getElementById('editar_'+afiliados[i].numero_documento).addEventListener('click',mostrarEditarTitular);
					document.getElementById('carga_'+afiliados[i].numero_documento).addEventListener('click',mostrarAgregarCarga);
				}else{
					document.getElementById('editar_'+afiliados[i].numero_documento).addEventListener('click',mostrarEditarCarga);
				}
					document.getElementById('estado_'+afiliados[i].numero_documento).addEventListener('click',mostrarCambiarEstado);
			}
		}else{
			//document.getElementById('mensaje').innerHTML = '<h2> No se encontro el afiliado con el dni: '+ dni +'</h2>';			
		}
	}
	xhr.send();
}

function setBoton(dataTarget, ide, valu, placeholder, btn){
	return '<div class="col"><button type="button" class="btn btn-'+btn+' btn-sm btn-block" data-toggle="modal" data-target="#'+dataTarget+'" id="'+ide+'_'+valu+'" value='+valu+'> '+placeholder+' </button></div>';
}
