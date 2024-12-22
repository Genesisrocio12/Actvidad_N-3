class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: #34495e;
                    padding: 1rem;
                }
                ul {
                    list-style: none;
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
                .active {
                    background-color: #2c3e50;
                    border-radius: 4px;
                }
            </style>
            <nav>
                <ul>
                    <li><a href="projects" class="active">Proyectos</a></li>
                    <li><a href="participants">Participantes</a></li>
                </ul>
            </nav>
        `;
    }

    addEventListeners() {
        this.shadowRoot.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                this.shadowRoot.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
                this.dispatchEvent(new CustomEvent('navigation', {
                    detail: { page: link.getAttribute('href') },
                    bubbles: true,
                    composed: true,
                }));
            });
        });
    }
}

customElements.define('nav-component', NavComponent);
