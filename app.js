document.addEventListener('DOMContentLoaded',()=>{
    const squares = document.querySelectorAll('.num');
    const resultDisplay = document.querySelector('#result');
    const scoreDisplay = document.querySelector('#score');
    const reset = document.querySelector('button');
    const width = 4;
    let bestScore = 0;
    const bestScoreDisplay = document.querySelector('#bestScore');
    let score = 0;
    
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
    }
    const hitSound = new sound('hitsound.mp3')
    const loseSound = new sound('lose.mp3')
    const successSound = new sound('success.mp3')


    function hideZeros(){
        for(let i=0; i<16;i++){
            if(squares[i].innerHTML==0){
                squares[i].classList.add('hide')
                squares[i].classList.remove('two','four','sixt','eight','sixtyFour','thirtyTwo')
            }else if(squares[i].innerHTML==2){
                squares[i].classList.remove('hide','four','sixt','eight','sixtyFour','thirtyTwo')
                squares[i].classList.add('two')
            }else if(squares[i].innerHTML==4){
                squares[i].classList.remove('hide','two','eight','sixt','sixtyFour','thirtyTwo')
                squares[i].classList.add('four')
            }else if(squares[i].innerHTML==8){
                squares[i].classList.remove('hide','two','four','sixt','sixtyFour','thirtyTwo')
                squares[i].classList.add('eight')
            }else if(squares[i].innerHTML==16){
                squares[i].classList.remove('hide','two','four','eight','sixtyFour','thirtyTwo')
                squares[i].classList.add('sixt')
            }else if(squares[i].innerHTML==32){
                squares[i].classList.remove('hide','two','four','eight','sixt','sixtyFour')
                squares[i].classList.add('thirtyTwo')
            }else if(squares[i].innerHTML==64){
                squares[i].classList.remove('hide','two','four','eight','sixt','thirtyTwo')
                squares[i].classList.add('sixtyFour')
            }else{
                squares[i].classList.remove('hide','two','four','eight','sixt','sixtyFour','thirtyTwo')
            }
        }
    }

    reset.addEventListener('click',()=>{
        for(let i=0;i<16;i++){
            squares[i].innerHTML = 0;
        }
        hideZeros();
        createBoard();
        bestScore = Math.max(bestScore,score);
        bestScoreDisplay.innerHTML = bestScore;
        score =0;
        resultDisplay.innerHTML = "";
        scoreDisplay.innerHTML = 0;
    })

    function createBoard() {
        hideZeros();
        generate();
        generate();

    }

    createBoard();

    function generate() {
        let randomNumber = Math.floor(Math.random()*squares.length)
        try{
            if (squares[randomNumber].innerHTML == 0){
                squares[randomNumber].innerHTML = 2
                hideZeros()
            }else generate()
        }catch{
            checkForGameOver()
        }
        
    }
    //test for swipe vertically
    function canMoveV(){
        let flag = false;
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML == squares[i+width].innerHTML && squares[i].innerHTML!=0){
                flag = true;
            }
        }
        return flag;
    }
    //test for swipe horizontally
    function canMoveH(){
        let flag = false;
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML == squares[i+1].innerHTML && squares[i].innerHTML!=0){
                flag = true;
            }
        }
        return flag;
    }



    //swipe right 
    function moveRight(){
        for (let i=0; i<16; i++){
            let flag = false;
            try{
                if(i%4 === 0) flag = true;
            }catch{
                
            }
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

                
                //zero is a falsy value
                let filteredRow = row.filter(num =>num)
                let missing = 4-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

            }
        }

    }


    //swipe left 
    function moveLeft(){
        for (let i=0; i<16; i++){
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

                
                //zero is a falsy value
                let filteredRow = row.filter(num =>num)
                let missing = 4-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    
    //swip down 
    function moveDown(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4-filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }

    //swip up 
    function moveUp(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4-filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }




    function combineRow(){
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn(){
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    //assign keycodes
    function control(e){
        if(e.keyCode === 39){
            keyRight()
        }else if(e.keyCode === 37){
            keyLeft()
        }else if(e.keyCode === 38){
            keyUp()
        }else if(e.keyCode ===40){
            keyDown()
        }
    }

    document.addEventListener('keyup',control)

    function keyRight(){
        
        moveRight()
        combineRow()
        moveRight()
        hideZeros()
        hitSound.play()
        generate()
        checkForGameOver()
    }

    function keyLeft(){
        
        moveLeft()
        combineRow()
        moveLeft()
        hideZeros()
        hitSound.play()
        generate()
        checkForGameOver()
    }

    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        hideZeros()
        hitSound.play()
        generate()
        checkForGameOver()
    }

    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        hideZeros()
        hitSound.play()
        generate()
        checkForGameOver()
    }


    //check for the number 2048 in the squares to win
    function checkForWin(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = "You Win!"
                success.play()
                document.addEventListener('keyup',control)
                hitSound.stop()
            }
        }
    }



    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0
        for(let i=0; i<squares.length;i++){
            if(squares[i].innerHTML==0){
                zeros++
            }
        }
        if(zeros ===0){
            if(canMoveV()==false && canMoveH()==false){
                loseSound.play()
                hitSound.stop()
                resultDisplay.innerHTML = "You Lose!"
                document.addEventListener('keyup',console)
                return true
            }
        }
        return false;
    }
})