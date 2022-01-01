
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
    return Math.max(Math.min(-0.2 * Math.pow(d,2) + 1.05,1),0);
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


/*------------------------------- Ventanas -----------------------------*/

const el = document.querySelector('.item');
const barra = document.querySelector('.barra')

barra.addEventListener('mousedown', mousedown);

function mousedown(e){
    window.addEventListener('mousemove',mousemove);
    window.addEventListener('mouseup',mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e){
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        const rect = el.getBoundingClientRect();
        el.style.left = rect.left - newX + 'px';
        el.style.top = rect.top - newY + 'px';

        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseup(){
        window.removeEventListener('mousemove',mousemove);
        windows.removeEventListener('mouseup',mouseup);
        
    }
}