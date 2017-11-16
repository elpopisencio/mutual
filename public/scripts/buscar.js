let inputDocumento = document.querySelector('#dniBuscar');
inputDocumento.addEventListener('input', buscar);
let inputLegajo = document.querySelector('#legajoBuscar');
inputLegajo.addEventListener('input', buscar);
let inputNombre = document.querySelector('#nombreBuscar');
let inputApellido = document.querySelector('#apellidoBuscar');
inputNombre.addEventListener('input', buscar);
inputApellido.addEventListener('input', buscar);

function buscar(e){
	e.preventDefault();

	var dni = document.getElementById('dniBuscar').value;
	var legajo = document.getElementById('legajoBuscar').value;
	var nombre = document.getElementById('nombreBuscar').value;
	var apellido = document.getElementById('apellidoBuscar').value;
	
	//Permitir que busque solo por documento o legajo o nombre y apellido
	if(dni!=''){
		document.getElementById('legajoBuscar').setAttribute("disabled","true");
		document.getElementById('nombreBuscar').setAttribute("disabled","true");
		document.getElementById('apellidoBuscar').setAttribute("disabled","true");
	}else{
		if(legajo!=''){
			document.getElementById('dniBuscar').setAttribute("disabled","true");
			document.getElementById('nombreBuscar').setAttribute("disabled","true");
			document.getElementById('apellidoBuscar').setAttribute("disabled","true");

		}else{
			if(nombre!='' || apellido!=''){
				document.getElementById('dniBuscar').setAttribute("disabled","true");
				document.getElementById('legajoBuscar').setAttribute("disabled","true");
			}else{
				document.getElementById('legajoBuscar').removeAttribute("disabled");
				document.getElementById('nombreBuscar').removeAttribute("disabled");
				document.getElementById('apellidoBuscar').removeAttribute("disabled");
				document.getElementById('dniBuscar').removeAttribute("disabled");
			}
		}
		
	}
	
	var xhr = new XMLHttpRequest();
	var consulta =  'http://192.168.0.51:8080/busqueda?numero_documento='+dni+'&legajo='+legajo+'&apellido='+apellido+'&nombre='+nombre;
	
	//console.log(consulta);
	var cuerpo = '';
	xhr.open('GET', consulta, true);
	xhr.onload = function(){
		//console.log(this.responseText);
		var afiliados = JSON.parse(this.responseText);

		if(this.status == 200){
			cuerpo+='<table class="table">'+
				'      <thead>'+
				'        <tr>'+
				'          <th>Apellido</th>'+
				'          <th>Nombre</th>'+
				'          <th>DNI</th>'+
				'          <th>Acciones</th>'+
				'        </tr>'+
				'      </thead>'+
				'      <tbody>';
			var x = 1;
			for(i in afiliados){
				cuerpo += '<tr>'+
					'        <td>'+afiliados[i].apellido+'</td>'+
					'        <td>'+afiliados[i].nombre+'</td>'+
					'        <td>'+afiliados[i].numero_documento+'</td>'+
					'        <td>'+
					'          <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modalMostrar" id="mostrar_'+afiliados[i].numero_documento+'" value='+afiliados[i].numero_documento+'> Mostrar </button>'+
					'          <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalTitular" id="editar_'+afiliados[i].numero_documento+'" value='+afiliados[i].numero_documento+'> Editar </button>'+
					'          <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modalBaja"  id="baja_'+afiliados[i].numero_documento+'" value='+afiliados[i].numero_documento+'> Baja </button>';
				if(afiliados[i].numero_carga == 0){
					cuerpo += '<button  type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalAltaCarga" id="carga_'+afiliados[i].numero_documento+'" value='+afiliados[i].numero_documento+'> Carga </button>';
		
				}
				cuerpo += '  </td>'+
					'      </tr>';
				x = x+1;
			}
			cuerpo += '</tbody></table>';
			document.getElementById('datos').innerHTML = cuerpo;
			
			for(i in afiliados){
				document.getElementById('mostrar_'+afiliados[i].numero_documento).addEventListener('click',mostrarAfiliado);
				document.getElementById('editar_'+afiliados[i].numero_documento).addEventListener('click',mostrarEditar);
				document.getElementById('baja_'+afiliados[i].numero_documento).addEventListener('click',mostrarBaja);
				if(afiliados[i].numero_carga == 0){
					document.getElementById('carga_'+afiliados[i].numero_documento).addEventListener('click',mostrarAgregarCarga);
				}
			}
		}else{
			document.getElementById('mensaje').innerHTML = '<h2> No se encontro el afiliado con el dni: '+ dni +'</h2>';			
		}
	}
	xhr.send();
}
