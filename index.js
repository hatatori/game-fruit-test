// fruitcrush

// 🍎 🍏 🍒 🍉 🍑 🥝 🍌 🍅 🌶️ 🎂 🍰 🍫 🥤 🥜 🍦 🍨 🥭

const HTML = {
    GameScreen: document.querySelector(".GameScreen")
}

// const fruits = '🍎 🍏 🍒 🍉 🍑 🥝 🍌 🍅 🌶️ 🎂 🍰 🍫 🥤 🥜 🍦 🍨 🥭'.split(" ")

// const lin = 5
// const col = 4
// const size = 100
// const randomness = 10



const Logic = {
    lin: 5,
    col: 4,
    size: 80,
    randomness: 7,
    blocks: [],
    Fruits: '🍅 🌶️ 🎂 🍉 🥤 🍰 🥝 🍫 🍎 🍏 🍒 🍑 🍌 🍅 🌶️ 🎂 🍰 🍫 🥜 🍦 🍨 🥭'.split(" "),
    table: [
        [0, 8, 8, 5, 1],
        [5, 9, 9, 0, 1],
        [3, 3, 3, 3, 1],
        [5, 9, 8, 2, 1],
        [5, 1, 1, 1, 0],
    ],

    Falls(){
        sm = Logic.SubMatrix()
        Graphics.CheckBin()
        setTimeout(()=>{
            for(let r=0;r<10;r++){
                Logic.Fall()
            }
        }, 300)
        
    },

    Fall(){
        console.log(sm)
        for(i=0;i<Logic.lin;i++){
            for(j=0;j<Logic.col;j++){
                if(sm[i][j] == -1){
                    try{
                        if(sm[i][j] == -1){
                            aux = sm[i][j]
                            sm[i][j] = sm[i-1][j]
                            sm[i-1][j] = aux
                            Logic.Swap([i,j],[i-1,j])
                        }
                    }catch(err){}
                }
            }
        }
        Logic.table = sm
    },
    

    Swap(a,b){
        const t1 = Graphics.getElementByCoordinate(a[0], a[1])
        const t2 = Graphics.getElementByCoordinate(b[0], b[1])
        Graphics.Change(t1, t2)
    },

    Change(a, b) {

        const t1 = Graphics.getElementByCoordinate(a[0], a[1])
        const t2 = Graphics.getElementByCoordinate(b[0], b[1])
        Graphics.Change(t1, t2)
        
        const aux = this.table[a[0]][a[1]]
        this.table[a[0]][a[1]] = this.table[b[0]][b[1]]
        this.table[b[0]][b[1]] = aux

        // Graphics.CheckBin()
        
        // const e1 = HTML.GameScreen.children[a[0] * this.col + a[1]]
        // const e2 = HTML.GameScreen.children[b[0] * this.col + b[1]]
        
        // const t1 = Array.from(HTML.GameScreen.children).filter(e=> e.getAttribute('lin') == a[0] && e.getAttribute('col') == a[1] )[0]
        // const t2 = Array.from(HTML.GameScreen.children).filter(e=> e.getAttribute('lin') == b[0] && e.getAttribute('col') == b[0] )[0]

        // console.log(t1)
        // console.log(b)
    },

    setGrid(lin, col) {
        const t = []
        for (let i = 0; i < lin; i++) {
            t[i] = []
            for (let j = 0; j < col; j++) {
                t[i].push(Math.random() * Logic.randomness | 0)
            }
        }

        this.lin = lin
        this.col = col
        this.table = t

        return t
    },

    generate() {
        // Logic.createTableRandom(5, 5)
        Graphics.Cenario()
        Graphics.Pieces()
    },
    generateTable(table){
        this.table = table
        Graphics.Cenario()
        Graphics.Pieces()
    },
    rotateMatrix(matrix) {
        return matrix[0].map((e, i) => matrix.map(row => row[i]));
    },
    toBin(x){
        
        // let x = [0, 0, 0, 6, 6, 3, 3, 3, 0, 5, 5, 5, 5, 9, 8];
    
        let groups = [];
        let currentGroup = [x[0]];
    
        for (let i = 1; i < x.length; i++) {
            if (x[i] === x[i - 1]) {
                currentGroup.push(x[i]);
            } else {
                groups.push(currentGroup);
                currentGroup = [x[i]];
            }
        }
    
        groups.push(currentGroup);
        groups.map((e,i)=> {
            if(e.length >= 3){
                e = e.map(g => 1)
                groups[i] = e
            }else{
                e = e.map(g => 0)
                groups[i] = e
            }
        } )
    
        return groups.flat()
    },
    toBinMatrix(matrix){
        x = matrix.map(e=> this.toBin(e) )
        return x
    },

    SumMatrix(){
        let a = Logic.toBinMatrix(Logic.table)
        let b = Logic.rotateMatrix(Logic.toBinMatrix(Logic.rotateMatrix(Logic.table)))
        
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                a[i][j] += b[i][j]
                if(a[i][j] > 1) a[i][j] = 1
            }
        }
        this.SumMatrixTable = a
        return a
    },
    SubMatrix(){
        const Smatrix = Logic.SumMatrix()
        const Table = Logic.table
        for (let i = 0; i < Logic.lin; i++) {
            for (let j = 0; j < Logic.col; j++) {
                if(Smatrix[i][j] == 1){
                    Table[i][j] = -1
                }
            }
        }
        return Table
    }
    
}

