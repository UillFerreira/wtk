export class buttonCreator {
    #visible_status = true;
    #btn_elmts      = undefined;
    #items          = [];
    
    #createButtons (items) {
        const row = document.createElement("div");
        row.setAttribute("class", "btn-group btn-group-lg");
        this.#items.forEach((line, index) => {
            const btn       = document.createElement("button");
            btn.innerText   = line["caption"];
            btn.setAttribute("class", line["class"]);
            this.content.appendChild(row);
            btn.addEventListener("click", line["onClick"]);
            this.#items[index]["elm"] = btn;
            row.appendChild(btn);

        });
        this.#btn_elmts = row;
    }
    #destroy () {
        this.#btn_elmts.replaceChildren();
    }
    set disable (name) {
        const l = this.#items.filter(i => i.caption == name);
        if (l.length == 0) {
            console.error("No button matching that name was found.");
            return;
        }
        l[0]["elm"].classList.add("disabled");
    }
    set enable (name) {
        const l = this.#items.filter(i => i.caption == name);
        if (l.length == 0) {
            console.error("No button matching that name was found.");
            return;
        }
        l[0]["elm"].classList.remove("disabled");
    }
    
    set visible(value) {
        if (value == false && this.#visible_status == true) this.#destroy();
        if (value == true && this.#visible_status == false) this.#createButtons();
        this.#visible_status = value;
    }
    constructor(list, content) {
        this.#items = list;
        this.content = content;
        this.#createButtons(list, content);
    }
}
