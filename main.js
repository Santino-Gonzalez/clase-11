document.querySelector("#start-bttn").onclick = function () {
    startGame()
}

let round
let arrayColors

function startGame() {
    resetGame()
    updateStatus("Busca los pares de colores.", "interface alert alert-warning")
    arrayColors = showColors(mixColors())
    handleUserClick()
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

function handleUserClick() {
    let clicks = 0
    let foundPairs = 0
    let letter = 0
    arrayColors.forEach(function (color) {
        color.onclick = function () {
            if (color.className !== "color-1") {
                clicks++
                if (color.style.background !== "black") {
                    if (clicks === 2) {
                        round++
                        document.querySelector("#round").innerText = `Ronda Nº${round}`
                        if (color.id === "light-blue") {
                            color.style.background = "lightblue"
                        } else if (color.id === "dark-green") {
                            color.style.background = "darkgreen"
                        } else if (color.id === "gold") {
                            color.style.background === "rgba(255, 217, 0, 0.788)"
                        } else if (color.id === "rebecca-purple") {
                            color.style.background = "rebeccapurple"
                        } else {
                            color.style.background = color.id
                        }
                        color.classList = "color-2"
                        if (document.querySelector(".color-1") === document.querySelector(".color-2")) {
                            clicks = 1
                            return
                        } else if (document.querySelector(".color-1").id === document.querySelector(".color-2").id) {
                            setTimeout(function () {
                                document.querySelector(".color-1").style.background = "black"
                                document.querySelector(".color-2").style.background = "black"
                                document.querySelector(".color-1").className = "color col-sm-3"
                                document.querySelector(".color-2").className = "color col-sm-3"
                                clicks = 0
                            }, 250)
                            foundPairs++
                            arrayColors.forEach(function () {
                                if (letter === 0) {
                                    if (foundPairs === arrayColors.length / 2) {
                                        const $alertCongratulations = document.createElement("div")
                                        $alertCongratulations.className = "alert alert-warning alert-dismissible fade show"
                                        $alertCongratulations.setAttribute("role", "alert")
                                        const $textCongratulations = document.createElement("strong")
                                        $textCongratulations.innerText = "Felicidades! Has encontrado todos los pares!"
                                        const $buttonClose = document.createElement("button")
                                        $buttonClose.type = "button"
                                        $buttonClose.className = "btn-close"
                                        $buttonClose.setAttribute("data-bs-dismiss", "alert")
                                        $buttonClose.setAttribute("aria-label", "Close")
                                        $alertCongratulations.appendChild($textCongratulations)
                                        $alertCongratulations.appendChild($buttonClose)
                                        const $containerInterface = document.querySelector("#container-alert-win")
                                        $containerInterface.appendChild($alertCongratulations)
                                        $buttonClose.onclick = function () {
                                            $containerInterface.removeChild($alertCongratulations)
                                        }
                                        letter++
                                        setTimeout(function () {
                                            if ($alertCongratulations.parentNode === $containerInterface) {
                                                $containerInterface.removeChild($alertCongratulations)
                                            }
                                        }, 5000);
                                    }
                                }
                            })
                        } else {
                            setTimeout(function () {
                                document.querySelector(".color-1").style.background = "white"
                                document.querySelector(".color-2").style.background = "white"
                                document.querySelector(".color-1").className = "color col-sm-3"
                                document.querySelector(".color-2").className = "color col-sm-3"
                                clicks = 0
                            }, 1000)
                        }
                        return
                    } else if (clicks > 2) {
                        return
                    } else {
                        if (color.id === "light-blue") {
                            color.style.background = "lightblue"
                        } else if (color.id === "dark-green") {
                            color.style.background = "darkgreen"
                        } else if (color.id === "rebecca-purple") {
                            color.style.background = "rebeccapurple"
                        } else {
                            color.style.background = color.id
                        }
                        color.classList = "color-1"
                    }
                } else {
                    if (clicks === 2) {
                        clicks = 1
                    } else if (clicks === 1) {
                        clicks = 0
                    }
                }
            }
        }
    })
}
