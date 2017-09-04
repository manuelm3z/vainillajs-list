const image = document.getElementById('imageSelected');

const inputText = document.querySelector('textarea');

const inputFile = document.getElementById('image');

const form = document.getElementsByName('todo')[0];

const helpImage = document.getElementById('error-image');

const helpText = document.getElementById('error-text');

const list = document.querySelector('ul');

let div = document.querySelector('.counter');

const counter = div.children[0];

export {
    image,
    inputText,
    inputFile,
    form,
    helpImage,
    helpText,
    list,
    counter
};