const Graphics = {

    getElementByCoordinate(lin, col){
        return Array.from(HTML.GameScreen.children).filter(e=> e.getAttribute('lin') == lin && e.getAttribute('col') == col )[0]
    },

    Cenario: () => {
        HTML.GameScreen.style.fontSize = (Logic.size / 1.5) + 'px'
        HTML.GameScreen.style.width = Logic.col * Logic.size + 'px'
        HTML.GameScreen.style.height = Logic.lin * Logic.size + 'px'
    },

    Pieces() {
        HTML.GameScreen.innerHTML = ''
        for (let i = 0; i < Logic.lin; i++) {
            for (let j = 0; j < Logic.col; j++) {
                const div = document.createElement("div")
                div.setAttribute('lin', i)
                div.setAttribute('col', j)
                div.style.left = j * Logic.size + 'px'
                div.style.top = i * Logic.size + 'px'
                div.style.width = Logic.size + 'px'
                div.style.height = Logic.size + 'px'
                div.style.transition = '0.1s'
                // div.innerHTML = '1'
                div.innerHTML = Logic.Fruits[Logic.table[i][j]]
                div.addEventListener('click', e => {

                    if (!Logic.blocks.includes(div)) {
                        Logic.blocks.push(div)
                    }

                    if (Logic.blocks.length == 2) {
                        const l1 = Logic.blocks[0].getAttribute('lin')|0
                        const c1 = Logic.blocks[0].getAttribute('col')|0

                        const l2 = Logic.blocks[1].getAttribute('lin')|0
                        const c2 = Logic.blocks[1].getAttribute('col')|0

                        Logic.Change([l1, c1], [l2, c2])
                        
                        Logic.blocks = []

                        Logic.Falls()
                    }

                    
                })
                HTML.GameScreen.append(div)
            }
        }
    },

    Change: (el1, el2) => {

        const a1 = el1.style.left
        const a2 = el1.style.top

        const b1 = el2.style.left
        const b2 = el2.style.top

        el1.style.left = b1
        el1.style.top = b2

        el2.style.left = a1
        el2.style.top = a2

        const c1 = el1.getAttribute('col')
        const l1 = el1.getAttribute('lin')
        
        const c2 = el2.getAttribute('col')
        const l2 = el2.getAttribute('lin')

        el1.setAttribute('lin', l2)
        el1.setAttribute('col', c2)

        el2.setAttribute('lin', l1)
        el2.setAttribute('col', c1)
    },

    CheckBin(){
        const matrixB = Logic.SubMatrix()
        
        for(let i=0;i<Logic.lin;i++){
            for(let j=0;j<Logic.col;j++){
                const el = Graphics.getElementByCoordinate(i,j)
                if(matrixB[i][j] == -1){
                    
                    try{
                        el.style.backgroundColor='#341a21'
                        el.style.opacity=0
                        
                        setTimeout(()=>{
                            el.remove()
                        }, 1000)
                    }catch(err){}
                }else{
                    // el.style.backgroundColor
                    setTimeout(()=> el.style.transition = '0.7s', 0 )
                    setTimeout(()=> el.style.transition = '0.2s', 700 )
                    el.style.backgroundColor='transparent'
                    
                }
            }   
        }
    }
}

