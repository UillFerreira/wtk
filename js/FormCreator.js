export class FormCreator {
    constructor(template, content) {
        console.log("Foi", template);
        content.appendChild(this.#createForm(template));
        /*
        {
            "title" : "Procedimento",
            "fields" : [
                {"col-xs": 4, "col-sm": 4, "col-md": 4, "col-lg": 4, "type": "text", "caption": "Nome", "placeholder": "Nome do procedimento", "onChange": cbk, "onKeyPress": cbkk},
                {"col-xs": 4, "col-sm": 4, "col-md": 4, "col-lg": 4, "type": "textarea", "caption": "Descricão", "placeholder": "Nome do procedimento"},
                {"col-xs": 4, "col-sm": 4, "col-md": 4, "col-lg": 4, "type": "text", "caption": "Código", "placeholder": "Nome do procedimento", "required": true, "validation": vld}
            ]
        }
        */
    }

    #createForm(template) {
        const section = document.createElement("div");
        section.classList.add("bs-docs-section");
        
        const title = document.createElement("h2");
        title.textContent = template["title"];
        section.appendChild(title);
        
        const row = document.createElement("div");
        row.classList.add("row");
        section.appendChild(row);
        
        
        template["fields"].forEach((line, index) => {
            // Tamanho das colunas para todos os tamanhos de dispositivos
            const col = document.createElement("div");
            if (line["col-xs"] != undefined) col.classList.add(`col-xs-${line["col-xs"]}`);
            if (line["col-sm"] != undefined) col.classList.add(`col-sm-${line["col-sm"]}`);
            if (line["col-md"] != undefined) col.classList.add(`col-md-${line["col-md"]}`);
            if (line["col-lg"] != undefined) col.classList.add(`col-lg-${line["col-lg"]}`);
            // Caption 
            const caption = (line["caption"] == undefined ? "" : line["caption"]);
            const label = document.createElement("label");
            label.setAttribute("for", `input-${caption}`);
            label.textContent = caption;

            const input = document.createElement("input");
            input.classList.add("form-control");
            input.id = `input-${line.caption}`;
            input.type = "text";
            input.dataset.var = line.caption;
            // Placeholder
            const plcholder = (line["placeholder"] == undefined ? "" : line["placeholder"]);
            input.placeholder = plcholder;
            
            col.appendChild(label);
            col.appendChild(input);
            row.appendChild(col);
        });
        
        return section;        
    }
}
