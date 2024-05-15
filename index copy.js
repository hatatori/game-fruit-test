// fruitcrush

// 🍎 🍏 🍒 🍉 🍑 🥝 🍌 🍅 🌶️ 🎂 🍰 🍫 🥤 🥜 🍦 🍨 🥭

const HTML = {
    GameScreen: document.querySelector(".GameScreen")
}

const fruits = '🍎 🍏 🍒 🍉 🎂 🥝 🍫'.split(" ")

const lin = 10
const col = 6
const size = 70

HTML.GameScreen.style.fontSize = (size/1.5)+'px'
HTML.GameScreen.style.width = lin * size + 'px'
HTML.GameScreen.style.height = col * size + 'px'

let els = []

for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
        const div = document.createElement("div")
        const r = Math.random()*fruits.length|0

        div.style.height = size+'px'
        div.style.width = size+'px'
        div.style.left = i * size + 'px'
        div.style.top = j * size + 'px'
        
        div.innerHTML = fruits[r]

        div.addEventListener('click', ()=> {
            els.push(div)

            if(els.length == 2){
                console.log('ok')
                change(els[0], els[1])
                els = []
            }

            console.log(els)
        } )

        HTML.GameScreen.append(div)
    }
}

function change(el1, el2){
    const a1 = el1.style.left
    const a2 = el1.style.top
    el1.style.transition = "0.5s"
    
    const b1 = el2.style.left
    const b2 = el2.style.top
    el2.style.transition = "0.5s"

    el1.style.left = b1
    el1.style.top = b2

    el2.style.left = a1
    el2.style.top = a2
}

