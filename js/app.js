// =====================================
// PETSHELTER - JAVASCRIPT GENERAL
// =====================================


// =====================================
// FORMULARIO DE CONTACTO
// =====================================

const formularioContacto = document.getElementById("formContacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "✅ ¡Mensaje enviado! Gracias por escribirnos. Te responderemos pronto."
        );

        formularioContacto.reset();
    });
}