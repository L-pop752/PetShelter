// ======================================================
// PETSHELTER - MASCOTAS
// API + CRUD + LOCALSTORAGE
// ======================================================

const listaMascotas =
    document.getElementById("listaMascotas");

const buscador =
    document.getElementById("buscadorMascotas");

const filtroTipo =
    document.getElementById("filtroTipo");

const ordenMascotas =
    document.getElementById("ordenMascotas");

const contadorMascotas =
    document.getElementById("contadorMascotas");

const modalAdopcion =
    document.getElementById("modalAdopcion");

const nombreMascota =
    document.getElementById("nombreMascota");

const formAdopcion =
    document.getElementById("formAdopcion");


// ======================================================
// DATOS LOCALES DE RESPALDO
// ======================================================

const mascotasIniciales = [

    {
        id: 1,
        nombre: "Max",
        tipo: "Perro",
        edad: 2,
        descripcion: "Cariñoso y juguetón.",
        imagen:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        nombre: "Rocky",
        tipo: "Perro",
        edad: 3,
        descripcion: "Amigable y tranquilo.",
        imagen:
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        nombre: "Luna",
        tipo: "Perra",
        edad: 1,
        descripcion: "Dulce y muy cariñosa.",
        imagen:
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=700&q=80"
    }

];


// ======================================================
// OBTENER MASCOTAS
// ======================================================

function obtenerMascotas() {

    const guardadas =
        localStorage.getItem("petShelterMascotas");

    if (!guardadas) {

        localStorage.setItem(
            "petShelterMascotas",
            JSON.stringify(mascotasIniciales)
        );

        return mascotasIniciales;
    }

    return JSON.parse(guardadas);
}


// ======================================================
// GUARDAR
// ======================================================

function guardarMascotas(mascotas) {

    localStorage.setItem(
        "petShelterMascotas",
        JSON.stringify(mascotas)
    );
}


// ======================================================
// CARGAR API PÚBLICA
// TheDogAPI
// ======================================================

async function cargarAPI() {

    try {

        const respuesta =
            await fetch(
                "https://api.thedogapi.com/v1/images/search?limit=20"
            );

        if (!respuesta.ok) {
            throw new Error("API no disponible");
        }

        const datos =
            await respuesta.json();


        const actuales =
            obtenerMascotas();


        datos.forEach((animal, indice) => {

            actuales.push({

                id:
                    Date.now() + indice,

                nombre:
                    `Amigo ${indice + 1}`,

                tipo:
                    "Perro",

                edad:
                    2,

                descripcion:
                    "Una mascota que busca una familia responsable.",

                imagen:
                    animal.url

            });

        });


        guardarMascotas(actuales);

        mostrarMascotas();

    } catch (error) {

        console.warn(
            "No se pudo cargar la API. Se usarán mascotas locales."
        );

    }

}


// ======================================================
// MOSTRAR MASCOTAS
// ======================================================

function mostrarMascotas() {

    if (!listaMascotas) return;


    let mascotas =
        obtenerMascotas();


    const texto =
        buscador
            ? buscador.value.toLowerCase().trim()
            : "";


    const tipo =
        filtroTipo
            ? filtroTipo.value
            : "todos";


    if (texto) {

        mascotas =
            mascotas.filter(mascota =>
                mascota.nombre
                    .toLowerCase()
                    .includes(texto)
            );
    }


    if (tipo !== "todos") {

        mascotas =
            mascotas.filter(
                mascota =>
                    mascota.tipo === tipo
            );
    }


    if (ordenMascotas) {

        if (ordenMascotas.value === "nombre") {

            mascotas.sort(
                (a, b) =>
                    a.nombre.localeCompare(b.nombre)
            );

        }

        if (ordenMascotas.value === "edad") {

            mascotas.sort(
                (a, b) =>
                    Number(a.edad) - Number(b.edad)
            );
        }
    }


    listaMascotas.innerHTML = "";


    mascotas.forEach(mascota => {

        const favoritos =
            JSON.parse(
                localStorage.getItem(
                    "petShelterFavoritos"
                )
            ) || [];


        const esFavorito =
            favoritos.includes(mascota.id);


        const columna =
            document.createElement("div");

        columna.className =
            "col-sm-6 col-lg-4";


        columna.innerHTML = `

            <article class="card h-100 shadow-sm">

                <div class="position-relative">

                    <img
                        src="${mascota.imagen}"
                        class="card-img-top"
                        alt="Mascota ${mascota.nombre}"
                        loading="lazy"
                    >

                    <button
                        class="btn-favorito ${esFavorito ? "activo" : ""}"
                        onclick="toggleFavorito(${mascota.id})"
                        aria-label="Agregar a favoritos"
                    >
                        ${esFavorito ? "❤️" : "♡"}
                    </button>

                </div>


                <div class="card-body d-flex flex-column">

                    <h3 class="card-title">
                        ${mascota.nombre}
                    </h3>

                    <p class="text-primary fw-semibold">
                        ${mascota.tipo} · ${mascota.edad} años
                    </p>

                    <p class="card-text flex-grow-1">
                        ${mascota.descripcion}
                    </p>


                    <div class="d-grid gap-2">

                        <button
                            class="btn btn-primary"
                            onclick="abrirModal(${mascota.id})"
                        >
                            ❤️ Quiero adoptarlo
                        </button>

                        <button
                            class="btn btn-outline-secondary"
                            onclick="editarMascota(${mascota.id})"
                        >
                            ✏️ Editar
                        </button>

                        <button
                            class="btn btn-outline-danger"
                            onclick="eliminarMascota(${mascota.id})"
                        >
                            🗑️ Eliminar
                        </button>

                    </div>

                </div>

            </article>

        `;


        listaMascotas.appendChild(columna);

    });


    if (contadorMascotas) {

        contadorMascotas.textContent =
            `${mascotas.length} mascota(s) encontrada(s)`;

    }

}


