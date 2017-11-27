// VARIABLES GLOBALES:
var direccion = "http://192.168.0.51:8080/";
var atributos = {gruposSanguineos:"_", tiposdni:"_", delegaciones:"_", parentescos:"_", estados:"_", motivosBajas:"_", reparticiones:"_", lugares:"_", unidades:"_", localidades:"_"};

// FUNCIONES LLAMADAS AL INICIO:
setAtributos();

// EVENT LISTENERS:
document.getElementById('afiliacionTitular').addEventListener('submit',altaTitular);
document.getElementById('afiliacionCarga').addEventListener('submit',altaCarga);
document.getElementById('estado').addEventListener('submit',bajaAfiliado);
document.getElementById('editarTitularForm').addEventListener('submit',editarTitular);
document.getElementById('editarCarga').addEventListener('submit',editarCarga);


// GETS:
function getValueTitular(sufijo){
	var titular = {apellido:"", nombre:"", sexo:"", id_tipo_documento:"", numero_documento:"", grupo_sanguineo:"", fecha_alta:"", fecha_tarjeta:"", fecha_nacimiento:"", id_reparticion:"", legajo:"", subcontrato:"", servicio:"", lugar_pago:"", cuil:"", numero_carga:0, id_delegacion:"", telefono:"", email:"", domicilio:"", codigo_postal:"", id_unidad_servicio:"", id_tipo_documento_titular:"", numero_documento_titular:""};
	for(i in titular){
		if (document.getElementById(i+"_"+sufijo) != null){
			titular[i]=document.getElementById(i+"_"+sufijo).value;
		}
	}
	return titular;
}


function ajaxReq(consulta, metodo, bool){
	var xhr = new XMLHttpRequest();
	xhr.open(metodo, direccion+consulta, bool);
	xhr.onload = function(){
		//console.log(this.responseText);
		atributos[consulta] = JSON.parse(this.responseText);
		llenarDrops();
	console.log(atributos[consulta]);
	}
	xhr.send();
}

// SETS:
function setAtributos(){
	ajaxReq('tiposdni', 'GET', true);
	ajaxReq('gruposSanguineos', 'GET', true);
	ajaxReq('localidades', 'GET', true);
	ajaxReq('unidades', 'GET', true);
	ajaxReq('parentescos', 'GET', true);
	ajaxReq('estados', 'GET', true);
	ajaxReq('lugares', 'GET', true);
	ajaxReq('motivosBajas', 'GET', true);
	ajaxReq('lugares', 'GET', true);
	ajaxReq('delegaciones', 'GET', true);
	ajaxReq('reparticiones', 'GET', true);

}

function llenarDrops(){
	setDiv('id_reparticion_titular', 'reparticion', 'Reparticiones', atributos.reparticiones, true);
	setDiv('id_reparticion_carga', 'reparticion', 'Reparticiones', atributos.reparticiones, false);
	setDiv('id_reparticion_editar_titular', 'reparticion', 'Reparticiones', atributos.reparticiones, true);
	setDiv('id_reparticion_editar_carga', 'reparticion', 'Reparticiones', atributos.reparticiones, false);
	setDiv('grupo_sanguineo_titular', 'nombre', 'Grupo Sanguineo', atributos.gruposSanguineos, false);
	setDiv('id_localidad_titular', 'nombre_localidad', 'Localidad', atributos.localidades, false);
	setDiv('id_delegacion_titular', 'delegacion', 'Delegacion', atributos.delegaciones, false);
	setDiv('estados', 'estado', 'Estados', atributos.estados, true);
}

function setDiv(ide, name, value, respuesta, required){
	var texto = '<select class="custom-select mb-2 mr-sm-2 mb-sm-0 form-control" id="'+ide+'" name="'+name+'"';
	if(required){
		texto += 'required="'+required+'" oninvalid="this.setCustomValidity(\'¡Este campo es obligatorio!\')" oninput="setCustomValidity(\'\')"';
	}
	texto += '><option value="">'+value+'</option>';
	for(var i = 0; i < respuesta.length; i++) {
		for(j in respuesta[i]){
			if(j == name){
				texto += '<option value="'+respuesta[i].id+'">'+respuesta[i][j]+'</option>';				
			}
		}
	}
	texto += '</select>';
	document.getElementById(ide+'_div').innerHTML = texto;
}

function setValue(afiliado, sufijo, bool){
	//console.log(afiliado);
	if (bool){
		for (i in afiliado){
			if (document.getElementById(i+"_"+sufijo) != null){
				switch (i) {
				case "id_tipo_documento":
					decode(this.atributos.tiposdni, "tipo", afiliado, i, sufijo);
					break;
				case "sexo":
					if (afiliado[i] == "F"){
						document.getElementById(i +"_"+sufijo).value = "Femenino";
					}else{
						document.getElementById(i +"_"+sufijo).value = "Masculino";
					}
					break;
				case "id_reparticion":
					decode(this.atributos.reparticiones, "nombre_reparticion", afiliado, i, sufijo);
					break;
				case "id_delegacion":
					decode(this.atributos.delegaciones, "delegacion", afiliado, i, sufijo);
					break;
				case "grupo_sanguineo":
					decode(this.atributos.gruposSanguineos, "nombre", afiliado, i, sufijo);
					break;
				case "parentescos":
					decode(this.atributos.parentescos, "tipo", afiliado, i, sufijo);
					break;
				case "id_estado":
					decode(this.atributos.estados, "estado", afiliado, i, sufijo);
					break;
				case "motivos_bajas":
					decode(this.atributos.motivosBajas, "motivo", afiliado, i, sufijo);
					break;
					/*
					  case "lugares":
					  decode(this.atributos.lugares, "lugar", afiliado, i, sufijo);
					  break;
					  case "unidades":
					  decode(this.atributos.unidades, "unidad", afiliado, i, sufijo);
					  break;
					*/
				case "id_localidad":
					decode(this.atributos.localidades, "nombre_localidad", afiliado, i, sufijo);
					break;

				default:
					document.getElementById(i +"_"+sufijo).value = afiliado[i];
				}

			}
		}

	}else{
		for (i in afiliado){
			if (document.getElementById(i+"_"+sufijo) != null){
				document.getElementById(i +"_"+sufijo).value = afiliado[i];
			}
		}
	}
}
function setConsulta(afiliado, metodo, usuario){
	var consulta = direccion + metodo + '?';
	console.log(afiliado);
	for(i in afiliado){
		if(afiliado[i] != ""){
			consulta += i + '=' + afiliado[i] + '&';
		}else{
			console.log(i);
		}
	}
	consulta += "usuario="+usuario;
	return consulta;
}

