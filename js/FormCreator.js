export class FormCreator {
    #createInput (line) {
        let input;
        switch(line["type"]) {
            case "textarea":
                const r = (line["rows"] == undefined ? 3 : line["rows"]);
                input = document.createElement("textarea");
                input.setAttribute("rows", r);
                input.classList.add("form-control");
                break;
            case "date":
                input = document.createElement("input");
                input.classList.add("form-control");
                input.type = "date";
                
                break;
            case "text":
            default:
                input = document.createElement("input");
                input.classList.add("form-control");
                input.type = "text";
            break;
        }
        // placeholder
        const plcholder = (line["placeholder"] == undefined ? "" : line["placeholder"]);
        input.placeholder = plcholder;
        // required
        if (line["required"] == true) input.setAttribute("required", "");
        // Precisa por conta dos label
        input.id = `input-${line["caption"]}`;
        // tratar os callbacks dos campos
        if (line["onChange"] != undefined && typeof line["onChange"] == "function") {
            input.addEventListener("change", line["onChange"].bind(this));
        }
        if (line["onKeyPress"] != undefined && typeof line["onKeyPress"] == "function") {
            input.addEventListener("keyup", line["onKeyPress"].bind(this));
        }
        if (line["pattern"] != undefined) input.pattern = line["pattern"];
        if (line["title"] != undefined) input.title = line["title"];
        return input;
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
            console.log(this);
            // Função para criar os inputs 
            const input = this.#createInput(line);
            // Append elements
            col.appendChild(label);
            col.appendChild(input);
            row.appendChild(col);
        });
        
        return section;        
    }
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
}
