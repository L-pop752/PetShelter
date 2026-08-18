// =====================================================
// PETSHELTER - JAVASCRIPT GENERAL
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // FORMULARIO DE CONTACTO
    // =================================================

    const formularioContacto =
        document.getElementById("formContacto");


    if (formularioContacto) {

        formularioContacto.addEventListener(
            "submit",
            (evento) => {

                evento.preventDefault();

                alert(
                    "✅ ¡Mensaje enviado! Gracias por escribirnos. Te responderemos pronto."
                );

                formularioContacto.reset();

            }
        );

    }


    // =================================================
    // MENÚ MÓVIL
    // =================================================

    const enlacesMenu =
        document.querySelectorAll(
            "#menuPrincipal .nav-link"
        );

    const menuPrincipal =
        document.getElementById("menuPrincipal");


    if (menuPrincipal && enlacesMenu.length > 0) {

        enlacesMenu.forEach((enlace) => {

            enlace.addEventListener("click", () => {

                if (
                    window.innerWidth < 992 &&
                    menuPrincipal.classList.contains("show")
                ) {

                    const botonMenu =
                        document.querySelector(
                            ".navbar-toggler"
                        );

                    if (botonMenu) {
                        botonMenu.click();
                    }

                }

            });

        });

    }

});