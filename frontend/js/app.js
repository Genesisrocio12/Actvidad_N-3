class AppManager {
    constructor() {
        this.currentView = 'projects';
        this.mainContainer = document.querySelector('main');
        this.init();
    }

    init() {
        document.addEventListener('navigation', this.handleNavigation.bind(this));
        this.renderCurrentView();
    }

    handleNavigation(event) {
        const { page } = event.detail;
        this.currentView = page;
        this.renderCurrentView();
    }

    renderCurrentView() {
        this.mainContainer.innerHTML = '';
        if (this.currentView === 'projects') {
            this.renderProjectsView();
        } else if (this.currentView === 'participants') {
            this.renderParticipantsView();
        }
    }

    renderProjectsView() {
        const projectForm = document.createElement('project-form');
        const projectList = document.createElement('project-list');
        this.mainContainer.append(projectForm, projectList);
    }

    renderParticipantsView() {
        const participantForm = document.createElement('participant-form');
        const participantList = document.createElement('participant-list');
        this.mainContainer.append(participantForm, participantList);
    }
}

document.addEventListener('DOMContentLoaded', () => new AppManager());
