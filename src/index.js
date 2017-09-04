import './index.sass';
import {
    image,
    inputFile,
    inputText,
    list,
    form
} from './dom';
import * as actions from './actions';
import * as validations from './validations';
import * as local from './local';

actions.buildList();

actions.setImage('https://d5wt70d4gnm1t.cloudfront.net/media/a-s/artworks/remy-zaugg/12777-322363026352/remy-zaugg-not-here-1-320x320-c.jpg');

inputFile.addEventListener('change', event => {
    let file = event.target.files[0];

    actions.setImageValid();

    if (!validations.formatFile(file, ["image/jpeg", "image/png", "image/gif"])) {
        actions.setImageInvalid('Solo se acepta formatos jpeg, png, gif');
    } else {
        let tempImage = document.createElement('img');
    
        tempImage.onload = function () {
            if (tempImage.height > 320 && tempImage.width > 320) {
                actions.setImageInvalid('La imagen no puede ser mayor a 320x320');
            } else {
                actions.setImage(file, 'blob');
            }
        }
    
        tempImage.src = window.URL.createObjectURL(file);
    }
});

inputText.addEventListener('keyup', event => {
    if (!validations.maxLength(event.target.value, 300)) {
        actions.setTextInvalid(300 - event.target.value.length);
    } else {
        actions.setTextValid(300 - event.target.value.length);
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();

    let formIns = event.target;

    if (formIns.itemId && formIns.itemId.value !== '') { 
        let newdata = {
            description: formIns.description.value
        };

        if (formIns.image.files[0]) {
            let image = new Image();
            
            image.onload = () => {
                let canvas = document.createElement('canvas');
                
                canvas.width = 320, canvas.height = 320;
        
                var ctx = canvas.getContext('2d');
        
                ctx.drawImage(formIns.image.files[0], 0, 0, 320, 320);
        
                newdata.image = canvas.toDataURL('image/jpeg');
            };
            
            image.src = window.URL.createObjectURL(file);
        }

        setTimeout(function () {
            console.log(formIns.itemId.value, newdata)
            if (local.updateTodo(formIns.itemId.value, newdata)) {
                form.reset();

                actions.setTextValid(300);

                actions.buildList();
            }
        }, 1);
    } else {
        if (formIns.image.value !== '' && validations.maxLength(formIns.description.value, 300) && formIns.description.value !== '') {
            if (local.insertTodo({
                id: local.getTheLastId() + 1,
                index: local.getTheLastIndex() + 1,
                image: window.URL.createObjectURL(formIns.image.files[0]),
                description: formIns.description.value
            })) {
                form.reset();

                actions.setImage('https://d5wt70d4gnm1t.cloudfront.net/media/a-s/artworks/remy-zaugg/12777-322363026352/remy-zaugg-not-here-1-320x320-c.jpg');

                actions.setTextValid(300);

                actions.buildList();
            }
        }
    }
});

let onMovement, stay;

document.body.addEventListener('dragstart', event => {
    if (event.target.nodeName === 'LI') {
        onMovement = event.target;
    } else {
        let temp = event.target;

        while (temp.nodeName !== 'LI') {
            temp = temp.parentNode;
        }

        onMovement = temp;
    }
});

list.addEventListener('drop', event => {
    event.preventDefault();
    console.log(onMovement, stay)
});

list.addEventListener('dragover', event => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";

    let target;

    stay = false;

    if (event.target.nodeName === 'LI') {
        target = event.target;
    } else {
        let temp = event.target;

        while (temp.nodeName !== 'LI') {
            temp = temp.parentNode;
        }

        target = temp;
    }

    if (target) {
        if (target.id !== onMovement.id) {
            local.moveElements(onMovement.id, target.dataset.index, onMovement.dataset.index);
        }

        let temp = target.dataset.index;

        target.dataset.index = onMovement.dataset.index;

        onMovement.dataset.index = temp;

        target.parentNode.insertBefore(onMovement, target);
    } 
});