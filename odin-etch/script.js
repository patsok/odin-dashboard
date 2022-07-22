let gridSize = 600;
let gridContainer = document.querySelector(".grid");
let slider = document.getElementById("myRange");
let colorPicker = document.querySelector("#colorPicker");
let output = document.getElementById("rangeValue");
let colorMode = document.querySelector(".colorMode")
let rainbowMode = document.querySelector(".rainbowMode")
let greyMode = document.querySelector(".greyMode")
let eraserMode = document.querySelector(".eraserMode")
let clear = document.querySelector(".clearButton")
let mode = 0;
let buttons = document.querySelectorAll("button");


gridContainer.setAttribute("style", `height:${gridSize+4}px;width:${gridSize+4}px;`)
output.textContent = `${slider.value} x ${slider.value}`;


function createSquares(num) {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let div = document.createElement("div");
            let divSize = gridSize / num;
            div.setAttribute("style", `height:${divSize}px;width:${divSize}px;`);
            gridContainer.appendChild(div);
        }
    }
}

function addColorMode() {
    let divs = document.querySelectorAll(".grid div");
    divs.forEach((div) => {
        div.addEventListener("mouseover", () => {
            let colorNow = colorPicker.value;
            div.style.backgroundColor = colorNow;
        })
    })
}

function addRainbowMode() {
    let divs = document.querySelectorAll(".grid div");
    divs.forEach((div) => {
        div.addEventListener("mouseover", () => {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            div.style.backgroundColor = `#${randomColor}`;
        })
    })
}

function addGreyMode() {
    let divs = document.querySelectorAll(".grid div");
    divs.forEach((div) => {
        let greyAdd = 0;
        div.addEventListener("mouseover", () => {
            greyAdd += 10;
            div.style.backgroundColor = `rgba(0, 0, 0, ${greyAdd}%)`;
        })
    })
}

function addEraserMode() {
    let divs = document.querySelectorAll(".grid div");
    divs.forEach((div) => {
        div.addEventListener("mouseover", () => {
            div.style.backgroundColor = `var(--primary-color)`;
        })
    })
}

function draw() {
    createSquares(slider.value);
}

function deleteGrid() {
    let divs = document.querySelectorAll(".grid div");
    divs.forEach((div) => {
        div.remove();
    })
}

function clearGrid() {
    let divs = document.querySelectorAll(".grid div");
    divs.forEach((div) => {
        div.style.backgroundColor = `var(--primary-color)`;
    })
}

slider.oninput = () => {
    output.textContent = `${slider.value} x ${slider.value}`;
    deleteGrid();
    draw();
    if (mode == 0) {
        addColorMode();
    } else if (mode == 1) {
        addRainbowMode();
    } else if (mode == 2) {
        addGreyMode();
    } else {
        addEraserMode();
    }
}

window.onload = function() {
    draw();
    addColorMode();
};

colorMode.addEventListener("click", () => {
    deleteClassModes()
    colorMode.classList.toggle('modeOn');
    mode = 0;
    deleteGrid();
    draw();
    addColorMode();
})

rainbowMode.addEventListener("click", () => {
    deleteClassModes()
    rainbowMode.classList.toggle('modeOn');
    mode = 1;
    deleteGrid();
    draw();
    addRainbowMode();
})

greyMode.addEventListener("click", () => {
    deleteClassModes()
    greyMode.classList.toggle('modeOn');
    mode = 2;
    deleteGrid();
    draw();
    addGreyMode();
})

eraserMode.addEventListener("click", () => {
    deleteClassModes()
    eraserMode.classList.toggle('modeOn');
    mode = 3;
    addEraserMode();
})

function deleteClassModes() {
    buttons.forEach((button) => {
        button.classList.remove(`modeOn`);
    })
}

clear.addEventListener("click", () => { clearGrid() })