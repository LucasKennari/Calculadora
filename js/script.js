// === MAPEAMENTO === //

const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button") // selector ALL porque tem VARIOS botões

// === CLASSES / LOGICA === //

class calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }

    // add digit to calculator screen

    addDigit(digit) {
        // check if current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.incluedes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen(); // RESPONSAVEL POR ATUALIZAR A TELA
    }

    //Process all calculator operations

    processOperation(operation) {
        //checar se o valor em baixo está vazio, pois se ele estiver dará pra mudar a operação
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);

            }
            return;
        }




        //get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processCEOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEgualOperation();
            default:
                return;

        }

    }

    //Muda o valor da calculadora na tela
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // checar se o valor se é zero
            if (previous === 0) {
                operationValue = current;
            }

            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";

        }
    }


    //Mudar o simbolo aritmético
    changeOperation(operation) {
        const mathOperations = ['*', "/", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return
        }
        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //DEL - Deleta o ultimo digito
    processDelOperation() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }
    //Clear - limpa os digitos
    processCEOperation() {
        this.currentOperationText.innerText = "";

    }
    //Clear All - Limpa toda a operação
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Equal - Faz o resultado da operação aritmética

    processEgualOperation() {
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation);
    }

}

const calc = new calculator(previousOperationText, currentOperationText);

// === EVENTOS === //

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;// input a gente pega value, quando é botão a gente pega innerText

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})

