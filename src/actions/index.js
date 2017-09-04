import {
    helpImage,
    helpText,
    image as domImage,
    list,
    form,
    counter
} from '../dom';
import {
    getTodos,
    deleteTodo
} from '../local';

export function setImageInvalid(message) {
    helpImage.style.display = 'block';
    
    helpImage.style.color = 'red';

    helpImage.innerText = message;
}

export function setImageValid() {
    helpImage.style.display = 'none';

    helpImage.innerText = '';
}

export function setImage(file, type = 'url') {
    if (type === 'url') {
        domImage.src = file;
    } else {
        setBlobImage(file, domImage);
    }
}

function setBlobImage(file, dom) {
    let image = new Image();
    
    image.onload = () => {
        let canvas = document.createElement('canvas');
        
        canvas.width = 320, canvas.height = 320;

        var ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0, 320, 320);

        dom.src = canvas.toDataURL('image/jpeg');
    };
    
    image.src = window.URL.createObjectURL(file);
}

export function setTextInvalid(message) {
    helpText.style.display = 'block';

    helpText.style.color = 'red';

    helpText.innerText = message;
}

export function setTextValid(message = '') {
    if (message === '') {
        helpText.style.display = 'none';
    } else {
        helpText.style = {};
    }

    helpText.innerText = message;
}

export function buildList() {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }

    let todos = getTodos();

    counter.innerText = `Mostrando ${todos.length}`;

    todos.sort((a, b) => a.index - b.index).forEach(element => {
        list.appendChild(createElement(element));
    });
}

const createElement = details => {
    let newImage = document.createElement('img');

    newImage.src = details.image;

    let div = document.createElement('div');
    
    div.appendChild(newImage);

    div.className = 'image';
    
    let p = document.createElement('p');

    p.innerText = details.description;

    let div2 = document.createElement('div');

    div2.appendChild(p);

    let editButton = document.createElement('button');
    
    editButton.className = 'small edit';

    editButton.innerText = 'Editar';

    editButton.addEventListener('click', event => {
        form.itemId.value = details.id;

        form.description.value = details.description;

        domImage.src = details.image;
    });

    let deleteButton = document.createElement('button');

    deleteButton.className = 'small delete';

    deleteButton.innerText = 'Eliminar';

    deleteButton.addEventListener('click', event => {
        deleteTodo(details.id);

        buildList();
    });

    let div3 = document.createElement('div');

    div3.appendChild(editButton);

    div3.appendChild(deleteButton);

    div3.className = 'buttons';

    let li = document.createElement('li');

    li.draggable = true;

    li.id = details.id;

    li.dataset.index = details.index;

    li.appendChild(div);

    li.appendChild(div2);

    li.appendChild(div3);

    return li;
}