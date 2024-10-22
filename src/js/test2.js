let clickCount = 0;

let isDragging = false;
let offsetX, offsetY;

let resizableActive;
let resizableParent;
let draggableM;
let resizers;

let zIndexMax = 2;

const resizableAll = document.querySelectorAll('.js-resizable');
const minHeight = 107;
const minWidth = 330;

const body = document.querySelector('body');
const createBoxButton = document.querySelector('.js-create-box-button');

clickActionWin();

let sidebarFold = document.querySelector('.js-sidebar-fold');


createBoxButton.addEventListener('click', () => {
    const newBox = createResizable();
    body.appendChild(newBox);
    startEventListener(newBox);
});

function addZIndex(elem) {
    // TODO
    // if (+elem.style.zIndex < zIndexMax - 1) {
    elem.style.zIndex = zIndexMax;
    zIndexMax++;
    // }
}

function createResizable() {
    const newBox = document.createElement('div');
    newBox.className = 'resizable js-resizable';
    newBox.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    newBox.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    newBox.insertAdjacentHTML('afterbegin', ``);
    return newBox;
}

let direction = '';
resizableAll.forEach(resizable => {
    startEventListener(resizable);
});

function drawPoint(x, y) {
    const point = document.createElement('div');
    point.className = 'point';
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    document.body.appendChild(point);
}

function startEventListener(resizable) {
    draggableM = resizable.querySelector('.js-draggableMousemove');
    if (draggableM) {

        draggableM.addEventListener('mousedown', (e) => {

            resizableActive = e.target.closest(".js-resizable");
            addZIndex(resizableActive);


            draggableMousemove(e, resizableActive);
        });

        // resizableActive = draggableM.closest(".js-resizable");
        // draggableMousemoveTo2Click(draggableM, resizableActive);
    }

    resizers = resizable.querySelectorAll('.js-changing-size div');
    if (resizers) {
        resizers.forEach(resizer => {
            resizer.addEventListener('mousedown', initResize);
        });
    }
}

function initResize(e) {
    e.preventDefault();
    direction = e.target.classList[0];

    resizableActive = e.target.closest(".js-resizable");
    addZIndex(resizableActive);

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
}

function resize(e) {
    const rect = resizableActive.getBoundingClientRect();

    let maxWidth = window.innerWidth;
    let maxHeight = window.innerHeight;

    if (direction.includes('right')) {
        const newWidth = e.clientX - rect.left;
        if (newWidth > minWidth && (newWidth + rect.left) < (maxWidth - 3)) {
            resizableActive.style.width = newWidth + 'px';
        }
    }

    if (direction.includes('bottom')) {
        const newHeight = e.clientY - rect.top;
        if (newHeight > minHeight && (newHeight + rect.top) < (maxHeight - 3)) {
            resizableActive.style.height = newHeight + 'px';
        }
    }

    let locationPoint;
    if (direction.includes('top')) {
        locationPoint = e.clientY - rect.top;
        const newHeight = rect.height - locationPoint;
        const newTop = rect.top + locationPoint;
        if (newHeight > minHeight && newTop > 3) {
            resizableActive.style.height = newHeight + 'px';
            resizableActive.style.top = newTop + 'px';
        }
    }

    if (direction.includes('left')) {
        locationPoint = e.clientX - rect.left;
        const newWidth = rect.width - locationPoint;
        const newLeft = rect.left + locationPoint;
        if (newWidth > minWidth && newLeft > 3) {
            resizableActive.style.width = newWidth + 'px';
            resizableActive.style.left = newLeft + 'px';
        }
    }
}

function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
}

function draggableMousemove(e, resizableActive) {
    isDragging = true;

    offsetX = e.clientX - resizableActive.getBoundingClientRect().left;
    offsetY = e.clientY - resizableActive.getBoundingClientRect().top;

    window.addEventListener('mousemove', moveButton);

    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', moveButton);
        isDragging = false;
    });

    function moveButton(e) {
        if (isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            resizableActive.style.left = Math.max(0, Math.min(window.innerWidth - resizableActive.offsetWidth, newX)) + 'px';
            resizableActive.style.top = Math.max(0, Math.min(window.innerHeight - resizableActive.offsetHeight, newY)) + 'px';
        }
    }
}


function draggableMousemoveTo2Click(draggableElem, resizableActive) {
    draggableElem.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 2) {
            isDragging = true;
        }
    });

    draggableElem.addEventListener('mousedown', (e) => {
        if (isDragging) {
            offsetX = e.clientX - resizableActive.getBoundingClientRect().left;
            offsetY = e.clientY - resizableActive.getBoundingClientRect().top;
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
            resizableActive.style.left = Math.max(0, Math.min(window.innerWidth - resizableActive.offsetWidth, newX)) + 'px';
            resizableActive.style.top = Math.max(0, Math.min(window.innerHeight - resizableActive.offsetHeight, newY)) + 'px';
        }
    }
}

function clickActionWin() {
    document.addEventListener('click', (e) => {
        resizableActive = e.target.closest('.js-resizable');
        if (!resizableActive) {
            return;
        }
        addZIndex(resizableActive);

        if (!e.target.closest('.js-action-win')) {
            return;
        }


        if (e.target.closest('.js-close')) {
            console.log("close");
        }

        if (e.target.closest('.js-open')) {
            addZIndex(resizableActive);
            resizableActive.style.width = '1000px';
            resizableActive.style.height = '900px';
        }

        if (e.target.closest('.js-delete')) {
            resizableActive.remove();
        }
    });
}



document.querySelector('.js-sidebar-toggle').addEventListener('click', () => {
    sidebarFold.classList.toggle('active');
});

const sidebarLi = sidebarFold.querySelector(".js-sidebar-li");
const sidebarLiList = sidebarFold.querySelectorAll(".js-sidebar-li li");
let startDragover = false;

sidebarLiList.forEach(sdLi => {
    sdLi.addEventListener("click", (e) => {
        console.log("происходит всплывание или с создание блока который был скрыт ");
    });


    sdLi.addEventListener("dragstart", (e) => {
        startDragover = true;
        setTimeout(() => sdLi.classList.add("dragging"), 0);
    });
    sdLi.addEventListener("dragend", (e) => {
        startDragover = false;
        sdLi.classList.remove("dragging");
    });
});

const initSortableList = (e) => {
    if (startDragover) {
        e.preventDefault();
        const draggingItem = document.querySelector(".dragging");
        let siblings = [...sidebarLi.querySelectorAll("li:not(.dragging)")];

        let nextSibling = siblings.find(sibling => {
            return e.clientY - sidebarLi.getBoundingClientRect().top <= sibling.offsetTop + sibling.offsetHeight / 2;
        });

        sidebarLi.insertBefore(draggingItem, nextSibling);
    }
};

sidebarLi.addEventListener("dragover", initSortableList);
sidebarLi.addEventListener("dragenter", e => e.preventDefault());
