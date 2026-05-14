// =====================================
// CALCULADORA CON FUNCIONES
// =====================================

// Función suma
function sumar(a, b) {
   resultado= a + b;
   return resultado;
}

// Función resta
function restar(a, b) {
    resultado= a - b;
    return resultado
}

// Función multiplicación
function multiplicar(a, b) {
    resultado= a * b;
    return resultado;
}

// Función división
function dividir(a, b) {
    resultado= a / b;
    return resultado;
}

function potencia(a, b) {
    resultado= (a ** b);
    return resultado;
}

function mayor(a, b) {
    if(a>b){return a} else{
        return b}
    
}

function dividir(a, b){
    if (b === 0){
    return ("error")
    }else{
    return a / b;
    }
}
    


// =====================================
// LLAMADO DE FUNCIONES
// =====================================

console.log("Resultado suma:");
console.log(sumar(10, 5));

console.log("----------------");

console.log("Resultado resta:");
console.log(restar(10, 5));

console.log("----------------");

console.log("Resultado multiplicación:");
console.log(multiplicar(10, 5));

console.log("----------------");

console.log("Resultado división:");
console.log(dividir(10, 5));

console.log("Resultado potencia:");
console.log(potencia(2, 3));

console.log("----------------");

console.log("Resultado mayor:");
console.log(mayor(10, 5));

console.log("----------------");

console.log("prueba de division por cero:");
console.log(dividir(10, 5));

console.log("----------------");