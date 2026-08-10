// =====================================
// MENÚ DESPLEGABLE EN MÓVILES
// =====================================
const menuNavegacion = document.getElementById('menuNav');

// =====================================
// MANEJAR ENVÍO DEL FORMULARIO DE CONTACTO
// =====================================
const formularioContacto = document.getElementById('formContacto');

formularioContacto.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ ¡Mensaje enviado! Gracias por escribirnos. Te responderemos pronto.');
    formularioContacto.reset();
});

// =====================================
// CERRAR MENÚ AL HACER CLIC EN UN ENLACE
// =====================================
const enlaces = menuNavegacion.querySelectorAll('a');
enlaces.forEach(enlace => {
    enlace.addEventListener('click', function() {
        if (window.innerWidth <= 600) {
            menuNavegacion.classList.remove('activo');
        }
    });
});