function setReadOnly(afiliado, sufijo){
	for (i in afiliado){
		if (document.getElementById(i+"_"+sufijo) != null){
			document.getElementById(i +"_"+sufijo).readOnly = true;
		};
	}
}



// MOSTRAR:

// AUXILIARES:



function decode(table, name, afiliado, i, sufijo){
	document.getElementById(i +"_"+sufijo).value = null;
	for (var j = 0; j < table.length; j++) {
		if (table[j].id == afiliado[i]){
			document.getElementById(i +"_"+sufijo).value = table[j][name];
		}
	}
}




function mostrarAgregarCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta = direccion + 'mostrarDatos?numero_documento='+this.value+'&numero_carga=0';
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var afiliado = JSON.parse(this.responseText);
		sufijo = 'titular_carga';
		setValue(afiliado, sufijo, true);
		setReadOnly(afiliado, sufijo);
	}
	xhr.send();
}
function mostrarEditarCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta = direccion + 'mostrarDatos?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var afiliado = JSON.parse(this.responseText);
		//console.log(afiliado);
		setValue(afiliado, 'editar_carga', false);
		
	}
	xhr.send();
}

function mostrarEditarTitular(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta = direccion + 'mostrarDatos?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var afiliado = JSON.parse(this.responseText);
		//console.log(afiliado);
		setValue(afiliado, 'editar_titular', true);
		
	}
	xhr.send();
}


function altaTitular(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();			
	xhr.open('POST', setConsulta(getValueTitular('titular'), "altaTitular"), true);
	xhr.onload = function(){
		var respuesta = JSON.parse(this.responseText);
		console.log(respuesta);
		if(respuesta.codigo == 201){
			alert("Exito");
		}else{
			alert("Fracaso");
		}

	}
	xhr.send();
}

function altaCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();			
	xhr.open('POST', setConsulta(getValueTitular('carga'), "altaCarga"), true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();
}


function editarCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	xhr.open('POST', setConsulta(getValueTitular('editar_carga'), "editar"), true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();
}



function editarTitular(e){
	e.preventDefault();
	console.log("hola");
	var xhr = new XMLHttpRequest();
	var consulta = setConsulta(getValueTitular("editar_titular"), "editarTitular", "pepe");
	console.log(consulta);
	xhr.open('POST', consulta, true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();	
}

function mostrarCambiarEstado(e){
	e.preventDefault();
	console.log(this.value);
	document.getElementById('documento_estado').value = this.value;	
}

function bajaAfiliado(e){
	e.preventDefault();
	var dni = document.getElementById('documentoBaja').value;
	var fecha = document.getElementById('fechaBaja').value;	
	var xhr = new XMLHttpRequest();
	var consulta = direccion + 'baja?numero_documento='+dni+'&fecha_baja='+fecha;
	xhr.open('POST', consulta, true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();
}

function mostrarAfiliado(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta = direccion + 'mostrar?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var titular = JSON.parse(this.responseText)[0];
		var cargas = JSON.parse(this.responseText)[1];

		setValue(titular, "mostrar_titular", true);
		setReadOnly(titular, "mostrar_titular");
		htmlCargas(cargas);
	}
	xhr.send();
}

function htmlCargas(cargas){
	infoCarga='';
	infoCarga += '<table class="table">'+
		'      <thead>'+
		'        <tr>'+
		'          <th>Nº</th>'+
		'          <th>Nombre</th>'+
		'          <th>Apellido</th>'+
		'          <th>DNI</th>'+
		'          <th>Acciones</th>'+
		'        </tr>'+
		'      </thead>'+
		'      <tbody>';
	for(i in cargas){
		infoCarga += '<tr>'+
			'        <td>'+cargas[i].numero_carga+'</td>'+
			'        <td>'+cargas[i].nombre+'</td>'+
			'        <td>'+cargas[i].apellido+'</td>'+
			'        <td>'+cargas[i].numero_documento+'</td>'+
			'        <td>'+
			'        <div class="row">'+
			setBoton('modalEditarCarga', 'editar_modal', cargas[i].numero_documento, 'Editar', 'primary')+
			setBoton('modalEstado', 'estado_modal', cargas[i].numero_documento, 'Baja', 'danger')+
			'       </div>'+
			'        </td>'+
			'      </tr>';
	}
	infoCarga += '</tbody></table>';
	document.getElementById('datosCarga').innerHTML= infoCarga;
	for(i in cargas){
		document.getElementById('editar_modal_'+cargas[i].numero_documento).addEventListener('click',mostrarEditarCarga);
		document.getElementById('estado_modal_'+cargas[i].numero_documento).addEventListener('click',mostrarCambiarEstado);
	}
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
