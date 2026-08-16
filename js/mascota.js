const listaMascotas = document.getElementById('listaMascotas');
const modalAdopcion = document.getElementById('modalAdopcion');
const nombreMascota = document.getElementById('nombreMascota');
const formAdopcion = document.getElementById('formAdopcion');

// Datos de prueba (NO necesita internet ni API)
const mascotas = [
    { id:1, nombre:'Max', tipo:'Perro', edad:'2 años', descripcion:'Cariñoso y juguetón', imagen:'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80' },
    { id:2, nombre:'Rocky', tipo:'Perro', edad:'3 años', descripcion:'Amigable y tranquilo', imagen:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80' },
    { id:3, nombre:'Luna', tipo:'Perra', edad:'1 año', descripcion:'Dulce y muy cariñosa', imagen:'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80' }
];

// Cargar las mascotas
function cargarMascotas() {
    if (!listaMascotas) return;

    listaMascotas.innerHTML = '';
    mascotas.forEach(mascota => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'col-md-6 col-lg-4';
        tarjeta.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <img src="${mascota.imagen}" class="card-img-top" alt="${mascota.nombre}" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title">${mascota.nombre} 🐾</h3>
                    <p class="card-text text-primary fw-semibold">${mascota.tipo} · ${mascota.edad}</p>
                    <p class="card-text flex-grow-1">${mascota.descripcion}</p>
                    <button class="btn btn-primary w-100 mt-2" onclick="abrirModal('${mascota.nombre}')">¡Quiero adoptarlo!</button>
                </div>
            </div>
        `;
        listaMascotas.appendChild(tarjeta);
    });
}

// Abrir y cerrar modal
function abrirModal(nombre) {
    nombreMascota.textContent = nombre;
    modalAdopcion.style.display = 'flex';
}
function cerrarFormulario() {
    modalAdopcion.style.display = 'none';
    formAdopcion.reset();
}
window.onclick = e => {
    if (e.target === modalAdopcion) cerrarFormulario();
};

// Enviar formulario
formAdopcion.addEventListener('submit', e => {
    e.preventDefault();
    alert(`✅ ¡Solicitud enviada para adoptar a ${nombreMascota.textContent}! Nos pondremos en contacto pronto.`);
    cerrarFormulario();
});

// CARGAR AL INICIAR ✅
cargarMascotas();