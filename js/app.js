// ======================================================
// PETSHELTER - JAVASCRIPT GENERAL
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // MODO OSCURO
    // ==================================================

    const btnModoOscuro = document.getElementById("btnModoOscuro");

    const modoGuardado = localStorage.getItem("petShelterModoOscuro");

    if (modoGuardado === "true") {
        document.body.classList.add("dark-mode");

        if (btnModoOscuro) {
            btnModoOscuro.textContent = "☀️";
        }
    }

    if (btnModoOscuro) {

        btnModoOscuro.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const activo =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "petShelterModoOscuro",
                activo
            );

            btnModoOscuro.textContent =
                activo ? "☀️" : "🌙";
        });
    }


    // ==================================================
    // FORMULARIO DE CONTACTO
    // ==================================================

    const formularioContacto =
        document.getElementById("formContacto");

    if (formularioContacto) {

        formularioContacto.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const nombre =
                    document.getElementById("nombre");

                const correo =
                    document.getElementById("correo");

                const mensaje =
                    document.getElementById("mensaje");


                if (nombre.value.trim().length < 3) {

                    mostrarMensaje(
                        "El nombre debe tener mínimo 3 caracteres.",
                        "danger"
                    );

                    nombre.focus();

                    return;
                }


                if (mensaje.value.trim().length < 10) {

                    mostrarMensaje(
                        "El mensaje debe tener mínimo 10 caracteres.",
                        "danger"
                    );

                    mensaje.focus();

                    return;
                }


                const mensajes =
                    JSON.parse(
                        localStorage.getItem(
                            "petShelterMensajes"
                        )
                    ) || [];


                mensajes.push({

                    id: Date.now(),

                    nombre: nombre.value.trim(),

                    correo: correo.value.trim(),

                    mensaje: mensaje.value.trim(),

                    fecha: new Date().toLocaleString()

                });


                localStorage.setItem(
                    "petShelterMensajes",
                    JSON.stringify(mensajes)
                );


                formularioContacto.reset();


                mostrarMensaje(
                    "✅ Mensaje guardado correctamente. Te responderemos pronto.",
                    "success"
                );

            }
        );
    }


    // ==================================================
    // CONTADOR
    // ==================================================

    const contador =
        document.getElementById("contadorMensajes");

    if (contador) {

        const mensajes =
            JSON.parse(
                localStorage.getItem(
                    "petShelterMensajes"
                )
            ) || [];

        contador.textContent = mensajes.length;
    }

});


// ======================================================
// TOAST / MENSAJE
// ======================================================

function mostrarMensaje(mensaje, tipo = "success") {

    let contenedor =
        document.getElementById("mensajeSistema");

    if (!contenedor) {

        contenedor =
            document.createElement("div");

        contenedor.id = "mensajeSistema";

        contenedor.className =
            "position-fixed top-0 end-0 p-3";

        contenedor.style.zIndex = "3000";

        document.body.appendChild(contenedor);
    }


    const toast =
        document.createElement("div");

    toast.className =
        `alert alert-${tipo} shadow`;

    toast.setAttribute("role", "alert");

    toast.textContent = mensaje;


    contenedor.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 4000);
}