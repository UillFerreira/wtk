export function tMenu (param) {
    this.classType  = "tMenu";
    // Parameters default values
    this.display    = "horizontal";
    this.list       = [];
    this._content   = document.getElementById("content");
    // parameters received
    if (param.display) this.display = param.display;
    if (param.list) this.list = param.list;
    if (param.content) this._content = param.content;
    // Set css
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = "/wtk/css/tMenu.css";
    document.head.appendChild(link);

    this._createMenu();
}
tMenu.prototype     = Object.create({});
tMenu.constructor   = tMenu;

tMenu.prototype._createMenu = function () {
    this._ul = document.createElement("ul");
    this._ul.setAttribute("class", this.display);
    this._content.appendChild(this._ul);

    let li = this._menuList();
}
// Passa por todos os itens da lista e adiciona no menu
tMenu.prototype._menuList = function () {
    for (let i = 0; i < this.list.length; i++) {
        this._addList(this.list[i]);
    }
}
// Cria os elementos no menu
tMenu.prototype._addList = function (i) {
    let li  = document.createElement("li");
    let a   = document.createElement("a");
    a.setAttribute("href", "javascript:void(0)");
    if (i["name"] != undefined ) {
        a.innerText = i["name"];
    } else {
        a.innerText = "<Nameless>";
    }
    if (i["float"] != undefined && i["float"] == "right" && this.display == "horizontal") {
        li.setAttribute("style", "float:right");
    }
    if (i["callback"] != undefined && typeof i["callback"] == "function") {
        li.addEventListener("click", function () {
            // Remove tudo da div content para colocar os novos elementos
            let t = document.getElementById("content");
            if (t != null) {
                while (t.hasChildNodes()) {
                    t.removeChild(t.lastChild);
                }
            }
            // Chama a função que vai criar os elementos na tela
            i["callback"]();
        });
    }
    li.appendChild(a);
    this._ul.appendChild(li);
}
// Adiciona um item na lista e cria a entrada do elemento no menu
tMenu.prototype.addItem = function (item) {
    if (item != undefined && typeof item == "object") {
        this.list.push(item);
        this._addList(item);
    }
}
console.log("Init menu");
