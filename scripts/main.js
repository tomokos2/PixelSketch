// Grid Setup -- load once for first load
let loaded = false;
if (!loaded) {
    setUpGrid();
    setUpMenu();
}

/** Sets up the canvas with the chosen customizations*/
function setUpGrid() {

    // Get the num of boxes width for the grid from the root variable in the style file
    let rt = window.getComputedStyle(document.documentElement);
    let sq = rt.getPropertyValue("--grid-width-sq");

    const container = document.querySelector("#canvas");
    // Clear the canvas
    container.innerHTML = "";

    // Make one box for each unit in the area
    // Area = length ** 2
    for (let i = 0; i < Math.pow(sq, 2); i++) {

        let box = document.createElement("div");
        // Keep record of which number box it is
        box.setAttribute('id', i.toString());

        box.classList.add('grid-box');
        container.appendChild(box);

    }

    // Draw the borders, if it is selected
    let borderBtn = document.querySelector("#border");
    if (borderBtn.checked) {
        addBorders();
    } else {
        removeBorders();
    }

    // Set the default paint to whatever is currently chosen
    let colorRadios = document.querySelectorAll("#colorForm input[type=radio]");
    for (let i = 0; i < colorRadios.length; i++) {
        if (colorRadios[i].checked) {
            setPaints(colorRadios[i]);
        }
    }

    // Report that it has loaded
    loaded = true;
}

// Sets up all of the listeners in the side menu
function setUpMenu() {

    // Trigger the button to change the grid size whenever it is clicked
    const sizeBtn = document.querySelector('#sizeSubmit');
    sizeBtn.addEventListener('click', (e) => {
        // Get the current inputted value
        const size = document.querySelector('#sizeInput').value;
        
        // Make sure that the user input is valid
        const errMsg = document.querySelector('#errorMsg');
        if (!isValidSize(size)) {
            // If invalid, print an error and do not re-load grid
            errMsg.textContent = "**Please enter a size from 1-99";
            return;
        }

        // Clear any error messages if it succeeds
        errMsg.textContent = "";
        
        // Change the length and set up the grid once more
        document.documentElement.style.setProperty('--grid-width-sq', `${Math.floor(+size)}`);
        setUpGrid();
    });

    // Listen for the user changing border options
    const borderBtn = document.querySelector("#border");
    borderBtn.addEventListener('click', (e) => {
        addBorders();
    })

    const noBorderBtn = document.querySelector("#noBorder");
    noBorderBtn.addEventListener('click', (e) => {
        removeBorders();
    })

    // Listen for user changing paint color
    let colorRadios = document.querySelectorAll("#colorForm input[type=radio]");
    for (let i = 0; i < colorRadios.length; i++) {
        colorRadios[i].addEventListener('click', (e) => {
            setPaints(e.target);
        })
    }
}

// Adds borders to each grid box
function addBorders() {
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("border");
    }
}

// Removes the borders from each grid box
function removeBorders() {
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("border");
    }
}

// Sets the paints with corresponding color
function setPaints(target) {
    if (target.id === "radioColorful") {
        // Rainbow is special
        setRainbowPaint();
    } else {
        setColorPaint(target.value);
    }
}

// Change the paint color to whatever the selected color is
function setColorPaint(color) {
    // Box background color will listen for hover and change to that color
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('mouseover', (e) => {
            e.target.style.background = color;
        });
    }
}

// Change the paint color to random colors with each box
function setRainbowPaint() {
    // Box background color will listen for hover and change to a random color
    const boxes = document.getElementsByClassName("grid-box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('mouseover', (e) => {
            let randomColor = getRandColor();
            e.target.style.background = randomColor;
        });
    }
}

// Return a random rgb color
function getRandColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z})`;
}

// The size should be between 1 and 99
function isValidSize(size) {
    if (+size <= 0 || +size > 99) {
        return false;
    }
    return true;
}