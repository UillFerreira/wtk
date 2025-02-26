export class tMenu {
    constructor(items) {
        this.active = {};
        this.items = items; // Array de itens do menu
        this.content = content;
        this.createNav(document.body);
    } 

    createNav (content) {
        const nav = document.createElement('nav');
        nav.className = 'navbar navbar-default navbar-static-top';

        // Cria o container
        const container = document.createElement('div');
        container.className = 'container-fluid';
        nav.appendChild(container);

        // Cria o cabeçalho do navbar
        const navbarHeader = document.createElement('div');
        navbarHeader.className = 'navbar-header';
        container.appendChild(navbarHeader);        

        // Cria o botão de toggle
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'navbar-toggle collapsed';
        toggleButton.setAttribute('data-toggle', 'collapse');
        toggleButton.setAttribute('aria-expanded', 'false');
        navbarHeader.appendChild(toggleButton);

        // Cria o wrapper colapsável
        const collapseWrapper = document.createElement('div');
        collapseWrapper.className = 'collapse navbar-collapse';
        container.appendChild(collapseWrapper);        

        // Cria a lista de itens à esquerda
        const leftNav = document.createElement('ul');
        leftNav.className = 'nav navbar-nav';
        collapseWrapper.appendChild(leftNav);        
        this.#addToList(leftNav);
        // O prepend coloca o elemento no topo em relação ao outros elementos filhos
        content.prepend(nav);
    }

    #addToList(ul) {
        let s = this;
        this.items.forEach(function(i) {
            const li = document.createElement('li');
            if (i.active) {
                li.classList.add('active');
                s.active.element = li;
                s.active.onExit = i.onExit;
            }
            // Cria um item de menu normal
            const link = document.createElement('a');
            link.textContent = i.text;
            link.style.cursor = 'pointer';
            link.style.userSelect = 'none';
            if (i.callback != undefined) {
                // Cria o manipulador de eventos com acesso ao item e ao callback
                link.addEventListener("click", s.#setActive(i.callback, i.onExit, li, s));
            }
            li.appendChild(link);            
            ul.appendChild(li);
        });
    }
    // Função de controle do elemento ativo
    #setActive (callback, exit, li, s) {
        return function () {
            // Chama um callback de saida do elemento anterior. Pode ser usado para apagar os elementos que foram criados
            if (s.active.onExit != undefined) s.active.onExit();
            // Arualiza as variaveis que controlam o elemento ativo no menu
            if (li != s.active.element) {
                li.className = 'active';
                // Remove a classe active do elemento anterior
                s.active.element.className = '';
                // Atualiza o json de elemento ativo
                s.active.element = li;
                s.active.onExit = exit;
            }
            // Callback da chamada do item no menu
            callback ();
        }
    }
}
