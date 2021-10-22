var currentValue = "0"; //текущее значение калькулятора (отображается на дисплее)
var savedValue = "0"; //промежуточное значение
var signMinus = false; //true - число отрицательное
var currentOperation = null; //символ текущей операции
var resetOnNumberPressed = false; //если после нажатия кнопки "=" пользователь нажимает цифру, дисплей сбрасывается до 0
 
var highlightId = null; //id подсвеченного элемента
 
function display() { //вспомагательная функция, обновляет дисплей
    document.getElementById("display").innerHTML = signMinus ? "-" + currentValue : currentValue;
}
 
function numPressed(num) { //при нажатии на цифровую кнопку
    if (resetOnNumberPressed) { //если после нажатия кнопки "=" пользователь нажимает цифру, дисплей сбрасывается до 0
        reset();
        resetOnNumberPressed = false;
    }
 
    //дописываем к текущему значению нажатую цифру
    if (currentValue == "0")
        currentValue = String(num);
    else
        currentValue += num;
    display();
}
 
function reset() { //сброс
    currentValue = "0";
    savedValue = "0";
    signMinus = false;
    resetHighlight();
    display();
}
 
function signChange() { //смена знака
    if (currentValue == "0") //для 0 знак не меняется
        return;
 
    signMinus = !signMinus; //смена знака
    display();
}
 
function operation(op) { //операция + - / *
    if (currentOperation != null) //если в памяти есть какая-то незавершенная операция
        calculate(); //нужно ее выполнить и обновить значение
    resetOnNumberPressed = false;
 
    //запоминает текущее значение в промежуточный результат
    savedValue = signMinus ? "-" + currentValue : currentValue;
    currentValue = 0;
    signMinus = false;
    currentOperation = op;
    display();
}
 
function calculate() { //выполнить подсчет операции, вспомогательная функция
    if (currentOperation == null) //операции нет
        return;
 
    currentValue = signMinus ? "-" + currentValue : currentValue;
    currentValue = String(eval(savedValue + currentOperation + currentValue)); //вычисляет значение
 
    currentOperation = null;
    savedValue = 0;
    signMinus = false;
    resetOnNumberPressed = true;
 
    if (currentValue[0] == '-') { //если число отрицательное
        currentValue = currentValue.substring(1);
        signMinus = true; //ХРАНИМ ЗНАК ТОЛЬКО В ЭТОЙ ПЕРЕМЕННОЙ (чтобы избежать множества глупых ошибок)
    }
 
    resetHighlight(); //операция выполнена, сбрасываем подсветку операций
    display();
}
 
function backspace() { //удалить символ
    if (resetOnNumberPressed) { //если после нажатия кнопки "=" пользователь нажимает "стереть", дисплей сбрасывается до 0
        reset();
        return;
    }
 
    if (currentValue.length === 1) { //если введен только один символ
        currentValue = "0"; //обнуляем
        signMinus = false;
    } else
        currentValue = currentValue.substring(0, currentValue.length - 1); //иначе стираем последний
    display();
}
 
function highlight(id) { //выделить кнопку с этим id в голубой цвет
    resetHighlight(); //сначала убираем подсветку с другой кнопки
 
    document.getElementById(id).style.backgroundColor = "lightblue";
    highlightId = id; //запоминает id подсвеченной кнопки
}
 
function resetHighlight() { //очистка подсветки, вспомогательная функция
    if (highlightId != null)
        document.getElementById(highlightId).style.backgroundColor = "";
}