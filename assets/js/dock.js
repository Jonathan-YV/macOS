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


const clasesVentanas = ['.finder','.apps','.music','.maps','.message','.vs', '.safari','.settings','.console','.whatsapp']

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