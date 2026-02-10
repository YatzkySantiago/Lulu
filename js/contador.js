const fechaInicio = new Date(2025, 11, 4, 15, 0, 0);
let iniciado = false;

function calcularTiempo() {
    const ahora = new Date();

    let years = ahora.getFullYear() - fechaInicio.getFullYear();
    let months = ahora.getMonth() - fechaInicio.getMonth();
    let days = ahora.getDate() - fechaInicio.getDate();
    let hours = ahora.getHours() - fechaInicio.getHours();
    let minutes = ahora.getMinutes() - fechaInicio.getMinutes();
    let seconds = ahora.getSeconds() - fechaInicio.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        const prevMonth = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days, hours, minutes, seconds };
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