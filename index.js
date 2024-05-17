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
    randomness: 5,
    blocks: [],
    Fruits: '🍅 🌶️ 🎂 🍉 🥤 🍰 🥝 🍫 🍒 🍏 🍑 🍌 🍅 🌶️ 🎂 🍰 🍫 🥜 🍦 🍨 🥭'.split(" "),
    table: [
        [0, 8, 8, 5],
        [5, 0, 9, 0],
        [3, 1, 3, 3],
        [5, 9, 8, 2],
        [5, 1, 2, 1],
    ],

    points: 1,

    setPoints(n){
        this.points = n
        html_points.innerHTML = n
    },
    

    NegativeLine(table_line){
        table_line = table_line.map(e=> e == -1 ?  'a' : e )
        table_line = table_line.join('')
        table_line = table_line.replace(/-?(\d)\1{2,}/g, (e,i) => 'x'.repeat(e.length))
        table_line = table_line.split("")
        table_line = table_line.map(e=>e.replace(/x|a/g, '-1')|0)

        return table_line
    },

    NegativeTables(tb = Logic.table){
        
        tb = tb.map(line=> Logic.NegativeLine(line) )
        tb = Logic.rotateMatrix(tb)

        tb = tb.map(line=> Logic.NegativeLine(line) )
        tb = Logic.rotateMatrix(tb)
        
        tb = tb.map(line=> Logic.NegativeLine(line) )
        tb = Logic.rotateMatrix(tb)

        tb = tb.map(line=> Logic.NegativeLine(line) )
        tb = Logic.rotateMatrix(tb)

        
        
        // console.log(tb)
        // tb = tb.map(line=> Logic.NegativeLine(line) )
        // console.log(tb)
        // console.log(Logic.rotateMatrix(tb))
        // tb = Logic.rotateMatrix(tb)
        // tb = tb.map(line=> Logic.NegativeLine(line) )
        // tb = Logic.rotateMatrix(tb)
        // tb = tb.map(line=> Logic.NegativeLine(line) )

        // console.log(tb)
        
        // tb = Logic.rotateMatrix(tb)

        // console.log(tb)
        Logic.table = tb

        return tb
    },

    refresh(){
        if(Logic.randomness > Logic.Fruits.length-1)
            Logic.randomness = Logic.Fruits.length-1
        
        Logic.setGrid(Logic.lin, Logic.col)
        Logic.generate()

        Graphics.ClearLines()

        // html_points.innerHTML = Logic.points
        // html_points.innerHTML = 'x'
    },


    Renew(){
        // add new fruits in first line after clear repeated fruits
        // Logic.table = Logic.NegativeTables()

        // while(Logic.table[0].includes(-1)){
            for(j=0;j<Logic.col;j++){
                // console.log(Logic.table[0][j])
                if(Logic.table[0][j] == -1){
                    Graphics.PieceAdd([0,j])


                    // Logic.table[i][j] = 
                    // Logic.Downs()
                }
            }
        // }

    },

    Downs(){
        for (let q = 0; q < Logic.lin; q++) {
            for (let i = 0; i < Logic.lin; i++) {
                for (let j = 0; j < Logic.col; j++) {
                    if(Logic.table[i+1] != undefined && Logic.table[i+1][j] == -1){
                        Logic.Down(i,j)
                    }
                }
            }
        }
    },

    Down(i, j){

        if(Logic.table[i][j] == -1) {
            console.error("non-existent element in position");
            return
        }

        if(Logic.table[i+1][j] > -1) {
            console.error("There is an element below, impossible to fall");
            return
        }
        
        aux = Logic.table[i][j]
        Logic.table[i][j] = Logic.table[i+1][j]
        Logic.table[i+1][j] = aux
        el = Graphics.getElementByCoordinate(i, j)
        el.style.top = (i+1)*Logic.size+'px'
        el.style.left = j*Logic.size+'px'
        el.setAttribute('lin', (i+1))
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

        // Graphics.ClearLines()
        
        // const e1 = HTML.GameScreen.children[a[0] * this.col + a[1]]
        // const e2 = HTML.GameScreen.children[b[0] * this.col + b[1]]
        
        // const t1 = Array.from(HTML.GameScreen.children).filter(e=> e.getAttribute('lin') == a[0] && e.getAttribute('col') == a[1] )[0]
        // const t2 = Array.from(HTML.GameScreen.children).filter(e=> e.getAttribute('lin') == b[0] && e.getAttribute('col') == b[0] )[0]

        // console.log(t1)
        // console.log(b)
    },

    setGrid(lin, col) {
        HTML.GameScreen.innerHTML = ''
        HTML.GameScreen.style.width = col*Logic.size+'px'
        HTML.GameScreen.style.height = lin*Logic.size+'px'

        // const t = []
        // for (let i = 0; i < lin; i++) {
        //     t[i] = []
        //     for (let j = 0; j < col; j++) {
        //         t[i].push(Math.random() * Logic.randomness | 0)
        //     }
        // }

        const t = []
        for (let i = 0; i < lin; i++) {
            t[i] = []
            for (let j = 0; j < col; j++) {
                t[i].push(-1)
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

        for(i=0;i<Logic.lin;i++){
            for(j=0;j<Logic.col;j++){
                Graphics.PieceAdd([i,j])
                // Logic.Downs()
            }
        }
        // Logic.Downs()


        // Graphics.Pieces()
    },

    generateTable(table){
        Logic.table = table
        Graphics.Cenario()

        for(i=0;i<Logic.lin;i++){
            for(j=0;j<Logic.col;j++){
                if(Logic.table[i][j] != -1)
                    Graphics.PieceAdd([i,j], Logic.table[i][j])
                // Logic.Downs()
            }
        }
        // Graphics.Pieces()

        // for(i=0;i<Logic.lin;i++){
        //     for(j=0;j<Logic.col;j++){
        //         if(Logic.table[i][j] >= 0)
        //             Graphics.PieceAdd([i,j])
        //         // Logic.Downs()
        //     }
        // }

        // this.generate()


        // Graphics.PieceAdd([0,j])

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

    // Pieces() {
    //     HTML.GameScreen.innerHTML = ''
    //     for (let i = 0; i < Logic.lin; i++) {
    //         for (let j = 0; j < Logic.col; j++) {
    //             const div = document.createElement("div")
    //             div.setAttribute('lin', i)
    //             div.setAttribute('col', j)
    //             div.style.left = j * Logic.size + 'px'
    //             div.style.top = i * Logic.size + 'px'
    //             div.style.width = Logic.size + 'px'
    //             div.style.height = Logic.size + 'px'

                

    //             div.style.transition = '0.5s'
    //             // div.innerHTML = '1'
    //             // div.innerHTML = Logic.Fruits[Logic.table[i][j]]
    //             div.innerHTML = Logic.Fruits[Logic.table[i][j]]

    //             div.addEventListener('click', e => {

    //                 if (!Logic.blocks.includes(div)) {
    //                     Logic.blocks.push(div)
    //                 }

    //                 if (Logic.blocks.length == 2) {
    //                     const l1 = Logic.blocks[0].getAttribute('lin')|0
    //                     const c1 = Logic.blocks[0].getAttribute('col')|0

    //                     const l2 = Logic.blocks[1].getAttribute('lin')|0
    //                     const c2 = Logic.blocks[1].getAttribute('col')|0

    //                     Logic.Change([l1, c1], [l2, c2])
                        
    //                     Logic.blocks = []

    //                     // Logic.Falls()
    //                     // Logic.Downs()
    //                 }
                    
    //             })
                    
    //             HTML.GameScreen.append(div)

                

    //         }
    //     }
    // },

    PieceAdd(cordinate, val=(Math.random() * Logic.randomness|0)){

        const [i,j] = cordinate

        if(val == -1) return

        const div = document.createElement("div")
        div.setAttribute('lin', i)
        div.setAttribute('col', j)
        div.style.left = j * Logic.size + 'px'
        div.style.top = i * Logic.size + 'px'
        div.style.width = Logic.size + 'px'
        div.style.height = Logic.size + 'px'
        div.style.transition = '0.2s'

        div.style.opacity = 0
        div.style.translate = '0px -'+Logic.size+'px'

        div.innerHTML = Logic.Fruits[val]

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

                // Logic.Falls()
                // for(let r=0;r<Logic.col;r++){
                // Logic.table = Logic.NegativeTables()
                Graphics.ClearLines()
                // }
                // Logic.Downs()
                // setTimeout(()=>{
                //     for(let t=0;t<Logic.lin;t++){
                //         Logic.Downs()
                //     }
                // }, 300)
                
            }
            
        })

        HTML.GameScreen.append(div)
        Logic.table[i][j] = val

        setTimeout(()=>{
            div.style.opacity = 1
            div.style.removeProperty('translate')
        }, 0)
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

    ClearLines(){
        // const matrixB = Logic.SubMatrix()

        const matrixB = Logic.NegativeTables()
        
        for(let i=0;i<Logic.lin;i++){
            for(let j=0;j<Logic.col;j++){
                
                const el = Graphics.getElementByCoordinate(i,j)
                
                // console.log(`${i} - ${j}`)
                // console.log(el)

                if(matrixB[i][j] == -1){

                    console.log(matrixB[i][j])

                    try{
                        el.style.backgroundColor='#341a21'
                        el.style.opacity=0
                        
                        setTimeout(()=>{
                            el.remove()

                            // Logic.points += 1
                            Logic.setPoints(++Logic.points)

                            // Logic.points = ++Logic.points
                            // Logic.points = ++Logic.points
                            // Logic.points = ++Logic.points
                            // console.log(Logic.points)
                            // Logic.table = Logic.NegativeTables()
                            // console.log(el)
                        }, 200)
                        
                        setTimeout(()=>{
                            // el.remove()
                            for(let r=0;r<Logic.col;r++){
                                Logic.Renew()
                                Logic.Downs()
                            }
                        }, 400)
                        
                        setTimeout(()=>{
                            // Logic.table = Logic.NegativeTables()
                            // Logic.Renew()
                        }, 600)

                    }catch(err){}
                // }else{
                    // el.style.backgroundColor
                    // setTimeout(()=> el.style.transition = '0.2s', 0 )
                    // setTimeout(()=> el.style.transition = '0.2s', 700 )
                    // el.style.backgroundColor='transparent'
                }
                
            }   
        }
        // for(i=0;i<Logic.lin;i++){
            // Graphics.ClearLines()
            // Logic.Downs()
        // }
    }
}

