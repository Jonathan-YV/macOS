/*------------------------------- Ventanas -----------------------------*/

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
        console.log('Faltan botones de la ventana ' + clases)
    }
    
})