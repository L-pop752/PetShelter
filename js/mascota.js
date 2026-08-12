// =====================================
// VENTANA MODAL: FORMULARIO DE ADOPCIÓN
// =====================================
const modal = document.getElementById('modalAdopcion');
const nombreMascotaSpan = document.getElementById('nombreMascota');

// Función que abre el formulario con el nombre de la mascota
function mostrarFormulario(nombreMascota) {
    modal.style.display = 'flex';  // Mostrar ventana
    nombreMascotaSpan.textContent = nombreMascota;
}

// Función que cierra el formulario
function cerrarFormulario() {
    modal.style.display = 'none';
}

// Cerrar si se hace clic fuera del contenido del modal
window.addEventListener('click', function(evento) {
    if (evento.target === modal) {
        cerrarFormulario();
    }
});

// =====================================
// MANEJAR ENVÍO DEL FORMULARIO DE ADOPCIÓN
// =====================================
const formularioAdopcion = document.getElementById('formAdopcion');

formularioAdopcion.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue
    alert('✅ ¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.');
    cerrarFormulario();
    formularioAdopcion.reset(); // Limpia el formulario
});

// ============================================
// API DE MASCOTAS - THE DOG API
// ============================================

const API_MASCOTAS =
    "https://api.thedogapi.com/v1/images/search?limit=12";

const API_KEY = "live_GEo7GpRdKpfKsbNk2YtryaJWcioc2buzMmbh6iibbr3HcNZI1FtZJnvAGJvLDSAZ"


// ============================================
// CARGAR MASCOTAS
// ============================================

async function cargarMascotas() {
    // Buscamos el contenedor que ya tienes en mascotas.html

    const contenedor = document.querySelector(".mascotas-grid");

    try {

        // Mensaje mientras carga

        contenedor.innerHTML = `
            <p class="mensaje-cargando">
                🐾 Cargando mascotas...
            </p>
        `;


        // ========================================
        // HACEMOS LA PETICIÓN A LA API
        // ========================================

        const respuesta = await fetch(API_MASCOTAS, {
            headers: { "x-api-key": API_KEY },
        });

        // Comprobamos que la respuesta sea correcta

        if (!respuesta.ok) {
            throw new Error("No se pudo conectar con la API");
        }


        // Convertimos la respuesta a JSON

        const mascotas = await respuesta.json();


        // Limpiamos el mensaje de carga

        contenedor.innerHTML = "";


        // ========================================
        // RECORREMOS LAS MASCOTAS
        // ========================================

        mascotas.forEach((mascota, index) => {


            // ------------------------------------
            // OBTENER LA RAZA
            // ------------------------------------

            let raza = "Perro";


            if (
                mascota.breeds &&
                mascota.breeds.length > 0
            ) {

                raza = mascota.breeds[0].name;

            }


            // ------------------------------------
            // NOMBRES PARA LAS MASCOTAS
            // ------------------------------------

            const nombres = [
                "Max",
                "Luna",
                "Rocky"
            ];

            const nombre = nombres[index] || "Amigo";


            // ------------------------------------
            // EDADES
            // ------------------------------------

            const edades = [
                "2 años",
                "1 año",
                "4 años"
            ];

            const edad = edades[index] || "2 años";


            // ------------------------------------
            // PERSONALIDADES
            // ------------------------------------

            const personalidades = [

                "Juguetón, cariñoso y muy fiel",

                "Tranquila, tierna y le gusta dormir al sol",

                "Protector, tranquilo y compañero ideal"

            ];

            const personalidad =
                personalidades[index] ||
                "Cariñoso y amigable";


            // ====================================
            // CREAR TARJETA
            // ====================================

            const tarjeta =
                document.createElement("div");

            tarjeta.classList.add(
                "tarjeta-mascota"
            );


            // ====================================
            // CONTENIDO DE LA TARJETA
            // ====================================

            tarjeta.innerHTML = `

                <img
                    src="${mascota.url}"
                    alt="Foto de ${nombre}"
                >

                <h3>
                    ${nombre} 🐶
                </h3>

                <p>
                    <strong>Edad:</strong>
                    ${edad}
                </p>

                <p>
                    <strong>Especie:</strong>
                    Perro
                </p>

                <p>
                    <strong>Raza:</strong>
                    ${raza}
                </p>

                <p>
                    <strong>Personalidad:</strong>
                    ${personalidad}
                </p>

                <button
                    class="boton boton-adoptar"
                    onclick="mostrarFormulario('${nombre}')"
                >
                    ¡Quiero adoptar!
                </button>

            `;


            // ====================================
            // AGREGAR TARJETA A LA PÁGINA
            // ====================================

            contenedor.appendChild(tarjeta);

        });


    } catch (error) {

        // ========================================
        // SI OCURRE UN ERROR
        // ========================================

        console.error(
            "Error al cargar las mascotas:",
            error
        );


        contenedor.innerHTML = `

            <p class="mensaje-error">
                ❌ No se pudieron cargar las mascotas.
                <br>
                Intenta nuevamente.
            </p>

        `;

    }

}


// ============================================
// EJECUTAR CUANDO CARGUE LA PÁGINA
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    cargarMascotas
);