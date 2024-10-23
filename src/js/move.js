import addZIndex from './addZIndex';

export class Move {
    constructor() {
        this.isDragging = false;
        this.windowActive = null;
        this.offset = {};
    }

    run(window) {
        let draggable = window.querySelector('.js-draggableMousemove');
        if (draggable) {
            draggable.addEventListener('mousedown', (e) => {
                this.windowActive = e.target.closest(".js-window");
                addZIndex(this.windowActive);

                this.draggableMousemove(e);

                // windowActive = draggableM.closest(".js-window");
                // draggableMousemoveTo2Click(draggableM, windowActive);
            });
        }
    }

    draggableMousemove(e) {
        this.isDragging = true;

        this.offset = {
            x: e.clientX - this.windowActive.getBoundingClientRect().left,
            y: e.clientY - this.windowActive.getBoundingClientRect().top
        };

        const moveHandler = (e) => this.moveButton(e);

        window.addEventListener('mousemove', moveHandler);

        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', moveHandler);
            this.isDragging = false;
        }, { once: true }); // Используем { once: true }, чтобы удалить обработчик после первого вызова
    }

    moveButton(e) {
        if (this.isDragging) {
            const newX = e.clientX - this.offset.x;
            const newY = e.clientY - this.offset.y;

            this.windowActive.style.left = Math.max(0, Math.min(window.innerWidth - this.windowActive.offsetWidth, newX)) + 'px';
            this.windowActive.style.top = Math.max(0, Math.min(window.innerHeight - this.windowActive.offsetHeight, newY)) + 'px';
        }
    }

    // не рабочий вариант
    draggableMousemoveTo2Click(draggableElem, windowActive) {
        draggableElem.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 2) {
                isDragging = true;
            }
        });

        draggableElem.addEventListener('mousedown', (e) => {
            if (isDragging) {
                offsetX = e.clientX - windowActive.getBoundingClientRect().left;
                offsetY = e.clientY - windowActive.getBoundingClientRect().top;
                document.addEventListener('mousemove', moveButton);
            }
        });

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveButton);
            if (isDragging) {
                isDragging = false;
                clickCount = 0;
            }
        });

        function moveButton(e) {
            if (isDragging) {
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;
                windowActive.style.left = Math.max(0, Math.min(window.innerWidth - windowActive.offsetWidth, newX)) + 'px';
                windowActive.style.top = Math.max(0, Math.min(window.innerHeight - windowActive.offsetHeight, newY)) + 'px';
            }
        }
    }
}
