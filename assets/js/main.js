
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

/*------------------------------- Dock -----------------------------*/

function between(val, min, max){
    return Math.max(min,Math.min(val,max))
}

function scaling(d){
    return Math.max(Math.min(-0.4 * Math.pow(d,2) + 1.05,1),0);
}

const TransformOrigins = {
    '-1': 'right',
    '0': 'center',
    '1': 'left'
}

class Dock{

    scale = 1;

    constructor(el){
        this.root = el;
        this.icons = Array.from(el.children);
        if (this.icons.length === 0){
            return;
        }
        this.iconSize = this.icons[0].offsetWidth;
        el.addEventListener('mousemove', this.handleMouseMove.bind(this));
        el.addEventListener('mouseleave',this.handleMouseLeave.bind(this));
        el.addEventListener('mouseenter',this.handleMouseEnter.bind(this))
    }

    handleMouseMove(e){
        this.mousePosition = between((e.clientX - this.root.offsetLeft)/ this.iconSize,
        0,
        this.icons.length - 0.1
        );
        this.scaleIcons();

    };

    scaleIcons(){
        const selectedIndex = Math.floor(this.mousePosition);
        const centerOffset = this.mousePosition - selectedIndex - 0.5;
        
        let baseoffset = this.scaleFromDirection(
            selectedIndex,
            0,
            -centerOffset * this.iconSize
            );
        let offset = baseoffset * (0.5 - centerOffset);

        for (let i = selectedIndex + 1; i< this.icons.length; i++){
            offset += this.scaleFromDirection(i,1,offset);
        };

        offset = baseoffset * (0.5 + centerOffset);
        for (let i = selectedIndex - 1; i >= 0; i--){
            offset += this.scaleFromDirection(i,-1,-offset);
        };
    }

    scaleFromDirection(index,direction,offset){
        const center = index + 0.5;
        const distanceFromPointer = this.mousePosition - center;
        const scale = scaling(distanceFromPointer) * this.scale;
        const icon = this.icons[index];
        icon.style.setProperty(
            'transform',
            `translateX(${offset}px) scale(${scale + 1})`
        );
        icon.style.setProperty(
            'transform-origin',
            `${TransformOrigins[direction.toString()]} bottom`
        );
        return scale * this.iconSize;

    }

    handleMouseLeave(){
        this.root.classList.add('animated')
        this.icons.forEach((icon) =>{
            icon.style.removeProperty('transform')
            icon.style.removeProperty('transform-origin')
        });
    }

    handleMouseEnter(){
        this.root.classList.add('animated')
        window.setTimeout(() =>{
            this.root.classList.remove('animated')
        },100);
    }
}

new Dock(document.querySelector('.dock'));




const botonesDock = ['finder-b','apps-b','music-b','maps-b',
                    'message-b','vs-b','safari-b','settings-b','console-b',
                    'whatsapp-b']

const clasesVentanas = ['.finder','.apps','.music','.maps','.message','.vs', '.safari','.settings','.console','.whatsapp']

/* const clasesVentanas = ['.finder','.apps','.music','.maps','.message','.vs', '.safari','.settings','.console','.whatsapp'] */

clasesVentanas.forEach((boton) => {
    document.querySelector(boton + '-b').addEventListener('mouseover',()=>{
        document.querySelector(boton + '-b' + ' p').style.display = 'flex'
    })

    document.querySelector(boton + '-b').addEventListener('mouseout',()=>{
        document.querySelector(boton + '-b' + ' p').style.display = 'none'
    })

    document.querySelector(boton + '-b').addEventListener('click',()=>{
        if (document.querySelector(boton) != null){
            document.querySelector(boton).classList.toggle('min');
            document.querySelector(boton + '-b' + ' .estatus').style.backgroundColor = 'rgb(250, 250, 250)'

            if (document.querySelector(boton).style.zIndex != 5){
                for (let ventana of clasesVentanas){
                    if (ventana != boton){
                        if(document.querySelector(ventana) != null){
                            document.querySelector(ventana).style.zIndex = '3';
                        } 
                    }
                    else{
                        document.querySelector(boton).style.zIndex = '5';
                    }
                } 
            }

        }
        else{
            console.log('Pronto')
        }
    })
})

/*------------------------------- Ventanas -----------------------------*/
/*------ Arrastrar, redimencionar, botones de minimizar, maximizar, cerrar -------*/



