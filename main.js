document.querySelector("#start-bttn").onclick = function () {
    startGame()
}

let round
let arrayColors

function startGame() {
    resetGame()
    updateStatus("Busca los pares de colores.", "interface alert alert-warning")
    arrayColors = showColors(mixColors())
}

function resetGame() {
    round = 0
    document.querySelector("#round").innerText = `Ronda Nº${round}`
    updateStatus(`Oprime "Empezar" para iniciar el juego`, "interface alert alert-primary")
}

function updateStatus(text, typeAlert) {
    document.querySelector("#status").textContent = text
    document.querySelector("#status").className = typeAlert
}

function mixColors() {
    const colors = document.querySelectorAll(".color")
    const colorsArray = convertToArray(colors)
    colorsArray.className = "mixedColors"
    const mixedColors = shuffleArray(colorsArray)
    const board = document.querySelector("#board")
    for (let i = 0; i < colors.length; i++) {
        board.removeChild(colors[i])
    }
    for (let i = 0; i < colorsArray.length; i++) {
        board.appendChild(mixedColors[i])
    }
    return colorsArray
}

function convertToArray(colors) {
    let array = []
    for (let i = 0; i < colors.length; i++) {
        array.push(colors[i])
    }
    return array
}

function shuffleArray(inputArray) {
    const mixed = inputArray.sort(() => Math.random() - 0.5);
    return mixed
}

function showColors(colors) {
    for (let i = 0; i < colors.length; i++) {
        if (colors[i].id === "light-blue") {
            colors[i].style.background = "lightblue"
        } else if (colors[i].id === "dark-green") {
            colors[i].style.background = "darkgreen"
        } else if (colors[i].id === "rebecca-purple") {
            colors[i].style.background = "rebeccapurple"
        } else {
            colors[i].style.background = colors[i].id
        }
    }
    setTimeout(function () {
        for (let i = 0; i < colors.length; i++) {
            colors[i].style.background = "white"
        }
    }, 1250)
    return colors
}

