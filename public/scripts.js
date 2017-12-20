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
document.getElementById('generar_pdf').addEventListener('click',generarPdf);

function generarPdf(){
	console.log(this.value);
	window.location.href = "http://192.168.0.51:8080/pdf4?dni="+this.value;
}


// GETS:
function getValueTitular(sufijo){
	var titular = {apellido:"", nombre:"", sexo:"", id_tipo_documento:"", numero_documento:"", grupo_sanguineo:"", fecha_estado:"", fecha_tarjeta:"", fecha_nacimiento:"", id_reparticion:"", legajo:"", subcontrato:"", servicio:"", lugar_pago:"", cuil:"", numero_carga:"", id_delegacion:"", telefono:"", email:"", domicilio:"", id_localidad:"", id_unidad_servicio:"", id_tipo_documento_titular:"", numero_documento_titular:""};
	for(i in titular){
		if (document.getElementById(i+"_"+sufijo) != null){
			titular[i]=document.getElementById(i+"_"+sufijo).value;
		}
	}
	return titular;
}


function ajaxReq(consulta, metodo, bool, llenar){
	var xhr = new XMLHttpRequest();
	xhr.open(metodo, direccion+consulta, bool);
	xhr.onload = function(){
		//console.log(this.responseText);
		atributos[consulta] = JSON.parse(this.responseText);
		if (llenar){
			llenarDrops();
		}
		//console.log(atributos[consulta]);
	}
	xhr.send();
}

// SETS:
function setAtributos(){
	ajaxReq('tiposdni', 'GET', true, true);
	ajaxReq('gruposSanguineos', 'GET', true, true);
	ajaxReq('localidades', 'GET', true, true);
	ajaxReq('unidades', 'GET', true, true);
	ajaxReq('parentescos', 'GET', true, true);
	ajaxReq('estados', 'GET', true, true);
	ajaxReq('lugares', 'GET', true, true);
	ajaxReq('motivosBajas', 'GET', true, true);
	ajaxReq('lugares', 'GET', true, true);
	ajaxReq('delegaciones', 'GET', true, true);
	ajaxReq('reparticiones', 'GET', true, true);

}

function llenarDrops(){
	setDiv('id_reparticion_titular', 'nombre_reparticion', 'Reparticiones', atributos.reparticiones, true);
	setDiv('id_reparticion_carga', 'reparticion', 'Reparticiones', atributos.reparticiones, false);
	setDiv('id_reparticion_editar_titular', 'reparticion', 'Reparticiones', atributos.reparticiones, true);
	setDiv('id_reparticion_editar_carga', 'reparticion', 'Reparticiones', atributos.reparticiones, false);
	setDiv('grupo_sanguineo_titular', 'nombre', 'Grupo Sanguineo', atributos.gruposSanguineos, false);
	setDiv('id_localidad_titular', 'nombre_localidad', 'Localidad', atributos.localidades, false);
	setDiv('id_delegacion_titular', 'delegacion', 'Delegacion', atributos.delegaciones, false);
	setDiv('estados_estado', 'estado', 'Estados', atributos.estados, true);
	setDiv('motivos_estado', 'motivo', 'Motivos', atributos.motivosBajas, true);
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

function mostrarEstado(e){
	e.preventDefault();
	document.getElementById('documento_estado').value = this.value;	
	var xhr = new XMLHttpRequest();
	var consulta = direccion + 'mostrarDatos?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var afiliado = JSON.parse(this.responseText);
		document.getElementById("titulo_estado").innerHTML = "<h2> Cambiar estado de: " + afiliado.apellido + ", " + afiliado.nombre + "</h2>";
		var estados = atributos.estados;
		delete estados[(afiliado.id_estado) - 1];
		delete estados[3];
		setDiv('estados_estado', 'estado', 'Estados', estados, true);
		document.getElementById('estados_estado').addEventListener('change', motivo);
		//console.log(estados);
		ajaxReq('estados', 'GET', true, false);
	}
	xhr.send();
}



function motivo(){
	if (this.value == 1){
		document.getElementById('motivos_estado').disabled = true;
	}else{
		document.getElementById('motivos_estado').disabled = false;
	}
}

