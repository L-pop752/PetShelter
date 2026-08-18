// =====================================================
// PETSHELTER - MASCOTAS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const listaMascotas = document.getElementById("listaMascotas");
    const modalAdopcion = document.getElementById("modalAdopcion");
    const nombreMascota = document.getElementById("nombreMascota");
    const formAdopcion = document.getElementById("formAdopcion");
    const cerrarModal = document.getElementById("cerrarModal");

    // -------------------------------------------------
    // Datos de mascotas
    // -------------------------------------------------

    const mascotas = [
        {
            id: 1,
            nombre: "Max",
            tipo: "Perro",
            edad: "2 años",
            descripcion: "Cariñoso y juguetón.",
            imagen:
                "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80"
        },

        {
            id: 2,
            nombre: "Rocky",
            tipo: "Perro",
            edad: "3 años",
            descripcion: "Amigable, tranquilo y muy noble.",
            imagen:
                "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80"
        },

        {
            id: 3,
            nombre: "Luna",
            tipo: "Perra",
            edad: "1 año",
            descripcion: "Dulce, cariñosa y llena de energía.",
            imagen:
                "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80"
        }
    ];


    // -------------------------------------------------
    // Cargar mascotas
    // -------------------------------------------------

    function cargarMascotas() {

        if (!listaMascotas) {
            return;
        }

        listaMascotas.innerHTML = "";

        mascotas.forEach((mascota) => {

            const tarjeta = document.createElement("div");

            tarjeta.className = "col-md-6 col-lg-4";


            tarjeta.innerHTML = `
                <article class="pet-card">

                    <div class="pet-card-image">

                        <img
                            src="${mascota.imagen}"
                            alt="${mascota.nombre}, ${mascota.tipo} de ${mascota.edad}"
                            loading="lazy">

                        <span class="pet-status">
                            Disponible
                        </span>

                    </div>


                    <div class="pet-card-content">

                        <h2>
                            ${mascota.nombre} 🐾
                        </h2>

                        <p class="pet-card-info">
                            ${mascota.tipo} · ${mascota.edad}
                        </p>

                        <p>
                            ${mascota.descripcion}
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary w-100 btn-adoptar"
                            data-mascota="${mascota.nombre}">

                            ¡Quiero adoptarlo!

                        </button>

                    </div>

                </article>
            `;


            listaMascotas.appendChild(tarjeta);

        });

    }


    // -------------------------------------------------
    // Abrir modal
    // -------------------------------------------------

    function abrirModal(nombre) {

        if (!modalAdopcion || !nombreMascota) {
            return;
        }

        nombreMascota.textContent = nombre;

        modalAdopcion.style.display = "flex";

        document.body.style.overflow = "hidden";

    }


    // -------------------------------------------------
    // Cerrar modal
    // -------------------------------------------------

    function cerrarFormulario() {

        if (!modalAdopcion) {
            return;
        }

        modalAdopcion.style.display = "none";

        document.body.style.overflow = "";

        if (formAdopcion) {
            formAdopcion.reset();
        }

    }


    // -------------------------------------------------
    // Botones de adopción
    // -------------------------------------------------

    if (listaMascotas) {

        listaMascotas.addEventListener("click", (evento) => {

            const boton = evento.target.closest(".btn-adoptar");

            if (!boton) {
                return;
            }

            const nombre = boton.dataset.mascota;

            abrirModal(nombre);

        });

    }


    // -------------------------------------------------
    // Botón cerrar
    // -------------------------------------------------

    if (cerrarModal) {

        cerrarModal.addEventListener(
            "click",
            cerrarFormulario
        );

    }


    // -------------------------------------------------
    // Cerrar haciendo clic fuera
    // -------------------------------------------------

    if (modalAdopcion) {

        modalAdopcion.addEventListener("click", (evento) => {

            if (evento.target === modalAdopcion) {
                cerrarFormulario();
            }

        });

    }


    // -------------------------------------------------
    // Cerrar con ESC
    // -------------------------------------------------

    document.addEventListener("keydown", (evento) => {

        if (
            evento.key === "Escape" &&
            modalAdopcion &&
            modalAdopcion.style.display === "flex"
        ) {

            cerrarFormulario();

        }

    });


    // -------------------------------------------------
    // Formulario de adopción
    // -------------------------------------------------

    if (formAdopcion) {

        formAdopcion.addEventListener("submit", (evento) => {

            evento.preventDefault();

            const mascota = nombreMascota
                ? nombreMascota.textContent
                : "la mascota";

            alert(
                `✅ ¡Solicitud enviada para adoptar a ${mascota}! Nos pondremos en contacto contigo pronto.`
            );

            cerrarFormulario();

        });

    }


    // -------------------------------------------------
    // Inicializar
    // -------------------------------------------------

    cargarMascotas();

});