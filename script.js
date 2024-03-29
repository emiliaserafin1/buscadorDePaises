const paisesApiUrl = 'https://restcountries.com/v3.1/all'
const filtrarPorContinenteApiUrl = 'https://restcountries.com/v3.1/region/'
const body = document.body;
const icono = document.getElementById('icono');
const cardsContainer = document.getElementById('card-container');

const select = document.getElementById('filtro');
const limpiarFiltros = document.getElementById('limpiar');
const input = document.getElementById('pais-input');
const ordenamientos = document.getElementById('orden');
let listaDePaisesAux = [];

function cambiarModo() {
    // Si tiene la clase light-mode, cambia a dark-mode; si no, cambiar a light-mode
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        icono.classList.remove('fa-moon');
        icono.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        icono.classList.remove('fa-sun');
        icono.classList.add('fa-moon');
    }
}

icono.addEventListener('click', cambiarModo);

const loader = document.getElementById('loader');

async function obtenerPaises() {
    mostrarLoader();
    const promise = await fetch(paisesApiUrl);
    const paises = await promise.json();
    listaDePaisesAux = paises;
    ocultarLoader();
    return paises;
}

async function filtrarPorContinente(continente){
    mostrarLoader();
    const promise = await fetch(filtrarPorContinenteApiUrl + continente);
    const paises = await promise.json();
    listaDePaisesAux = paises;
    ocultarLoader();
    return paises;
}

function mostrarLoader() {
    loader.style.display = 'block';
}

function ocultarLoader() {
    loader.style.display = 'none';
}


function mostrarTarjetas(listaDePaises){
      for (let i = 0; i < listaDePaises.length; i++) {
        const pais = listaDePaises[i];

        //#region TARJETAS

        // Crear un elemento div con la clase 'card'
        const card = document.createElement('div');
        card.classList.add('card');

        // Crear el elemento div con la clase 'card-img'
        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');

        // Crear la etiqueta img y establecer el atributo src con la bandera del país
        const bandera = document.createElement('img');
        bandera.src = pais.flags.png;
        bandera.alt = pais.flags.alt;

        // Agregar la bandera al div 'card-img'
        cardImg.appendChild(bandera);

        // Crear el elemento div con la clase 'card-body'
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Crear y establecer el contenido de los elementos h2 y p
        const nombre = document.createElement('h2');
        nombre.textContent = pais.name.common;
        
        const capital = document.createElement('p');
        pais.capital === undefined ? capital.innerHTML = `Capital: <span>No tiene</span>` : capital.innerHTML = `Capital: <span>${pais.capital}</span>`;
        
        const poblacion = document.createElement('p');
        poblacion.innerHTML = `Población: <span>${pais.population}</span>`;
        
        const continente = document.createElement('p');
        const continentesHTML = pais.continents.join(", ");
        continente.innerHTML = `Continente: ${continentesHTML}`;

        // Agregar los elementos h2 y p al div 'card-body'
        cardBody.appendChild(nombre);
        cardBody.appendChild(capital);
        cardBody.appendChild(poblacion);
        cardBody.appendChild(continente);

        // Agregar los div 'card-img' y 'card-body' al div 'card'
        card.appendChild(cardImg);
        card.appendChild(cardBody);
       
        // Agregar la tarjeta al contenedor principal
        cardsContainer.appendChild(card);

        //#endregion

        //#region MODAL
        const dialog = document.createElement('dialog');
        document.body.appendChild(dialog);

        // Crear divs
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const cabecera = document.createElement('div');
        cabecera.classList.add('dialog-cabecera');

        const info = document.createElement('div');
        info.classList.add('dialog-info');

        // Crear elementos
        const btnCerrar = document.createElement('button');
        btnCerrar.setAttribute('id', 'cerrar');
        btnCerrar.textContent = 'X';
        btnContainer.appendChild(btnCerrar);
        
        
        const nombreModal = document.createElement('h2');
        nombreModal.textContent = pais.name.common;

        const banderaModal = document.createElement('img');
        banderaModal.src = pais.flags.png;
        banderaModal.alt = pais.flags.alt;
        

        cabecera.appendChild(nombreModal);
        cabecera.appendChild(banderaModal);
        
        const capitalModal = document.createElement('p');
        pais.capital === undefined ? capitalModal.innerHTML = `Capital: <span>No tiene</span>` : capitalModal.innerHTML = `Capital: <span>${pais.capital}</span>`;

        const poblacionModal = document.createElement('p');
        poblacionModal.innerHTML = `Población: <span>${pais.population}</span>`;

        const continenteModal = document.createElement('p');
        continenteModal.innerHTML = `Continente: <span>${pais.continents}</span>`;

        const areaModal = document.createElement('p');
        areaModal.innerHTML = `Area: <span>${pais.area}</span>`;

        const densidadModal = document.createElement('p');
        densidadModal.innerHTML = `Densidad: <span>${pais.population / pais.area}</span>`;

        const monedaModal = document.createElement('p');

        if (pais.currencies) {
            const monedasClaves = Object.keys(pais.currencies);
            const valoresMonedas = monedasClaves.map(clave => pais.currencies[clave].name).join(", ");
            monedaModal.innerHTML = `Moneda: <span>${valoresMonedas}</span>`;
        } else {
            monedaModal.innerHTML = `Moneda: <span>No tiene</span>`;
        }

        const mapsModal = document.createElement('a');
        mapsModal.href = pais.maps.googleMaps;
        
        const onuModal = document.createElement('p');
        onuModal.innerHTML = `ONU: <span>${pais.unMember}</span>`;
        
        const idiomaModal = document.createElement('p');
        if (pais.languages) {
            const clavesIdioma = Object.keys(pais.languages);
            const valoresIdiomas = clavesIdioma.map(clave => pais.languages[clave]).join(", ");
            idiomaModal.innerHTML = `Idioma: <span>${valoresIdiomas}</span>`;
        } else {
            monedaModal.innerHTML = `Idioma: <span>No tiene</span>`;
        }

        info.appendChild(capitalModal);
        info.appendChild(poblacionModal);
        info.appendChild(continenteModal);
        info.appendChild(areaModal);
        info.appendChild(densidadModal);
        info.appendChild(monedaModal);
        info.appendChild(mapsModal);
        info.appendChild(onuModal);
        info.appendChild(idiomaModal);

        dialog.appendChild(btnContainer);
        dialog.appendChild(modalContent);

        modalContent.appendChild(cabecera);
        modalContent.appendChild(info);

        const cerrar = document.getElementById('cerrar');
        
        card.addEventListener('click', () => dialog.showModal());
        btnContainer.addEventListener('click', (event) => {
            if (event.target.id === 'cerrar') {
                dialog.close();
            }
        });

        //#endregion
    }  
}

