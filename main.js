//VARIBALES

//EMPEZAR JUEGO

document.querySelector("#empezar").onclick = function () {

}

//RESETEAR JUEGO

document.querySelector("#resetear").onclick = function () {

}

//FUNCION MEZCLAR COLORES

function mezclarColores() {
    const colores = document.querySelectorAll(".color");
    const tablero = document.querySelector("#tablero");
    let arrayColores = [];

    colores.forEach(color => {
        arrayColores.push(color);
    })
    
    arrayColores.sort(() => Math.random() - 0.5);

    for (let i = 0; i < colores.length; i++) {
        tablero.removeChild(colores[i]);
    }
    for (let i = 0; i < arrayColores.length; i++) {
        tablero.appendChild(arrayColores[i]);
    }

    arrayColores.forEach(color => {
        color.style.background = color.id;
        setTimeout(function () {
            color.style.background = "white";
        }, 750);
    });
}

//FUNCION TURNO DEL JUGADOR