// ======================================================
// FAVORITOS
// ======================================================

function toggleFavorito(id) {

    let favoritos =
        JSON.parse(
            localStorage.getItem(
                "petShelterFavoritos"
            )
        ) || [];


    if (favoritos.includes(id)) {

        favoritos =
            favoritos.filter(
                favorito => favorito !== id
            );

    } else {

        favoritos.push(id);

    }


    localStorage.setItem(
        "petShelterFavoritos",
        JSON.stringify(favoritos)
    );


    mostrarMascotas();
}


// ======================================================
// ABRIR MODAL
// ======================================================

function abrirModal(id) {

    const mascotas =
        obtenerMascotas();

    const mascota =
        mascotas.find(
            item => item.id === id
        );


    if (!mascota || !modalAdopcion) return;


    nombreMascota.textContent =
        mascota.nombre;

    modalAdopcion.classList.add("mostrar");

    modalAdopcion.setAttribute(
        "aria-hidden",
        "false"
    );
}


// ======================================================
// CERRAR MODAL
// ======================================================

function cerrarFormulario() {

    if (!modalAdopcion) return;

    modalAdopcion.classList.remove("mostrar");

    modalAdopcion.setAttribute(
        "aria-hidden",
        "true"
    );


    if (formAdopcion) {
        formAdopcion.reset();
    }

}


// ======================================================
// ELIMINAR
// ======================================================

function eliminarMascota(id) {

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar esta mascota?"
        );


    if (!confirmar) return;


    let mascotas =
        obtenerMascotas();


    mascotas =
        mascotas.filter(
            mascota =>
                mascota.id !== id
        );


    guardarMascotas(mascotas);

    mostrarMascotas();

}


// ======================================================
// EDITAR
// ======================================================

function editarMascota(id) {

    const mascotas =
        obtenerMascotas();


    const mascota =
        mascotas.find(
            item => item.id === id
        );


    if (!mascota) return;


    const nuevoNombre =
        prompt(
            "Nuevo nombre:",
            mascota.nombre
        );


    if (!nuevoNombre) return;


    mascota.nombre =
        nuevoNombre.trim();


    guardarMascotas(mascotas);

    mostrarMascotas();

}


// ======================================================
// FORMULARIO ADOPCIÓN
// ======================================================

if (formAdopcion) {

    formAdopcion.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nombre =
                formAdopcion.querySelector(
                    'input[name="nombre"]'
                );


            const telefono =
                formAdopcion.querySelector(
                    'input[name="telefono"]'
                );


            const correo =
                formAdopcion.querySelector(
                    'input[name="correo"]'
                );


            const motivo =
                formAdopcion.querySelector(
                    'textarea[name="motivo"]'
                );


            if (
                nombre.value.trim().length < 3 ||
                motivo.value.trim().length < 10
            ) {

                alert(
                    "Completa correctamente todos los campos."
                );

                return;
            }


            const solicitudes =
                JSON.parse(
                    localStorage.getItem(
                        "petShelterSolicitudes"
                    )
                ) || [];


            solicitudes.push({

                id: Date.now(),

                mascota:
                    nombreMascota.textContent,

                nombre:
                    nombre.value.trim(),

                telefono:
                    telefono.value.trim(),

                correo:
                    correo.value.trim(),

                motivo:
                    motivo.value.trim(),

                fecha:
                    new Date().toLocaleString()

            });


            localStorage.setItem(
                "petShelterSolicitudes",
                JSON.stringify(solicitudes)
            );


            alert(
                `✅ Solicitud enviada para ${nombreMascota.textContent}.`
            );


            cerrarFormulario();

        }
    );
}


// ======================================================
// EVENTOS BUSCADOR
// ======================================================

if (buscador) {

    buscador.addEventListener(
        "input",
        mostrarMascotas
    );
}


if (filtroTipo) {

    filtroTipo.addEventListener(
        "change",
        mostrarMascotas
    );
}


if (ordenMascotas) {

    ordenMascotas.addEventListener(
        "change",
        mostrarMascotas
    );
}


// ======================================================
// CERRAR MODAL AL HACER CLICK AFUERA
// ======================================================

if (modalAdopcion) {

    modalAdopcion.addEventListener(
        "click",
        event => {

            if (
                event.target === modalAdopcion
            ) {

                cerrarFormulario();

            }

        }
    );
}


// ======================================================
// INICIO
// ======================================================

mostrarMascotas();

cargarAPI();