//ARRAY CONTENITORE ICONE HALLOWEEN
let arrayAnimali = ['👻', '🎃', '🧟', '🦇', '🩸', '🧛', '💀', '🧙', '😱', '😈', '👹', '👽', '👻', '🎃', '🧟', '🦇', '🩸', '🧛', '💀', '🧙', '😱', '😈', '👽', '👹'];


// ARRAY CON ICONE ORIGINALI DECOMMENTARE PER RIPRISTINARE
/*
let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
*/


// DEFINZIONE VARIABILI GLOBALI
let arrayComparison = [];
var interval;
var find = document.getElementsByClassName('find');
var modal = document.getElementById('modal');
var timer = document.querySelector('.timer');
document.body.onload = startGame();
var tempo;

//FUNZIONE SHUFFLE - FORNITA STARTER PACK 
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

// FUNZIONE PRINCIPALE CHE GESTISCE LO START DEL GIOCO
function startGame() {
    // reset timer
    clearInterval(interval);
    // shuffle casuale icone
    var arrayShuffle = shuffle(arrayAnimali);
    var griglia = document.getElementById('griglia');
    // reset div griglia
    griglia.innerHTML = '';
    // creazione div fino al raggiungimento num icone
    for (i = 0; i < arrayAnimali.length; i++) {
        var retro = document.createElement('div');
        var fronte = document.createElement('div');
        griglia.appendChild(retro).appendChild(fronte);
        fronte.className = 'icon';
        fronte.innerHTML = arrayShuffle[i];
    }
    // invocazione funzione clock
    clock();
    // aggiunta eventlistner sulle icone
    var icons = document.querySelectorAll('.icon')
    for (var i = 0; i < icons.length; i++) {
        icons[i].className = ' icon show disabled';
        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", victory);
    }
    // timeoute che mostra le icone per 1,5s prima di nasconderle
    setTimeout(preGame, 1500);
}

// FUNZIONE AGGIUNTA PER FARE IN MODO CHE LE ICONE VENGO MOSTRATE INIZIALMENTE
function preGame() {
    var icons = document.querySelectorAll('.icon')
    for (var i = 0; i < icons.length; i++) {
        icons[i].className = ' icon';
    }
}


// FUNZIONE CHE MOSTRA E GESTISCE IL CONFRONTO DELLE ICONE - FORNITA STARTER PACK
function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    /*
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    // toggle classe di appogio per evitare bug doppio click che diasabilita singola img
    this.classList.toggle("temp");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);
    // seleziono tutti gli elementi che hanno classe temp
    var len = document.querySelectorAll('.temp');
    //permetto di entrare nel'IF solo se ci sono due classi temp distinte attive
    if (len.length == 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison[0].classList.remove("temp");
            arrayComparison[1].classList.remove("temp");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function (item) {
                item.classList.add('disabled');
                arrayComparison[0].classList.remove("temp");
                arrayComparison[1].classList.remove("temp");
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function () {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < find.length; i++) {
                        find[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    } else if (arrayComparison.length == 2) {
        arrayComparison = [];
    }

}

//FUNZIONE CHE GESTISCE LA VITTORIA
function victory() {
    if (find.length == arrayAnimali.length) {
        clearInterval(interval);
        modal.className = 'active';
        // stampa tempo impiegato
        document.getElementById('tempoTrascorso').innerHTML = timer.innerHTML;
    }
}


// FUNZIONE CHE PERMETTE DI GIOCARE ANCORA
function playAgain() {
    modal.classList.remove('active');
    document.getElementById('score').innerHTML = 'Tempo precedente: ' + tempo;
    startGame();
}


//FUNZIONE CHE GESTISCE IL TIMER
function clock() {
    var secondi = 0;
    var minuti = 0
    interval = setInterval(function () {
        tempo = minuti + " min " + secondi + " sec";
        timer.innerHTML = 'Tempo: ' + minuti + " min " + secondi + " sec";
        secondi++
        if (secondi == 60) {
            minuti++
            secondi = 0
        }
    }, 1000)
}