clasesVentanas.forEach((clases) =>{
    const el = document.querySelector(clases);
    const barra = document.querySelector(clases + ' .barra')
    const botones = document.querySelector(clases + ' .botones')

    function focus(){
        if (el.style.zIndex != 5){
            for (let ventana of clasesVentanas){
                if (ventana != clases){
                    if(document.querySelector(ventana) != null){
                        document.querySelector(ventana).style.zIndex = '3';
                    } 
                }
                else{
                    el.style.zIndex = '5';
                }
            } 
        }
    }

    if (el != null){
        el.addEventListener('click',()=>{
            focus();  
        })

        barra.addEventListener('mousedown', mousedown);
        botones.addEventListener('mousedown', mousedown);
    }

    function mousedown(e){
        window.addEventListener('mousemove',mousemove);
        window.addEventListener('mouseup',mouseup);
        
    
        let prevX = e.clientX;
        let prevY = e.clientY;
    
        function mousemove(e){
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;
            let centro = (800 * e.clientX) / innerWidth;

            focus(); 
    
            const rect = el.getBoundingClientRect();
            if (rect.top <= 25){
                console.log('no pasa')
                el.style.top = '25.1px';
            }
            else{
                if (el.clientWidth == innerWidth){
                    el.style.width = '800px';
                    el.style.height = '500px';
                    el.style.left = rect.left - newX + e.clientX - centro +'px';
                }
                else{
                    el.style.left = rect.left - newX + 'px';
                    el.style.top = rect.top - newY + 'px';
                } 
            }
            prevX = e.clientX;
            prevY = e.clientY;
        }
    
        function mouseup(){
            window.removeEventListener('mousemove',mousemove);
            window.removeEventListener('mouseup',mouseup);
            
        }
    }

    const resizers = document.querySelectorAll(clases + ' .resizer');
    const resizersL = document.querySelectorAll(clases + ' .resizerL');
    let currentRisizer;

    for(let resizerL of resizersL){
        resizerL.addEventListener('mousedown',mousedown)

        function mousedown(e){
            currentRisizer = e.target;
            let prevX = e.clientX;
            let prevY = e.clientY;

            window.addEventListener('mousemove',mousemove);
            window.addEventListener('mouseup',mouseup);

            focus();

            function mousemove(e){
                const rect = el.getBoundingClientRect();

                       

                if(currentRisizer.classList.contains('n')){
                    el.style.height= rect.height + (prevY - e.clientY) + 'px';
                    el.style.top = rect.top - (prevY - e.clientY) + 'px';
                }
                else if(currentRisizer.classList.contains('e')){
                    el.style.width = rect.width + (prevX - e.clientX) + 'px';
                    el.style.left = rect.left - (prevX - e.clientX) + 'px'
                }
                else if(currentRisizer.classList.contains('w')){
                    el.style.width = rect.width - (prevX - e.clientX) + 'px';
                }
                else if(currentRisizer.classList.contains('s')){
                    el.style.height= rect.height - (prevY - e.clientY) + 'px';
                }

                prevX = e.clientX;
                prevY = e.clientY;
            }

            function mouseup(){
                window.removeEventListener('mousemove',mousemove);
                window.removeEventListener('mouseup',mouseup);
                /* isResizing = false; */
            }


        }
        
    }

    for(let resizer of resizers){
        resizer.addEventListener('mousedown',mousedown)

        function mousedown(e){
            currentRisizer = e.target;
            let prevX = e.clientX;
            let prevY = e.clientY;

            focus();

            window.addEventListener('mousemove',mousemove);
            window.addEventListener('mouseup',mouseup);

            function mousemove(e){
                const rect = el.getBoundingClientRect();

                if(currentRisizer.classList.contains('se')){
                    el.style.width = rect.width - (prevX - e.clientX) + 'px';
                    el.style.height= rect.height - (prevY - e.clientY) + 'px';
                }
                else if(currentRisizer.classList.contains('sw')){
                    el.style.width = rect.width + (prevX - e.clientX) + 'px';
                    el.style.height= rect.height - (prevY - e.clientY) + 'px';
                    el.style.left = rect.left - (prevX - e.clientX) + 'px'
                }
                else if(currentRisizer.classList.contains('ne')){
                    el.style.width = rect.width - (prevX - e.clientX) + 'px';
                    el.style.height= rect.height + (prevY - e.clientY) + 'px';
                    el.style.top = rect.top - (prevY - e.clientY) + 'px'
                }
                else if(currentRisizer.classList.contains('nw')){
                    el.style.width = rect.width + (prevX - e.clientX) + 'px';
                    el.style.height= rect.height + (prevY - e.clientY) + 'px';
                    el.style.top = rect.top - (prevY - e.clientY) + 'px';
                    el.style.left = rect.left - (prevX - e.clientX) + 'px';
                }

                prevX = e.clientX;
                prevY = e.clientY;
            }

            function mouseup(){
                window.removeEventListener('mousemove',mousemove);
                window.removeEventListener('mouseup',mouseup);
                /* isResizing = false; */
            }


        }
    }

    const minimizar = document.querySelector(clases + ' .minimizar');
    const maximizar = document.querySelector(clases + ' .maximizar');
    const cerrar = document.querySelector(clases + ' .cerrar');

    if (minimizar != null && maximizar != null && cerrar != null){

        maximizar.addEventListener('click',() =>{
            if(el.clientWidth == innerWidth){
                el.style.left = cX2;
                el.style.top = cY2;
                el.style.width = '800px';
                el.style.height = '500px';
            }
            else{
                cX2 = el.style.left;
                cY2 = el.style.top;
                el.style.left = '0px';
                el.style.top = '1.5rem';
                el.style.width = '100vw';
                el.style.height = 'calc(100vh - 7rem)';     
            } 
        })
        
        minimizar.addEventListener('click',()=>{
            /* document.getElementById('finder-b').classList.toggle('min') */
            document.querySelector(clases).classList.toggle('min')
            
        })
        
        cerrar.addEventListener('click',()=>{
            /* document.getElementById('finder-b').classList.toggle('min') */
            document.querySelector(clases).classList.toggle('min')
            document.querySelector(clases + '-b' + ' .estatus').style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })
        
    }
    else{
        /* console.log('Faltan botones de la ventana ' + clases) */
    }
    
})



/*-------------------------- Busqueda safari --------------------------*/

const obtenerURL = () =>{
    const pagina = document.getElementById('iframe-Safari')
    let direccionWeb = document.getElementById('urlBuscar').value;
    console.log(direccionWeb)
    pagina.src = direccionWeb;
}




