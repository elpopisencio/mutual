// VARIABLES:
var direccion = "http://192.168.0.51:8080/";

// EVENT LISTENERS:
document.getElementById('afiliacionTitular').addEventListener('submit',altaTitular);
document.getElementById('darBaja').addEventListener('click',bajaAfiliado);
document.getElementById('editarTitular').addEventListener('click',editarTitular);

// GETS:

// SETS:

// MOSTRAR:

// AUXILIARES:
function setValue(afiliado, sufijo){
	for (i in afiliado){
		if (document.getElementById(i+"_"+sufijo) != null){
			document.getElementById(i +"_"+sufijo).value = afiliado[i];
		}
	}
}

function getValue(sufijo){
	var titular = {apellido:"", nombre:"", sexo:"", id_tipo_documento:"", numero_documento:"", grupo_sanguineo:"", fecha_alta:"", fecha_tarjeta:"", fecha_nacimiento:"", reparticion:"", legajo:"", subcontrato:"", servicio:"", lugar_pago:"", cuil:"", numero_carga:0};
	for(i in titular){
		if (document.getElementById(i+"_"+sufijo) != null){
			titular[i]=document.getElementById(i+"_"+sufijo).value;
		}
	}
	return titular;
}

function setConsulta(afiliado, metodo){
	var consulta = direccion + metodo + '?';
	for(i in afiliado){
		consulta += i + '=' + afiliado[i] + '&';
	}
	consulta += "usuario=pepe";
	return consulta;
}

function setReady(afiliado, sufijo){
	for (i in afiliado){
		if (document.getElementById(i+"_"+sufijo) != null){
			document.getElementById(i +"_"+sufijo).readOnly = true;
		};
	}
}

function mostrarAgregarCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/mostrarDatos?numero_documento='+this.value+'&numero_carga=0';
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var afiliado = JSON.parse(this.responseText);
		sufijo = 'carga';
		setValue(afiliado, sufijo);
		setReady(afiliado, sufijo);
	}
	xhr.send();
}

function mostrarEditar(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/mostrarDatos?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var afiliado = JSON.parse(this.responseText);
		//console.log(afiliado);
		setValue(afiliado, 'editar_titular');
	}
	xhr.send();
}


