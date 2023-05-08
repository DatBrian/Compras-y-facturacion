let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace(".js", '');

export default class myNav extends HTMLElement {
    static async components() {
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("Nav funcionando");
        this.addEventListener("prueba", this.handleEvent.bind(this));
    }

    handleEvent(e) {
        (e.type === "prueba") ? this.prueba()
            : undefined;
    }

    prueba() {
        console.log("SIIIIIIIIIII SIRVIOOOOOOOOOOOOOOO");
    }

    connectedCallback() {
        Promise.resolve(myNav.components()).then(html => {
            this.shadowRoot.innerHTML = html;
        });
    }
}

customElements.define(name, myNav);