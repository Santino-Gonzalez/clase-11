//VARIBALES
let colores = document.querySelectorAll(".color");

//EMPEZAR JUEGO

document.querySelector("#empezar").onclick = function () {
    document.querySelector("#empezar").disabled = true;
    mezclarColores();
    setTimeout(() => {
        buscarPares();
    }, 750);
}

//RESETEAR JUEGO

document.querySelector("#resetear").onclick = function () {

}

//FUNCION MEZCLAR COLORES

function mezclarColores() {
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

function buscarPares() {
    let clicks = 0;
    let color1;
    let color2;
    let intentos = 0;
    let paresEncontrados = 0;

    colores.forEach(color => {
        color.onclick = function () {
            if (color.style.background !== "black" && color !== color1) {
                clicks++;
                if (clicks === 2) {

                    intentos++;
                    document.querySelector("#intentos").innerText = `Intentos: ${intentos}`;

                    color.style.background = color.id;
                    color2 = color;

                    if (color1.id === color2.id) {
                        paresEncontrados++;
                        setTimeout(() => {
                            clicks = 0;
                            color1.style.background = "black";
                            color2.style.background = "black";
                        }, 500);
                    } else {
                        setTimeout(() => {
                            clicks = 0;
                            color1.style.background = "white";
                            color2.style.background = "white";
                        }, 500);
                    }
                    if(paresEncontrados === colores.length / 2){
                        alert(`¡Felicidades! Has encontrado todos los pares en ${intentos} intentos! Toca resetear para empezar otra partida.`);
                    }

                } else if (clicks > 2) {

                    return

                } else {

                    color.style.background = color.id;
                    color1 = color;

                }
            }
        }
    });
}