// Logic.setGrid(5, 4)
Logic.setGrid(6, 4)
Logic.generate()

// Logic.generateTable([
//     [0,0,0,1],
//     [1,5,3,4],
//     [4,5,5,5],
//     [4,5,3,5],
//     [4,5,3,5],
// ])

// Graphics.CheckBin() //checa colunas


function SubMatrix(){
    const Smatrix = Logic.SumMatrix()
    const Table = Logic.table
    for (let i = 0; i < Logic.lin; i++) {
        for (let j = 0; j < Logic.col; j++) {
            if(Smatrix[i][j] == 1){
                Table[i][j] = -1
            }
        }
    }
    return Table
}

sm = Logic.SubMatrix()

function show(tab){
    for(i=0;i<Logic.lin;i++){
        console.log(tab[i])
    }
}

sm = Logic.SubMatrix()

window.onkeyup = (e) => {
    if(e.key == 1) {
        // sm = Logic.SubMatrix()
        // console.log(sm)
        show(sm)
        Graphics.CheckBin()
    }

    if(e.key == 2) {
        for(i=0;i<Logic.lin;i++){
            for(j=0;j<Logic.col;j++){
                if(sm[i][j] == -1){
                    try{
                        if(sm[i][j] == -1){
                            aux = sm[i][j]
                            sm[i][j] = sm[i-1][j]
                            sm[i-1][j] = aux
                            Logic.Swap([i,j],[i-1,j])
                        }
                    }catch(err){}
                }
            }
        }
        console.log('--')
        show(sm)
        Logic.table = sm
    }

    if(e.key == 3){
        Logic.Falls()
    }
    // Logic.Change([2, 3], [4, 4])
    // Logic.Change([0, 0], [2, 3])
}

function fallLine(a, b, k){
    // a = [1,0,1,1,0]
    // b = [0,0,0,1,1]
    for(let li=0;li<a.length;li++){
        if(a[li] < b[li]){
                b[li] = 1
                a[li] = 0
        }
    }
    return {
        a: a,
        b: b
    }
}


// function go(){
//     SumMatrix = Logic.SumMatrix()
//     SumMatrix2 = []

//     console.log(SumMatrix)

//     for(i=SumMatrix.length-1;i>=0;i--){

//         SumMatrix2[i] = []

//         const pa = SumMatrix[i]
//         const pb = SumMatrix[i-1]
        
        
//         // console.log(pb)
        
//         // console.log(pa)
//         for(j=0;j<SumMatrix[i].length;j++){
//             if(i>0){
//                 if(pb[j] < pa[j]){
//                     pa[j] = 0
//                     pb[j] = 1
//                 }
                
                
//                 // SumMatrix2[i][j] = 1
//                 // Graphics.Change()
//                 // else{
//                     //     SumMatrix2[i][j] = pb[j]
//                     // }
//                     // SumMatrix2
//                     SumMatrix2[i] = pb
//                     SumMatrix2[i-1] = pa
//             }
//             // else{
//             //     a = 1
//             //     if(SumMatrix[i][j] > SumMatrix[i+1][j]){
//             //         a = 0
//             //     }
//             //     SumMatrix2[i][j] = a
//             // }
//             // try{
//                 // if(pb[j] > pa[j]){
//                     // console.log(SumMatrix[i-1])
//                     // console.log(SumMatrix[i])
//                     // SumMatrix[i][j] = 1
//                     // SumMatrix[i-1][j] = 0

//                     // SumMatrix2[i][j] = 1
//                     // SumMatrix2[i-1][j] = 0

//                     // console.log(SumMatrix[i-1])
//                     // console.log(SumMatrix[i])
//                     // console.log(`linha ${i} : ${SumMatrix[i]}`)
//                     // console.log('---')
//                 // }else{
//                 //     SumMatrix2[i][j] = SumMatrix[i][j]
//                 // }
//             // }catch(e){}
//         }
//     }
//     console.log(SumMatrix2)

// }