function altaTitular(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();			
	var afiliado = getValueTitular('titular');
	var cuil = document.getElementById('ante_cuil_titular').value;
	cuil += document.getElementById('numero_documento_titular').value;
	cuil += document.getElementById('pos_cuil_titular').value;
	console.log(cuil);
	afiliado.cuil = cuil;
	xhr.open('POST', setConsulta(afiliado, "altaTitular"), true);
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
	var dni = document.getElementById('documento_estado').value;
	var fecha = document.getElementById('fecha_estado').value;
	var estado = document.getElementById('estados_estado').value;
	var motivo = document.getElementById('motivos_estado').value;
	var observaciones = document.getElementById('observaciones_estado').value;
	
	var xhr = new XMLHttpRequest();
	
	var consulta = direccion + 'cambiarEstado?numero_documento='+dni+'&fecha_estado='+fecha+'&id_estado='+estado+'&id_motivo='+motivo+'&observaciones='+observaciones;
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
		if (cargas.length === 0){
			document.getElementById('mostrar_cargas_titular').disabled = true;
			document.getElementById('mostrar_cargas_titular').firstChild.data = "No tiene cargas";
		}else{
			document.getElementById('mostrar_cargas_titular').disabled = false;
			document.getElementById('mostrar_cargas_titular').firstChild.data = "Mostrar cargas";
		}
		
		setValue(titular, "mostrar_titular", true);
		setReadOnly(titular, "mostrar_titular");
		document.getElementById('generar_pdf').value=titular.numero_documento;
		htmlCargas(cargas);
		cambiarMostrarTitular();
		//document.getElementById('modalMostrar').modal('show');
	}
	xhr.send();
}

function mostrarCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta = direccion + 'mostrarDatos?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var carga = JSON.parse(this.responseText);
		console.log(carga);
		setValue(carga, "mostrar_carga", true);
		setReadOnly(carga, "mostrar_carga");
		cambiarMostrarDetalle();
	}
	xhr.send();
}


