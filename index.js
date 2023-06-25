let isMouseDown = false
let isRainbow = false
let myColor = 'black'
let r, g, b
const allButtons = document.querySelectorAll('.grid-size')
const clearButton = document.getElementById('clear-button')
const gridButton = document.querySelectorAll('#grid-size')
const rainbowButton = document.getElementById('rainbow-button')
const eraserButton = document.getElementById('eraser-button')
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(103, 58, 18)',
        'rgb(63, 81, 181)',
        'rgb(33, 150, 243)',
        'rgb(3, 169, 244)',
        'rgb(0, 188, 212)',
        'rgb(0, 150, 136)',
        'rgb(76, 175, 80)',
        'rgb(139, 195, 74)',
        'rgb(205, 220, 57)',
        'rgb(255, 235, 59)',
        'rgb(255, 193, 7)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            save: true
        }
    }
})

gridGenerator(16)
/* 
allButtons.forEach((item) =>{
    item.addEventListener('mousedown', () =>{
        item.style.backgroundColor = "red"
    })
}) */

pickr.on('save', (color, instance) => {
    isRainbow = false
    myColor = color.toRGBA().toString()
})

eraserButton.addEventListener('click', () =>{
    isRainbow = false
    myColor = 'white'
})

rainbowButton.addEventListener('click', () =>{
    if(isRainbow) isRainbow = false
    else isRainbow = true

})

gridButton.forEach((button) =>{
    button.addEventListener('click', () =>{
        let dimension = button.value
        gridDeleter()
        gridGenerator(dimension)
    })
})

clearButton.addEventListener('click', () =>{
    document.querySelectorAll('.square').forEach((item)=>{
            item.style.backgroundColor = 'white'
    })
})

function gridGenerator(size){
    const container = document.querySelector("#container-box")
    var cellSize = 512/size
    for(var i = 0; i < size; i++){
        var row = document.createElement('div')
        row.className = 'row'
        for(var x = 0; x < size; x++){
            var cell = document.createElement('div')
            cell.className = 'square'
            cell.style.width = cellSize + 'px'
            cell.style.height = cellSize + 'px'
            row.appendChild(cell)
        }
        container.appendChild(row)
    }

    paintBrush()

}

function paintBrush(){

    document.querySelectorAll('.square').forEach((item)=>{
        item.addEventListener('mousedown', () =>{
            isMouseDown = true
            if(isRainbow){
                r = Math.floor(Math.random()*256)
                g = Math.floor(Math.random()*256)
                b = Math.floor(Math.random()*256)
                myColor = `rgb(${r}, ${g}, ${b})`
            }
            item.style.backgroundColor = myColor
        })
        item.addEventListener('mousemove', () =>{
            if(isRainbow & isMouseDown){
                r = Math.floor(Math.random()*256)
                g = Math.floor(Math.random()*256)
                b = Math.floor(Math.random()*256)
                myColor = `rgb(${r}, ${g}, ${b})`
                item.style.backgroundColor = myColor
            }
            else if(isMouseDown){
                item.style.backgroundColor = myColor
            }
        })
        item.addEventListener('mouseup', () =>{
            isMouseDown = false
        })

    })
}

function gridDeleter() {
    document.querySelectorAll('.square').forEach((item)=>{
        item.remove()
    })
}