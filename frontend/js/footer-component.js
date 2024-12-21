
// footer-component.js
class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            footer {
                background-color: #333;
                color: white;
                padding: 1rem;
                text-align: center;
                position: fixed;
                bottom: 0;
                width: 100%;
            }
            
            .footer-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .footer-links {
                display: flex;
                gap: 2rem;
            }
            
            a {
                color: white;
                text-decoration: none;
            }
            
            a:hover {
                text-decoration: underline;
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        const year = new Date().getFullYear();
        this.shadowRoot.innerHTML = `
            ${this.estilo.outerHTML}
            <footer>
                <div class="footer-content">
                    <div class="copyright">
                        © ${year} Sistema de Gestión de Proyectos
                    </div>
                    <div class="footer-links">
                        <a href="#about">Acerca de</a>
                        <a href="#contact">Contacto</a>
                        <a href="#help">Ayuda</a>
                    </div>
                </div>
            </footer>
        `;
    }
}

window.customElements.define('footer-component', FooterComponent);