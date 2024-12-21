class NavMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback = () => {
        this.render();
        this.addEventListeners();
    }

    render = () => {
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: #34495e;
                    padding: 1rem;
                }
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    gap: 1rem;
                }
                a {
                    color: white;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                }
                a:hover {
                    background-color: #2c3e50;
                    border-radius: 4px;
                }
                .active {
                    background-color: #2c3e50;
                    border-radius: 4px;
                }
            </style>
            <nav>
                <ul>
                    <li><a href="#projects" class="active">Proyectos</a></li>
                    <li><a href="#participants">Participantes</a></li>
                    <li><a href="#assignments">Asignaciones</a></li>
                </ul>
            </nav>
        `;
    }

    addEventListeners = () => {
        const links = this.shadowRoot.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                links.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                this.dispatchEvent(new CustomEvent('navigation', {
                    detail: { page: e.target.getAttribute('href').substring(1) },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }
}

customElements.define('nav-menu', NavMenu);
