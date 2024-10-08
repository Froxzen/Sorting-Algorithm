const generate = document.querySelector("#generate");
const sizeBtn = document.querySelector("#size")
const speedBtn = document.querySelector("#speed")
const stopBtn = document.querySelector("#stop");
const sizeSlider = document.querySelector("#size-slider");
const speedSlider = document.querySelector("#speed-slider");
const sort = document.querySelector("#sort");
const container = document.querySelector(".container");

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let numberOfElements = 50;
let speed = 100;

// Increase the heights of the data blocks for large screen devices.
function growDataHeight() {
    const dataElements = document.querySelectorAll(".data");
    dataElements.forEach(element => {
        let value = parseInt(element.getAttribute("value"));
        if (window.innerWidth > 768) {
            element.style.height = (value / 100) * (window.innerHeight * 0.8) + "px";
        }
    });
}

// Decrease the heights of the data blocks for small screen devices.
function shrinkDataHeight() {
    const dataElements = document.querySelectorAll(".data");
    dataElements.forEach(element => {
        let value = parseInt(element.getAttribute("value"));
        if (window.innerWidth <= 768) {
            element.style.height = (value / 100) * (window.innerHeight * 0.48) + "px";
        }
    });
}

// Creating the first dataset
function createDataset() {
    container.innerHTML = '';
    for (let i = 0; i < numberOfElements; i++) {
        const data = document.createElement("div");
        let width = window.innerWidth / numberOfElements;
        
        let value = Math.floor(Math.random() * 100) + 1;
        data.setAttribute("value", value);
        let height = (value / 100) * (window.innerHeight * 0.8);
        
        data.className = "data";
        
        data.style.width = width + "px";
        data.style.height = height + "px";
        container.appendChild(data);
    }
}

createDataset();
shrinkDataHeight();

window.addEventListener("resize", function() {
    shrinkDataHeight();
    growDataHeight();
});

// Generate a new dataset
generate.addEventListener("click", function() {
    createDataset();
    shrinkDataHeight();
    growDataHeight();
});

// Change the size of the dataset
sizeSlider.addEventListener("input", function() {
    numberOfElements = parseInt(sizeSlider.value);
    createDataset();
    shrinkDataHeight();
    growDataHeight();
});

// Change the speed of the sorting algorithm
speedSlider.addEventListener("input", function() {
    speed = parseInt(speedSlider.value);
})

// Helper function to create a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sort the elements using Bubble Sort
async function bubble_sort() {
    sort.addEventListener("click", async function() {  
        const dataList = document.querySelectorAll(".data");

        generate.disabled = true;
        sizeSlider.disabled = true;
        speedSlider.disabled = true;
        sort.disabled = true;
        generate.style.backgroundColor = "#808080";
        sizeBtn.style.backgroundColor = "#808080";
        speedBtn.style.backgroundColor = "#808080";
        sort.style.backgroundColor = "#808080";
        stopBtn.style.backgroundColor = "rgb(236, 16, 16)";

        let stopFlag = false;

        stopBtn.addEventListener("click", () => {
            stopFlag = true;
            timeouts.forEach(timeoutId => clearTimeout(timeoutId));
            timeouts = [];
            resetControls();
        });

        for (let i = 0; i < dataList.length - 1; i++) {
            let changed = false;
            if (stopFlag) {
                break;
            }

            for (let j = 0; j < dataList.length - 1 - i; j++) {
                if (stopFlag) {
                    break;
                }
                let value1 = parseInt(dataList[j].getAttribute("value"));
                let value2 = parseInt(dataList[j + 1].getAttribute("value"));

                dataList[j].style.backgroundColor = "#1E90FF";
                dataList[j + 1].style.backgroundColor = "#1E90FF";

                if (value1 > value2) {
                    let tempHeight = dataList[j].style.height;
                    let tempValue = dataList[j].getAttribute("value");

                    dataList[j].style.height = dataList[j + 1].style.height;
                    dataList[j].setAttribute("value", dataList[j + 1].getAttribute("value"));

                    dataList[j + 1].style.height = tempHeight;
                    dataList[j + 1].setAttribute("value", tempValue);
                    changed = true;
                }

                await sleep(speed); 

                dataList[j].style.backgroundColor = "black";
                dataList[j + 1].style.backgroundColor = "black";

                await sleep(speed / 2); 
            }
            
            if (!changed || stopFlag) {
                resetControls();
                break;
            }
        }
    });
}

function resetControls() {
    generate.disabled = false;
    sizeSlider.disabled = false;
    speedSlider.disabled = false;
    sort.disabled = false;
    generate.style.backgroundColor = "#3498db";
    sizeBtn.style.backgroundColor = "#3498db";
    speedBtn.style.backgroundColor = "#3498db";
    sort.style.backgroundColor = "#34ba34";
    stopBtn.style.backgroundColor = "#808080";
}

bubble_sort();