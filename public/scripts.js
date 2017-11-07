$(document).ready(function(){
	$(":button").click(function(){
		$("#cuerpo").hide();
        $("#cuerpo").html($(this).val());
		$("#cuerpo").fadeIn();
    });
});

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
}

function mostrarAgregarCarga(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/mostrar?numero_documento='+this.value+'&numero_carga=0';
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		console.log(this.responseText);
		var afiliado = JSON.parse(this.responseText);
		document.getElementById('apellidoCarga').value = afiliado.apellido;
		document.getElementById('nombreCarga').value = afiliado.nombre;
		document.getElementById('numeroDocumentoCarga').value = afiliado.numero_documento;
		document.getElementById('tipoDocumentoCarga').value = afiliado.id_tipo_documento;
		document.getElementById('apellidoCarga').readOnly=true;
		document.getElementById('nombreCarga').readOnly=true;
		document.getElementById('numeroDocumentoCarga').readOnly=true;
		document.getElementById('tipoDocumentoCarga').readOnly=true;

	}
	xhr.send();
}


function mostrarEditar(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/mostrar?numero_documento='+this.value+'&numero_carga=0';
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		var afiliado = JSON.parse(this.responseText);
		document.getElementById('apellidoEditarTitular').value = afiliado.apellido;
		document.getElementById('nombreEditarTitular').value = afiliado.nombre;
		document.getElementById('numeroDocumentoActualEditarTitular').value = afiliado.numero_documento;
	}
	xhr.send();
}
document.getElementById('altaTitular').addEventListener('click',altaTitular);
document.getElementById('darBaja').addEventListener('click',bajaAfiliado);
document.getElementById('editarTitular').addEventListener('click',editarTitular);

function altaTitular(e){
	e.preventDefault();
	var xhr = new XMLHttpRequest();
	
	var apellido = document.getElementById('apellidoTitular').value;
	var nombre = document.getElementById('nombreTitular').value;
	var sexo = document.getElementById('sexoTitular').value;
	var tipoDocumento = document.getElementById('tipoDocumentoTitular').value;
	var numeroDocumento = document.getElementById('numeroDocumentoTitular').value;
	var grupoSanguineo = document.getElementById('grupoSanguineoTitular').value;
	var fechaAlta = document.getElementById('fechaAltaTitular').value;
	var fechaTarjeta = document.getElementById('fechaTarjetaTitular').value;
	var fechaNacimiento = document.getElementById('fechaNacimientoTitular').value;
	var reparticion = document.getElementById('reparticionTitular').value;
	var legajo = document.getElementById('legajoTitular').value;
	var subcontrato = document.getElementById('subcontratoTitular').value;
	var servicio = document.getElementById('servicioTitular').value;
	var lugarPago = document.getElementById('lugarPagoTitular').value;
	var cuil = document.getElementById('cuilTitular').value;

	var consulta =  'http://192.168.0.51:8080/altaTitular?sexo='+sexo+
		'&tipo_documento='+tipoDocumento+
		'&numero_documento='+numeroDocumento+
		'&grupo_sanguineo='+grupoSanguineo+
		'&fecha_alta='+fechaAlta+
		'&fecha_tarjeta='+fechaTarjeta+
		'&fecha_nacimiento='+fechaNacimiento+
		'&reparticion='+reparticion+
		'&legajo='+legajo+
		'&numero_carga=0';

			
	xhr.open('POST', consulta, true);
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
	var cuerpo = '';
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/mostrar?numero_documento='+this.value;
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		console.log(JSON.parse(this.responseText));
		var titular = JSON.parse(this.responseText)[0];
		var cargas = JSON.parse(this.responseText)[1];
		//document.getElementById('modaltitle').innerHTML ='<h4 class="modal-title">'+ titular.nombre+' '+titular.apellido + '</h4>';		
		infoTitular= '<h3>'+titular.apellido+', '+titular.nombre+'</h3>'+
			'<h5>DNI: '+titular.numero_documento+' Legajo: '+titular.legajo+'</h5>'+
			'<h5>CBU: '+titular.cbu+' CUIL: '+titular.cuil+'</h5>';



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

		'DNI: ' + titular.numero_documento;
		infoCarga='';
		infoCarga += '<table class="table">'+
			'      <thead>'+
			'        <tr>'+
			'          <th>#</th>'+
				'          <th>Nombre</th>'+
				'          <th>Apellido</th>'+
				'          <th>DNI</th>'+
				'          <th>Acciones</th>'+
				'        </tr>'+
				'      </thead>'+
				'      <tbody>';
			for(i in cargas){
				infoCarga += '<tr>'+
					'        <th scope="row">'+cargas[i].numero_carga+'</th>'+
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
		//document.getElementById('datosTitular').innerHTML= infoTitular;
		document.getElementById('datosCarga').innerHTML= infoCarga;
	}
	xhr.send();
}