// Logic.setGrid(5, 4)
Logic.setPoints(0)
Logic.setGrid(6, 4)
Logic.generate()


// Logic.generateTable([
//     [3, 3, 3, 3],
//     [0, 2, 4, 0],
//     [2, 3, 2, 5],
//     [2, 2, 2, 2],
//     [1, 3, 1, 3],
// ])

// Graphics.ClearLines()
// Graphics.ClearLines()
// Graphics.ClearLines()
// Graphics.ClearLines()
// Graphics.ClearLines()

// setTimeout(()=>{
//     Logic.Downs()
//     Logic.Downs()
//     Logic.Downs()
//     Logic.Downs()
//     Logic.Downs()
//     Logic.Downs()
// }, 1000)


// Graphics.ClearLines() //checa colunas


// function SubMatrix(){
//     const Smatrix = Logic.SumMatrix()
//     const Table = Logic.table
//     for (let i = 0; i < Logic.lin; i++) {
//         for (let j = 0; j < Logic.col; j++) {
//             if(Smatrix[i][j] == 1){
//                 Table[i][j] = -1
//             }
//         }
//     }
//     return Table
// }

// sm = Logic.SubMatrix()

// function show(tab){
//     for(i=0;i<Logic.lin;i++){
//         console.log(tab[i])
//     }
// }

// sm = Logic.SubMatrix()

window.onkeyup = (e) => {
    if(e.key == '1') {
        Graphics.ClearLines()
        // for(i=0;i<Logic.lin;i++)
        // Logic.Downs()
    }
    if(e.key == '2') {
        Logic.Downs()
    }

    if(e.key == '3') {
        Logic.Renew()
    }

}

setInterval(()=>{
    Graphics.ClearLines()
}, 500)

// let text = [-1, -1, -1, 3, 3, 5, 5, 5,1,2,3,5,4,3,3,3]
// text = text.map(e=> e == -1 ?  'a' : e )
// text = text.join('')
// text = text.replace(/-?(\d)\1{2,}/g, (e,i) => 'x'.repeat(e.length))
// text = text.split("")
// text = text.map(e=>e.replace(/x|a/g, '-1')|0)
// console.log(text)
