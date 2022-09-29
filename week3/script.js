let red = 0;
let green = 0;
let blue = 0;

function randomColor() {
    let red = Math.random()*255;
    let green = Math.random()*255;
    let blue = Math.random()*255;
    return "rgb(" + red + "," + green + "," + blue +")"
}

const addimage = () => {
    let imgElem = document.createElement("img");
    imgElem.src = "dynamic.png";
    imgElem.alt = "new image!"

    mnElement.appendChild(imgElem);
}

const addSomeText = () =>{

    let htmlElem = document.createElement("h3");
    let someText = "This is a string of text!";
    htmlElem.innerText = someText;
    htmlElem.style.color = randomColor();
    mnElement.appendChild(htmlElem);
}

let clrButton = document.getElementById("colorBtn");
console.log(clrButton);
const mnElement = document.getElementById("mainElem");
const txtButton = document.getElementById("textBtn");
const imgButton = document.getElementById("imgBtn");

//creating button event listener
imgButton.addEventListener("click", addimage);
txtButton.addEventListener("click", addSomeText);
clrButton.addEventListener("click", ()=>{
    mnElement.style.backgroundColor = randomColor();
});