function htmlCargas(cargas){
	var x = 0;
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
		x++;
		infoCarga += '<tr>'+
			'        <td>'+cargas[i].numero_carga+'</td>'+
			'        <td>'+cargas[i].nombre+'</td>'+
			'        <td>'+cargas[i].apellido+'</td>'+
			'        <td>'+cargas[i].numero_documento+'</td>'+
			'        <td>'+
			'        <div class="row">'+
			setBoton('modalEditarCarga', 'editar_modal', cargas[i].numero_documento, 'Editar', 'primary');
		if(cargas[i].id_estado == 3){
						infoCarga += setBoton('modalEstado', 'estado_modal', cargas[i].numero_documento, 'Baja', 'danger');
					}else{
						if(cargas[i].id_estado == 2){
							infoCarga += setBoton('modalEstado', 'estado_modal', cargas[i].numero_documento, 'Inhabilitado', 'danger');
						} else{
							if(cargas[i].id_estado == 1){
								infoCarga += setBoton('modalEstado', 'estado_modal', cargas[i].numero_documento, 'Habilitado', 'success');
							}else{
								infoCarga += setBoton('modalEstado', 'estado_modal', cargas[i].numero_documento, 'Alta', 'warning');
							}
						}
					}
			
		
		infoCarga += '<div class="col"><button type="button" class="btn btn-primary btn-sm btn-block" id="mostrar_carga_'+cargas[i].numero_documento+'" value='+cargas[i].numero_documento+'> Datos Carga </button></div>'+
			'       </div>'+
			'        </td>'+
			'      </tr>';
	}
	infoCarga += '</tbody></table>';
	document.getElementById('datosCarga').innerHTML= infoCarga;
	for(i in cargas){
		document.getElementById('editar_modal_'+cargas[i].numero_documento).addEventListener('click',mostrarEditarCarga);
		document.getElementById('estado_modal_'+cargas[i].numero_documento).addEventListener('click',mostrarEstado);
		document.getElementById('mostrar_carga_'+cargas[i].numero_documento).addEventListener('click',mostrarCarga);
	}
	if (x === 0){
		document.getElementById('datosCarga').innerHTML= "<br><br><h3> El afiliado no tiene cargas </h3>";
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
			cuerpo+='<table class="table table-sm"> <thead> <tr>'+
				'          <th>Apellido</th> <th>Nombre</th> <th>DNI</th> <th>Estado</th> <th>Acciones</th>'+
				'        </tr> </thead> <tbody>';
			var x = 1;
			for(i in afiliados){
				if (i <= 20){
					cuerpo += '<tr>'+
						'        <td>'+afiliados[i].apellido+'</td>'+
						'        <td>'+afiliados[i].nombre+'</td>'+
						'        <td>'+afiliados[i].numero_documento+'</td>'+
						'        <td width="10%">';

					if(afiliados[i].id_estado == 3){
						cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Baja', 'danger');
					}else{
						if(afiliados[i].id_estado == 2){
							cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Inhabilitado', 'danger');
						} else{
							if(afiliados[i].id_estado == 1){
								cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Habilitado', 'success');
							}else{
								if(afiliados[i].id_estado == 4){
									cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Alta', 'warning');
								}else{
									if(afiliados[i].id_estado == 5){
									cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Baja Pendiente', 'success');
									}else{
										cuerpo += setBoton('modalEstado', 'estado', afiliados[i].numero_documento, 'Estado Desconocido', 'secondary');
									}
								}
							}
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
			}
			cuerpo += '</tbody></table>';
			document.getElementById('datos').innerHTML = cuerpo;
			
			for(i in afiliados){
				if (i <= 20){
					document.getElementById('mostrar_'+afiliados[i].numero_documento).addEventListener('click',mostrarAfiliado);
					document.getElementById('estado_'+afiliados[i].numero_documento).addEventListener('click',mostrarEstado);				
					if(afiliados[i].numero_carga == 0){
						document.getElementById('editar_'+afiliados[i].numero_documento).addEventListener('click',mostrarEditarTitular);
						document.getElementById('carga_'+afiliados[i].numero_documento).addEventListener('click',mostrarAgregarCarga);
					}else{
						document.getElementById('editar_'+afiliados[i].numero_documento).addEventListener('click',mostrarEditarCarga);
					}
					//document.getElementById('estado_'+afiliados[i].numero_documento).addEventListener('click',mostrarCambiarEstado);
				}
			}
		}
	}
	xhr.send();
}

function setBoton(dataTarget, ide, valu, placeholder, btn){
	return '<div class="col"><button type="button" class="btn btn-'+btn+' btn-sm btn-block" data-toggle="modal" data-target="#'+dataTarget+'" id="'+ide+'_'+valu+'" value='+valu+'> '+placeholder+' </button></div>';
}





document.getElementById('mostrar_cargas_titular').addEventListener('click',cambiarMostrarCargas);
document.getElementById('mostrar_titular').addEventListener('click',cambiarMostrarTitular)
document.getElementById('mostrar_cargas_carga').addEventListener('click',cambiarMostrarCargas);

function cambiarMostrarCargas(){
	document.getElementById('modalCargaUno').style.display = 'block';
	document.getElementById('modalTitularUno').style.display = 'none';
	document.getElementById('modalMostrarCarga').style.display = 'none';
}

function cambiarMostrarDetalle(){
	document.getElementById('modalCargaUno').style.display = 'none';
	document.getElementById('modalTitularUno').style.display = 'none';
	document.getElementById('modalMostrarCarga').style.display = 'block';
}

function cambiarMostrarTitular(){
	document.getElementById('modalCargaUno').style.display = 'none';
	document.getElementById('modalTitularUno').style.display = 'block';
	document.getElementById('modalMostrarCarga').style.display = 'none';
}


/*
                #modalTitularUno
                    .row
                        .col
                            button#mostrar_cargas_titular.btn.btn-primary.btn-block(type='button') Mostrar cargas
                    //.tab-pane.fade.show.active
                    include mostrar_titular.pug
                #modalCargaUno
                    .row
                        .col
                            button#mostrar_titular.btn.btn-primary.btn-block(type='button') Mostrar titular
                    //.tab-pane.fade 
                    #datosCarga
                #modalMostrarCarga
                    .row
                        .col
                            button#mostrar_cargas_carga.btn.btn-primary.btn-block(type='button') Mostrar cargas
                    include mostrar_carga.pug
*/
