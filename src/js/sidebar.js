export class Sidebar {
    constructor() {
        this.sidebarFold = document.querySelector('.js-sidebar-fold');
        this.sidebarToggle = document.querySelector('.js-sidebar-toggle');
        this.startDragover = false;
    }

    run() {
        this.setupToggle();
        this.setupDragAndDrop();
    }

    setupToggle() {
        this.sidebarToggle.addEventListener('click', () => {
            this.sidebarFold.classList.toggle('active');
        });
    }

    setupDragAndDrop() {
        const sidebarLi = this.sidebarFold.querySelector('.js-sidebar-li');
        const sidebarLiList = sidebarLi.querySelectorAll('li');

        sidebarLiList.forEach(sdLi => {
            sdLi.addEventListener('click', () => {
                console.log('Происходит всплывание или создание блока, который был скрыт.');
            });

            sdLi.addEventListener('dragstart', (e) => this.handleDragStart(e, sdLi));
            sdLi.addEventListener('dragend', (e) => this.handleDragEnd(e, sdLi));
        });

        sidebarLi.addEventListener('dragover', (e) => this.initSortableList(e, sidebarLi));
        sidebarLi.addEventListener('dragenter', e => e.preventDefault());
    }

    handleDragStart(e, sdLi) {
        this.startDragover = true;
        setTimeout(() => sdLi.classList.add('dragging'), 0);
    }

    handleDragEnd(e, sdLi) {
        this.startDragover = false;
        sdLi.classList.remove('dragging');
    }

    initSortableList(e, sidebarLi) {
        if (this.startDragover) {
            e.preventDefault();
            const draggingItem = sidebarLi.querySelector('.dragging');
            const siblings = [...sidebarLi.querySelectorAll('li:not(.dragging)')];

            const nextSibling = siblings.find(sibling => {
                return e.clientY < sibling.getBoundingClientRect().top + sibling.offsetHeight / 2;
            });

            sidebarLi.insertBefore(draggingItem, nextSibling || null);
        }
    }
}
