
//Variables
// Selected things in HTML:
let Body = document.querySelector('body');        //Body of html.
let Display = document.querySelector('.display'); //Show the results. 
let BtnsContainer = document.querySelector('.buttons-container');  //buttons-container is the container of buttons
let listOfSymbols = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.'] //To verify the input by keyboard
let equalSymbol = document.querySelector('#item-e');  //Item equal
let acSymbol = document.querySelector('#item-AC');    //Erase all content
let delSymbol = document.querySelector('#item-DEL');  //Erase one by one character
let ansSymbol = document.querySelector('#item-ANS');  //Ans button

let ANS; //Save the current result

// Put text in display by keyboard:
Display.textContent = '';
Body.addEventListener('keydown', (e)=>{  //Add eventlistener to detect the keyboard inputs
    if(listOfSymbols.includes(e.key)){   //Only read if key is in listOfSymbols
        Display.textContent += e.key;    //If true, appears in display
    }

    //If the key is enter or equal then process the equation.
    if(e.key == '=' || e.key == 'Enter'){
        ANS = processEquation();
        Display.textContent = ANS;
    }

    //Erase keys: 
    if(e.key == 'Delete'){
        Display.textContent = '';
    }
    if(e.key == 'Backspace'){
        Display.textContent = Display.textContent.slice(0,-1);
    }
});

//Put text in display by buttons:
BtnsContainer.addEventListener('click', (e)=>{            //Add event listener to buttons-container
    if(e.target && e.target.className == 'button'){       //Make sure to event lisener is only added to the buttons
        if(listOfSymbols.includes(e.target.innerHTML)){   //If the content of the button is in listOfSymbols
        Display.textContent+=e.target.innerHTML;          //Then add to the display text content. 
        }
    }
});

//DEL and AC
acSymbol.addEventListener('click',e=>{
    Display.textContent = '';
});

delSymbol.addEventListener('click',e=>{
    Display.textContent = Display.textContent.slice(0,-1);
});

//ANS

ansSymbol.addEventListener('click',e=>{
    if(!'Syntax error'.includes(ANS)){
    Display.textContent += ANS;
    }
});

//Take the string from the Display text content and process:
equalSymbol.addEventListener('click',(e)=>{
    ANS = processEquation();
    Display.textContent = ANS;
});

function processEquation(){
    let Input = Display.textContent;
    if(Input == '') return '';  // Si se apreta = sin ninguna ecuación adentro
    Input = Input.replace(/\+/g,',+,').replace(/\-/g,',-,').replace(/\*/g,',*,').replace(/\//g,',/,').split(','); //Better way?

    let listOfOperators = ['+','-','*','/'];
    //Syntax error cases:
    if(listOfOperators.includes(Input[Input.length - 1]) || Input.includes('') ){ //If includes '' means there are two operators in a row, and if you have a operator at the end of equation is a error too. 
        Input = 'Syntax error';
    }
    else{
        Input = findOperator('*',Input);  //Find and perform all the * operations
        Input = findOperator('/',Input);  //Find and perform the / operations
        Input = findOperator('+',Input);  //Find and perform the + operations
        Input = findOperator('-',Input);  //Find and perform the - operations 
        Input = Input[0];           //Imput is a list, so we convert in string.
    }

    return Input;
}

function findOperator(strOp,Input){
    while(Input.includes(strOp)){
        let currentIndex = Input.indexOf(strOp);  //Index of the first mathematical symbol.
        let num1 = parseFloat(Input[currentIndex-1]);   //The number to the left of the symbol
        let op = Input[currentIndex];                   //The symbol
        let num2 = parseFloat(Input[currentIndex+1]);   //Number to the right of symbol
        let x = Operate(num1,op,num2);                  //Result of the operation
        Input.splice(currentIndex-1,3,x);               //Replace the two numbers and the symbol by the result 
    }
    return Input;
}

//Some operations: 
function Operate(num1,op,num2){
    let ans;  //Save the result
    if(op == '+'){
        ans = num1 + num2;
    }
    else if(op == '-'){
        ans = num1 - num2;
    }
    else if(op == '*'){
        ans = num1*num2;
    }
    else if(op == '/'){
        ans = num1/num2;
    }
    return ans.toString();
}


// Scientific button (Show and hide scientific options)
let scientificButton = document.querySelector('.scientificBtn');
let buttonsContainer = document.querySelector('.buttons-container2');
buttonsContainer.style.display = "none"; //By default
scientificButton.addEventListener('click',ShowScientific);
function ShowScientific() {
    if (buttonsContainer.style.display === "none") {
        buttonsContainer.style.display = "grid";
    } else {
        buttonsContainer.style.display = "none";
    }
  }