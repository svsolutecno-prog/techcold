/**
 * TechCold 24 - Main Control Unit
 */

// 1. Función para cargar componentes de forma asíncrona
async function loadComponent(id, fileName) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
        const response = await fetch(`src/components/${fileName}`);
        if (!response.ok) throw new Error(`Error al cargar ${fileName}`);
        const html = await response.text();
        container.innerHTML = html;

        // Reinicializar AOS para que detecte los nuevos elementos inyectados
        if (window.AOS) {
            AOS.refresh();
        }
    } catch (error) {
        console.error(`Component Loader Error: ${error}`);
    }
}

// 2. Inicialización cuando el DOM base está listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS con configuración global
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Cargar todas las secciones
    const components = [
        { id: 'header-comp', file: 'header.html' },
        { id: 'hero-comp', file: 'hero.html' },
        { id: 'empresa-comp', file: 'empresa.html' },
        { id: 'especialidades-comp', file: 'especialidades.html' },
        { id: 'servicios-comp', file: 'servicios.html' },
        { id: 'trabajos-comp', file: 'trabajos.html' },
        { id: 'contacto-comp', file: 'contacto.html' },
        { id: 'footer-comp', file: 'footer.html' }
    ];

    // Ejecutar la carga de todos los componentes
    components.forEach(comp => loadComponent(comp.id, comp.file));
});

// 3. Delegación de eventos (Para elementos que aún no existen en el DOM)
// Esto permite que el botón de menú funcione aunque se cargue después
document.addEventListener('click', (e) => {
    if (e.target.closest('#menu-toggle')) {
        const nav = document.querySelector('.nav-links');
        if (nav) nav.classList.toggle('hidden');
    }
});