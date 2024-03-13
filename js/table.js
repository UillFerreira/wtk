/*
<table border="1" summary="">
    <caption><em>Test table</em></caption>

    <tr><th rowspan="2"><th colspan="2">Average
        <th rowspan="2">Green<br>eyes

    <tr>
        <th>height</th>
        <th>weight</th>
    </tr>
    <tr>
        <th>males</th>
        <td>183cm</td>
        <td>65kg</td>
        <td>40%</td>
    </tr>
    <tr>
        <th>females</th>
        <td>170cm</td>
        <td>54kg</td>
        <td>35%</td>
    </tr>
</table>
*/
export function tTable (param) {
    this.classType  = "tTable";
    // Parameters default values
    this._content   = document.getElementById("content");
    // parameters received
    if (param.list) this.list = param.list;
    if (param.header) this.header = param.header;
    if (param.content) this._content = param.content;
    if (param.caption) this.caption = param.caption;
    // Set css
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = "/wtk/css/tTable.css";
    document.head.appendChild(link);
    // Cria a tabela
    this._createTable();
    this._createTh();
    this._createRow();
}
tTable.prototype     = Object.create({});
tTable.constructor   = tTable;
// Precisa enviar o novo valor da coluna e qual será a chave de comparação, para poder fazer a atualização da linha.
tTable.prototype.updateRow = function (row, key) {
    for (let i = 0; i < this.list.length; i++) {
        if (this.list[i][key] == row[key]) {
            console.log("UPDATE");
            this.list[i] = row;
            this._updateElmRow(row, key);
        }
    }
}
tTable.prototype._updateElmRow = function (row, key) {
    let header = this._table.rows[0].children;
    let cln;

    rows: for (let i = 1; i < this._table.rows.length; i++) {
        // pega cada coluna da linha
        cln = this._table.rows[i].children;
        hdr: for (let k = 0; k < header.length; k++) {
            if (header[k].textContent != key) continue hdr;
            cols: for (let c = 0; c < cln.length; c++) {
                if (cln[k].textContent == row[key]) {
                    if (cln[c].textContent != "") {
                        cln[c].textContent = row[header[c].textContent];
                    }
                }
            }
        }

    }
}
tTable.prototype._createTable = function () {
    this._table = document.createElement("table");
    this._table.setAttribute("class", "tTable");
    this._content.appendChild(this._table);
}
tTable.prototype._addBtn = function (row, name) {
    let s = this;
    let btn = document.createElement("button");
    btn.addEventListener("click", row[name]["callback"].bind(row, this));
    btn.innerText = name;
    return btn;
}
tTable.prototype._addIcon = function (row, name) {
    //<i class="bi-alarm"></i>
    console.log(row);
    let icon = document.createElement("icon");  
    //icon.setAttribute("class", "bi bi-filetype-pdf");
    icon.setAttribute("class", row[name]["icon"]);
    icon.addEventListener("click", row[name]["callback"].bind(row, this));
    return icon;
}
tTable.prototype._createTd = function (row) {
    let tr = document.createElement("tr");
    let td;
    for (let j = 0; j < this.header.length; j++) {
        td = document.createElement("td");
        if (typeof row[this.header[j]] === "object") {
            if (row[this.header[j]]["icon"] != undefined) {
                td.appendChild(this._addIcon(row, this.header[j]));
            } else {
                td.appendChild(this._addBtn(row, this.header[j]));
            }
        } else {
            td.innerText = row[this.header[j]];
        }
        tr.appendChild(td);
    }
    this._table.appendChild(tr);
}
tTable.prototype._createRow = function () {
    if (this.list == undefined || this.list.length == 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerText = "Sem dados";
        this._table.appendChild(tr);
    } else {
        for (let i = 0; i < this.list.length; i++) {
            this._createTd(this.list[i]);
        }
    }
}
tTable.prototype._createTh = function () {
    if (this.caption != undefined) {
        let cap = document.createElement("caption");
        let em = document.createElement("em");
        em.innerText = this.caption;
        cap.appendChild(em);
        this._table.appendChild(cap);
    }
    let tr = document.createElement("tr");
    let th;
    if (this.header != undefined) {
        for (let i = 0; i < this.header.length; i++) {
            th = document.createElement("th");
            th.innerText = this.header[i];
            tr.appendChild(th);
        }
    } else {
            th = document.createElement("th");
            th.innerText = "Não definido";
            tr.appendChild(th);
    }
    this._table.appendChild(tr);
}
