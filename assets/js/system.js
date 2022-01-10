
const finder = {
    class : '.finder',
    minHeight : 200,
    minWidth : 500,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/finder_macos_bigsur_icon_190173.png"
}

const apps = {
    class : '.apps',
    minHeight : 200,
    minWidth : 200,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/app_store_alt_macos_bigsur_icon_190386.png"
}

const music = {
    class : '.music',
    minHeight : 200,
    minWidth : 200,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/apple_music_macos_bigsur_icon_190383.png"
}

const maps = {
    class : '.maps',
    minHeight : 100,
    minWidth : 100,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/maps_macos_bigsur_icon_189998.png"
}

const message = {
    class : '.message',
    minHeight : 100,
    minWidth : 100,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/messages_macos_bigsur_icon_189468.png"
}

const vs = {
    class : '.vs',
    minHeight : 100,
    minWidth : 100,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/microsoft_visual_studio_code_alt_macos_bigsur_icon_189952.png"
}

const safari = {
    class : '.safari',
    minHeight : 200,
    minWidth : 200,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/safari_macos_bigsur_icon_189770.png"
}

const settings = {
    class : '.settings',
    minHeight : 100,
    minWidth : 100,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/settings_macos_bigsur_icon_189754.png"
}

const console = {
    class : '.console',
    minHeight : 50,
    minWidth : 50,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/terminal_macos_bigsur_icon_189655.png"
}

const whatsapp = {
    class : '.whatsapp',
    minHeight : 100,
    minWidth : 100,
    pX : 20,
    pY : 20,
    img : "assets/img/iconos/whatsapp_alt_macos_bigsur_icon_189553.png"
}


const caracteristicasVentanas = [finder,apps,music,maps,message,vs,safari,settings,console,whatsapp]

const clasesVentanas =[];

caracteristicasVentanas.forEach((ventanas) =>{
    clasesVentanas.push(ventanas.class);
})