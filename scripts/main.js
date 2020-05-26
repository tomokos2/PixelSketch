// Grid Setup
let paintColor = "black";
setUpGrid();
main();

function main() {
    const sizeBtn = document.querySelector('#sizeSubmit');
    sizeBtn.addEventListener('click', (e) => {
        const size = document.querySelector('#sizeInput').value;
        
        const errMsg = document.querySelector('#errorMsg');
        if (!isValidSize(size)) {
            errMsg.textContent = "**Please enter a size from 1-99";
            return;
        }
        errMsg.textContent = "";
        

        document.documentElement.style.setProperty('--grid-width-sq', `${Math.floor(+size)}`);
        setUpGrid();
    });



}

function setUpGrid() {
    let rt = window.getComputedStyle(document.documentElement);
    let sq = rt.getPropertyValue("--grid-width-sq");
    const container = document.querySelector("#canvas");
    container.innerHTML = "";
    for (let i = 0; i < Math.pow(sq, 2); i++) {
        let box = document.createElement("div");
        box.setAttribute('id', i.toString());
        box.classList.add('grid-box');
        container.appendChild(box);
    }

    addBorders();

    setUpListeners();
}

function setUpListeners() {
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('mouseover', (e) => {
            e.target.style.background = paintColor;
        });
    }

    const borderBtn = document.querySelector("#border");
    borderBtn.addEventListener('click', (e) => {
        addBorders();
    })

    const noBorderBtn = document.querySelector("#noBorder");
    noBorderBtn.addEventListener('click', (e) => {
        removeBorders();
    })

    let colorRadios = document.querySelectorAll("#colorForm");
    for (let i = 0; i < colorRadios.length; i++) {
        colorRadios[i].addEventListener('click', (e) => {
            if (e.target.id === "radioColorful") {
                setRainbowPaint();
            } else {
                paintColor = e.target.value;
            }
        })
    }
}

function addBorders() {
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("border");
    }
}

function removeBorders() {
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("border");
    }
}

// function setColorPaint(color) {
//     const boxes = document.getElementsByClassName("grid-box");
//     for (let i = 0; i < boxes.length; i++) {
//         boxes[i].addEventListener('mouseover', (e) => {
//             let randomColor = getRandColor();
//             e.target.style.background = black;
//         });
//     }
// }

function setRainbowPaint() {
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('mouseover', (e) => {
            let randomColor = getRandColor();
            e.target.style.background = randomColor;
        });
    }
}

function getRandColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z})`;
}

function isValidSize(size) {
    if (+size <= 0 || +size > 99) {
        return false;
    }
    return true;
}