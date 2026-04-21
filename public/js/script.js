// 🔧 FIX CÁMARA HD
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const original = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

    navigator.mediaDevices.getUserMedia = function(c){
        if(c.video){
            c.video.width = { ideal:1920 };
            c.video.height = { ideal:1080 };
        }
        return original(c);
    }
}

// 🌍 DATOS
const data = {
    mexico: {
        nombre: "México",
        stats: "Posición 16 - 66 pts",
        jugadores: ["Lozano","Jimenez","Ochoa"]
    },
    japon: {
        nombre: "Japón",
        stats: "Posición 19 - 27 pts",
        jugadores: ["Minamino","Kubo","Endo"]
    }
};

let actual = null;

// 🎯 EVENTOS AR
document.addEventListener("DOMContentLoaded", () => {

    ["mexico","japon"].forEach(id => {

        const target = document.getElementById("target-"+id);

        target.addEventListener("targetFound", () => {
            actual = id;
            mostrarInfo();
        });

        target.addEventListener("targetLost", () => {
            // NO cerramos UI para que no moleste
            console.log("perdido", id);
        });

    });

});

// 🧠 UI
function mostrarInfo(){
    document.getElementById("ui-escaner").style.display="none";
    document.getElementById("ui-info").style.display="block";

    document.getElementById("titulo").innerText = data[actual].nombre;
}

function cerrarTodo(){
    actual = null;

    document.getElementById("ui-info").style.display="none";
    document.getElementById("ui-stats").style.display="none";
    document.getElementById("ui-jugadores").style.display="none";

    document.getElementById("ui-escaner").style.display="flex";
}

function abrirStats(){
    document.getElementById("ui-info").style.display="none";
    document.getElementById("ui-stats").style.display="block";

    document.getElementById("stats").innerText = data[actual].stats;
}

function abrirJugadores(){
    document.getElementById("ui-info").style.display="none";
    document.getElementById("ui-jugadores").style.display="block";

    const cont = document.getElementById("lista");
    cont.innerHTML="";

    data[actual].jugadores.forEach(j=>{
        const p = document.createElement("p");
        p.innerText = j;
        cont.appendChild(p);
    });
}

function volver(){
    document.getElementById("ui-stats").style.display="none";
    document.getElementById("ui-jugadores").style.display="none";
    document.getElementById("ui-info").style.display="block";
}

// iniciar escaner visible
document.getElementById("ui-escaner").style.display="flex";