async function filtrarPorNombre(busqueda, listaDePaises) {
    // Filtrar los países que comienzan con la búsqueda
    const paisesEmp = listaDePaises.filter(pais => pais.name.common.toLowerCase().startsWith(busqueda.toLowerCase()));

    // Filtrar los países que tienen la búsqueda pero no comienzan por ella
    const paisesInc = listaDePaises.filter(pais => pais.name.common.toLowerCase().includes(busqueda.toLowerCase()) && !paisesEmp.includes(pais));

    // Concatenar las listas
    const paisesFiltrados = paisesEmp.concat(paisesInc);

    return paisesFiltrados;
}

function isLetter(letter) {
    return /^[a-zA-Z\s]$/.test(letter);
}

function ordenNombreAsc(listaDePaises){
    listaDePaises.sort((a,b) => {
        if(a.name.common > b.name.common){
            return 1;
        }
        if(a.name.common < b.name.common){
            return -1;
        }
        return 0;
    });
    return listaDePaises;
}

function ordenPoblacionAsc(listaDePaises){
    listaDePaises.sort((a,b) =>  a.population - b.population);
    return listaDePaises;
}

obtenerPaises().then(paises => mostrarTarjetas(paises));

async function actualizarTarjetas() {
    const continente = select.value;
    const busqueda = input.value.toLowerCase();
    const orden = ordenamientos.value;


    let paisesFiltrados = listaDePaisesAux.slice(); // Iniciar con una copia de la lista original

    // Filtrar por continente si se selecciona uno
    if (continente !== 'default') {
        paisesFiltrados = await filtrarPorContinente(continente);
    }

    // Aplicar filtro por nombre si se ingresa una búsqueda
    if (busqueda) {
        paisesFiltrados = await filtrarPorNombre(busqueda, paisesFiltrados);
    }
    // Aplicar ordenamiento
    if (orden === 'nombre-asc') {
        paisesFiltrados = ordenNombreAsc(paisesFiltrados);
    } else if (orden === 'nombre-desc') {
        paisesFiltrados = ordenNombreAsc(paisesFiltrados).reverse();
    } else if (orden === 'poblacion-asc') {
        paisesFiltrados = ordenPoblacionAsc(paisesFiltrados);
    } else if (orden === 'poblacion-desc') {
        paisesFiltrados = ordenPoblacionAsc(paisesFiltrados).reverse();
    }

    // Mostrar las tarjetas actualizadas
    cardsContainer.innerHTML = '';
    mostrarTarjetas(paisesFiltrados);
}

// Actualiza el evento del selector de continentes para llamar a la función de actualización
select.addEventListener('change', actualizarTarjetas);
input.addEventListener('keyup', actualizarTarjetas);
ordenamientos.addEventListener('change', actualizarTarjetas);

limpiarFiltros.addEventListener('click', () => {
    cardsContainer.innerHTML = '';
    select.value = 'default';
    ordenamientos.value = 'default';
    obtenerPaises().then(paises => mostrarTarjetas(paises))
});
