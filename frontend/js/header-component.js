class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #333;
                    color: white;
                    padding: 15px;
                    text-align: center;
                    font-size: 1.5em;
                    font-family: Arial, sans-serif;
                }
                nav {
                    margin-top: 10px;
                }
                a {
                    color: white;
                    text-decoration: none;
                    margin: 0 15px;
                    font-size: 1em;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <header>
                <div>Gestión de Proyectos</div>
                <nav>
                    <a href="#home">Inicio</a>
                    <a href="#projects">Proyectos</a>
                    <a href="#participants">Participantes</a>
                </nav>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);