function altaTitular(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();			
	xhr.open('POST', setConsulta(getValue('titular'), "altaTitular"), true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();

}

function editarCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();

	var numeroDocumentoActual = document.getElementById('numeroDocumentoActualCarga').value;
	var sexo = document.getElementById('sexoCargaEditar').value;
	var tipoDocumento = document.getElementById('tipoDocumentoCargaEditar').value;
	var numeroDocumento = document.getElementById('numeroDocumentoCargaEditar').value;
	var grupoSanguineo = document.getElementById('grupoSanguineoCargaEditar').value;
	var fechaAlta = document.getElementById('fechaAltaCargaEditar').value;
	var fechaTarjeta = document.getElementById('fechaTarjetaCargaEditar').value;
	var fechaNacimiento = document.getElementById('fechaNacimientoCargaEditar').value;
	var reparticion = document.getElementById('reparticionCargaEditar').value;
	var legajo = document.getElementById('legajoPropioCargaEditar').value;
	var numeroCarga = document.getElementById('numeroCargaEditar').value;

	var consulta =  'http://192.168.0.51:8080/editar?numero_documento_actual='+numeroDocumentoActual+
		'&sexo='+sexo+
		'&tipo_documento='+tipoDocumento+
		'&numero_documento='+numeroDocumento+
		'&grupo_sanguineo='+grupoSanguineo+
		'&fecha_alta='+fechaAlta+
		'&fecha_tarjeta='+fechaTarjeta+
		'&fecha_nacimiento='+fechaNacimiento+
		'&reparticion='+reparticion+
		'&legajo='+legajo+
		'&numero_carga='+numeroCarga;

		
	xhr.open('POST', consulta, true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();
}



function editarTitular(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	
	var numeroDocumentoActual = document.getElementById('numeroDocumentoActualEditarTitular').value;
	var apellido = document.getElementById('apellidoEditarTitular').value;
	var nombre = document.getElementById('nombreEditarTitular').value;
	var sexo = document.getElementById('sexoEditarTitular').value;
	var tipoDocumento = document.getElementById('tipoDocumentoEditarTitular').value;
	var numeroDocumento = document.getElementById('numeroDocumentoEditarTitular').value;
	var grupoSanguineo = document.getElementById('grupoSanguineoEditarTitular').value;
	var fechaAlta = document.getElementById('fechaAltaEditarTitular').value;
	var fechaTarjeta = document.getElementById('fechaTarjetaEditarTitular').value;
	var fechaNacimiento = document.getElementById('fechaNacimientoEditarTitular').value;
	var reparticion = document.getElementById('reparticionEditarTitular').value;
	var legajo = document.getElementById('subcontratoEditarTitular').value;
	var servicio = document.getElementById('servicioEditarTitular').value;
	var lugarPago = document.getElementById('lugarPagoEditarTitular').value;
	var cuil = document.getElementById('cuilEditarTitular').value;

		
	if(numeroDocumento === '' || apellido === '' || nombre === '' || sexo === ''){
		console.log('debe ingresar todos los datos  ' +sexo);
	}
	
	
	var consulta =  'http://192.168.0.51:8080/editar?numero_documento_actual='+numeroDocumentoActual+
		'&nombre='+nombre+
		'&apellido='+apellido+
		'&sexo='+sexo+
		'&tipo_documento='+tipoDocumento+
		'&numero_documento='+numeroDocumento+
		'&grupo_sanguineo='+grupoSanguineo+
		'&fecha_alta='+fechaAlta+
		'&fecha_tarjeta='+fechaTarjeta+
		'&fecha_nacimiento='+fechaNacimiento+
		'&reparticion='+reparticion+
		'&legajo='+legajo+
		'&servicio='+servicio+
		'&lugar_pago='+lugarPago+
		'&cuil='+cuil;
	
	xhr.open('POST', consulta, true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();
}

function mostrarBaja(e){
	e.preventDefault();
	document.getElementById('documentoBaja').value = this.value;	
}

function bajaAfiliado(e){
	e.preventDefault();
	var dni = document.getElementById('documentoBaja').value;
	var fecha = document.getElementById('fechaBaja').value;

	if (fecha === ''){
		console.log('ingrese fecha');
	}else{
	
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/baja?numero_documento='+dni+'&fecha_baja='+fecha;
	xhr.open('POST', consulta, true);
	xhr.onload = function(){
		console.log(this.responseText);
	}
	xhr.send();
	}
}


function mostrarAfiliado(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/mostrar?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		//console.log(JSON.parse(this.responseText));
		var titular = JSON.parse(this.responseText)[0];
		var cargas = JSON.parse(this.responseText)[1];

		document.getElementById('apellidoTitularMostrar').value = titular.apellido;
		document.getElementById('nombreTitularMostrar').value = titular.nombre;
		document.getElementById('numeroDocumentoTitularMostrar').value = titular.numero_documento;
		document.getElementById('tipoDocumentoTitularMostrar').value = titular.id_tipo_documento;
		document.getElementById('grupoSanguineoTitularMostrar').value = titular.grupo_sanguineo;
		
		document.getElementById('apellidoTitularMostrar').readOnly=true;
		document.getElementById('nombreTitularMostrar').readOnly=true;
		document.getElementById('numeroDocumentoTitularMostrar').readOnly=true;
		document.getElementById('tipoDocumentoTitularMostrar').readOnly=true;

		/*
		
		codigo_delegacion
		codigo_postal
		cuil
		domicilio
		email
		fecha_alta
		fecha_baja
		fecha_nacimiento
		fecha_suspension
		fecha_tarjeta
		
		id
		id_estado
		id_motivo_baja
		id_parentesco
		id_reparticion
		id_reparticion_propia
		id_tipo_documento
		id_tipo_documento_titular
		id_unidad_servicio
		
		legajo_propio
		lugar_pago

		numero_carga

		numero_documento_titular
		sexo
		subcontrato
		telefono
		*/
		document.getElementById('datosCarga').innerHTML= htmlCargas(cargas);
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
			'          <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalBaja"  id="baja_'+cargas[i].numero_documento+'" value='+cargas[i].numero_documento+'> Editar </button>'+
			'          <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modalBaja"  id="baja_'+cargas[i].numero_documento+'" value='+cargas[i].numero_documento+'> Baja </button>'+
			'        </td>'+
			'      </tr>';
	}
	infoCarga += '</tbody></table>';
	return infoCarga;
}
