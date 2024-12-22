document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const nav = document.querySelector('nav-component');

    // Manejo de navegación
    nav.addEventListener('navigation', (event) => {
        const { page } = event.detail;

        // Ocultar todos los componentes primero
        document.querySelectorAll('project-list, participant-list, project-form, participant-form').forEach(el => {
            el.style.display = 'none';
        });

        // Mostrar el componente correspondiente
        switch (page) {
            case 'projects':
                document.querySelector('project-list').style.display = 'block';
                break;
            case 'participants':
                document.querySelector('participant-list').style.display = 'block';
                break;
        }
    });

    // Manejo de creación de nuevos formularios
    main.addEventListener('mostrar-formulario-project', () => {
        const existingForm = document.querySelector('project-form');
        if (!existingForm) {
            const form = document.createElement('project-form');
            main.appendChild(form);
        }
    });

    main.addEventListener('mostrar-formulario-participant', () => {
        const existingForm = document.querySelector('participant-form');
        if (!existingForm) {
            const form = document.createElement('participant-form');
            main.appendChild(form);
        }
    });

    // Recargar listas tras guardar proyectos o participantes
    main.addEventListener('project-saved', () => {
        const projectList = document.querySelector('project-list');
        if (projectList) projectList.fetchData();
    });

    main.addEventListener('participant-saved', () => {
        const participantList = document.querySelector('participant-list');
        if (participantList) participantList.fetchData();
    });

    // Capturar evento para editar proyectos
    main.addEventListener('editar-proyecto', (event) => {
        let form = document.querySelector('project-form');
        if (!form) {
            form = document.createElement('project-form');
            main.appendChild(form);
        }
        form.setProjectData(event.detail); // Llenar el formulario con los datos del proyecto
    });

    // Capturar evento para editar participantes
    main.addEventListener('editar-participante', (event) => {
        let form = document.querySelector('participant-form');
        if (!form) {
            form = document.createElement('participant-form');
            main.appendChild(form);
        }
        form.setParticipantData(event.detail); // Llenar el formulario con los datos del participante
    });
});