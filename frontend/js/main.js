document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const nav = document.querySelector('nav-component');

    // Ocultar/mostrar componentes según la navegación
    nav.addEventListener('cambiar-vista', (event) => {
        const { vista } = event.detail;
        
        // Ocultar todos los componentes primero
        document.querySelector('project-list')?.style.display = 'none';
        document.querySelector('participant-list')?.style.display = 'none';
        document.querySelector('project-participant-list')?.style.display = 'none';
        document.querySelector('project-form')?.remove();
        document.querySelector('participant-form')?.remove();

        // Mostrar el componente seleccionado
        switch (vista) {
            case 'proyectos':
                document.querySelector('project-list').style.display = 'block';
                break;
            case 'participantes':
                document.querySelector('participant-list').style.display = 'block';
                break;
            case 'asignaciones':
                document.querySelector('project-participant-list').style.display = 'block';
                break;
        }
    });

    // Manejar eventos de formularios
    main.addEventListener('mostrar-formulario', () => {
        const form = document.createElement('project-form');
        main.appendChild(form);
    });

    main.addEventListener('mostrar-formulario-participante', () => {
        const form = document.createElement('participant-form');
        main.appendChild(form);
    });

    // Recargar listas después de guardar
    main.addEventListener('proyecto-guardado', () => {
        document.querySelector('project-form').remove();
        document.querySelector('project-list').fetchData();
    });

    main.addEventListener('participante-guardado', () => {
        document.querySelector('participant-form').remove();
        document.querySelector('participant-list').fetchData();
    });
});