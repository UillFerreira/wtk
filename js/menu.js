export function tMenu (param) {
    this.classType  = "menu";
    // Parameters
    this.display    = "horizontal";
    this.list       = [];
    this._content   = document.getElementById("content");
    // parameters received
    if (param.display) this.display = param.display;
    if (param.list) this.list = param.list;
    // Set css
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = "/wtk/css/tMenu.css";
    document.head.appendChild(link);

    this.createMenu();
}
tMenu.prototype.createMenu = function () {
    var ul = document.createElement("ul");
    ul.setAttribute("class", this.display);
    console.log(ul);
    this._content.appendChild(ul);

    let li = this.menuList(ul);
}

tMenu.prototype.menuList = function (ul) {
    for (let i = 0; i < this.list.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        if (this.list[i]["name"] != undefined ) {
            a.innerText = this.list[i]["name"];
        } else {
            a.innerText = i;
        }
        if (this.list[i]["float"] != undefined && this.list[i]["float"] == "right" && this.display == "horizontal") {
            li.setAttribute("style", "float:right");
        }
        if (this.list[i]["callback"] != undefined && typeof this.list[i]["callback"] == "function") {
            li.addEventListener("click", this.list[i]["callback"]);
        }
        li.appendChild(a);
        ul.appendChild(li);
        
    }
}
console.log("Init menu");
