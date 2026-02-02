const fechaInicio = new Date(2025, 11, 4, 15, 0, 0);
let iniciado = false;

function calcularTiempo() {
    const ahora = new Date();
    let diff = ahora - fechaInicio;

    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30.44);
    const años = Math.floor(meses / 12);

    return {
        years: años,
        months: meses % 12,
        days: Math.floor(dias % 30.44),
        hours: horas % 24,
        minutes: minutos % 60,
        seconds: segundos % 60
    };
}

function setTexto(id, valor, animar = false) {
    const el = document.getElementById(id);

    if (animar) {
        el.classList.add("animar");
        setTimeout(() => {
            el.textContent = valor;
            el.classList.remove("animar");
        }, 150);
    } else {
        el.textContent = valor;
    }
}

function actualizarContador() {
    const t = calcularTiempo();

    setTexto("years", t.years);
    setTexto("months", t.months);
    setTexto("days", t.days);
    setTexto("hours", t.hours);
    setTexto("minutes", t.minutes);
    setTexto("seconds", t.seconds, true); // animación SOLO en segundos
}

/* COUNT UP INICIAL */
function countUpInicial() {
    const objetivo = calcularTiempo();
    let actual = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    const interval = setInterval(() => {
        let terminado = true;

        for (let key in actual) {
            if (actual[key] < objetivo[key]) {
                actual[key]++;
                terminado = false;
            }
            setTexto(key, actual[key]);
        }

        if (terminado) {
            clearInterval(interval);
            iniciado = true;
        }
    }, 30);
}

/* INIT */
countUpInicial();
setInterval(() => {
    if (iniciado) actualizarContador();
}, 1000);