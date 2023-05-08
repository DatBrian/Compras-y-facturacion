let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace(".js", "");

export default class mySection extends HTMLElement {
    static async components() {
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("Section funcionando");
    }

    handleEvent(e) {
        (e.type === "click") ? this.prueba()
            : undefined;
    }

    prueba(e) {
        console.log("click  ")
        const addToCartEvent = new CustomEvent("prueba", {
            detail: "hola",
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(addToCartEvent);
    }

    async loadData() {
        try {

            let ws = new Worker("components/mySection/wsMySection.js");
            ws.postMessage({ message: "api" });
            ws.onmessage = (e) => {
                let { message, data } = e.data;
                if (message === "plantilla") {
                    this.shadowRoot.querySelector(".container").insertAdjacentHTML("beforeend", e.data.data)
                    this.carButton = this.shadowRoot.querySelectorAll(".carButton");
                    console.log(this.carButton);
                    this.carButton.forEach(button => {
                        button.addEventListener("click", this.handleEvent.bind(this));
                    })
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    connectedCallback() {
        Promise.resolve(mySection.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.loadData();
        });
    }
}

customElements.define(name, mySection);