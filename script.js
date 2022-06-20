let QtdCartas;


function ParrotGame() {
    while (QtdCartas < 4 || QtdCartas > 14 || QtdCartas%2 !== 0) {
        QtdCartas = parseInt(prompt("Com quantas cartas você deseja jogar? *Escolha um número PAR entre 4 e 14!"));
    }


    const baralho = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot']

    baralho.sort(() => Math.random() - 0.5);

    let DifParrots = baralho.slice(0, (QtdCartas/2));

    DifParrots.forEach(parrot => DifParrots.push(parrot));

    DifParrots.sort(() => Math.random() - 0.5);

    const main = document.querySelector('main');

    DifParrots.forEach(parrot => {main.innerHTML += `
    <div class="card" onclick="VerificarCarta(this)" data-identifier="card">
        <div class="front-face face" data-identifier="front-face">
            <img src="front.png" alt="front-face">
        </div>
        <div class="back-face face" data-identifier="back-face">
            <img src="${parrot}.gif" alt="${parrot}">
        </div>
    </div>`})
}

ParrotGame();

let PrimeiroPar = true, Carta1, Carta2;
let pontuação = 0;
let Jogadas = 0;
let BlockCard = false;

function VerificarCarta(card) {
    if (!(card.classList.contains("virada")) && !BlockCard) {
        if (!PrimeiroPar) {
            BlockCard = true;
            setTimeout(function(){
                BlockCard = false;
            }, 1000)
        }

        Jogadas++;
        VirarCarta(card);
    }
}

function VirarCarta(card) {
    card.classList.add('virada')
    if (PrimeiroPar){
        Carta1 = card;
        PrimeiroPar = false;
    }
    else {
        Carta2 = card;
        VerificarIguais();
        PrimeiroPar = true;
    }
}

function VerificarIguais() {
    if (Carta1.lastElementChild.innerHTML === Carta2.lastElementChild.innerHTML) {
        Carta1 = null;
        Carta2 = null;
        pontuação++;
    }
    else {
        setTimeout(function() {
            Carta1.classList.remove("virada");
            Carta2.classList.remove("virada");
        }, 1000)
    }

    setTimeout(VerificarVitoria, 500);
}

function VerificarVitoria() {
    if (pontuação === (QtdCartas/2)) {
        alert(`Você ganhou em ${Jogadas} jogadas!`);
    }
}