document.querySelector("#start-bttn").onclick = function () {
    startGame()
}

let round

function startGame() {
    resetGame()
    updateStatus("Busca los pares de colores.", "interface alert alert-warning")
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

