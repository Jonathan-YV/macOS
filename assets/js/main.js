/*------------------------------- Loader -----------------------------*/

const loader = document.querySelector('.loader');
const mapaT = document.querySelector('.maps');

setTimeout(() =>{
    mapaT.classList.toggle('min')
    loader.style.display = 'none'
  },1500)


  /*------------------------------- Inicio de sesion -----------------------------*/

  function quitarSesion(){
     const fondo = document.querySelector('.sesion')
     const dockV = document.querySelector('.dock-wrapper')
     const headerV = document.querySelector('.header')

     fondo.style.display = 'none'; 
     dockV.style.visibility = 'visible'; 
     headerV.style.visibility = 'visible'; 
  }

/*------------------------------- Fecha -----------------------------*/

function imprimirFecha(){
    const contenedor =  document.getElementById('date');
    const diasSemana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio',
                    'agosto','septiembre','octubre','noviembre','diciembre',];

    let fecha = new Date();
    const diaS = diasSemana[fecha.getDay()] + ' ';
    const fechaD = fecha.getDate() + ' ';
    const mes = meses[fecha.getMonth()] + ' ';
    const año = fecha.getFullYear() + ' ' + ' ';

    let hora = fecha.getHours()
    let ampm = 'AM'
    if (hora > 12){
        hora = hora - 12;
        ampm = 'PM'
    }
    let minutos = fecha.getMinutes();
    if (minutos < 10){
        minutos = '0' + minutos + ' ';
    }else{
        minutos = minutos + ' ';
    }

    const fechaTotal = diaS + fechaD + 'de ' + mes + 'de ' + año + hora + ':' + minutos + ampm
    contenedor.innerHTML = fechaTotal
}

setInterval(imprimirFecha,100)


/*-------------------------- Busqueda safari --------------------------*/

const obtenerURL = () =>{
    const pagina = document.getElementById('iframe-Safari')
    let direccionWeb = document.getElementById('urlBuscar').value;
    console.log(direccionWeb)
    pagina.src = direccionWeb;
}


/*-------------------------- Leaflet maps --------------------------*/

const titleProvider = ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png']

let map = L.map('map').setView([19.41, -99], 12);

L.tileLayer(titleProvider[1], {
    maxZoom: 18
}).addTo(map);
