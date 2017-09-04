export function getTodos() {
    let todos = [];
    
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

export function getTheLastIndex() {
    let todos = getTodos();

    let index = 0;

    todos.forEach(todo => {
        if (todo.index > index) {
            index = todo.index;
        }
    });

    return index;
}

export function getTheLastId() {
    let todos = getTodos();

    let id = 0;

    todos.forEach(todo => {
        if (todo.id > id) {
            id = todo.id;
        }
    });

    return id;
}

export function insertTodo(todo) {
    let todos = getTodos();

    todos.push(todo);

    return saveTodos(todos);
}

export function getTodo(id) {
    let todo = false, todos = getTodos();

    todos.forEach(item => {
        if (item.id === id) {
            todo = item;
        }
    });

    return todo;
}

export function updateTodo(id, todo) {
    let todos = getTodos();

    let newTodos = [];

    todos.forEach(item => {
        let temp = {};

        if (item.id === parseInt(id)) {
            temp = Object.assign(item, todo);
        } else {
            temp = item;
        }

        newTodos.push(temp);
    });

    return saveTodos(newTodos);
}

export function deleteTodo(id) {
    let todos = getTodos();

    let newTodos = [];

    todos.forEach(item => {
        if (item.id !== id) {
            newTodos.push(item);
        }
    });

    return saveTodos(newTodos);
}

function saveTodos(todos) {
    let todosString = JSON.stringify(todos);

    localStorage.setItem('todos', todosString);

    return true;
}

export function moveElements(updateId, updateIndex, formerIndex) {
    let todos = getTodos();

    let newTodos = [];

    if (formerIndex > updateIndex) {
        todos.forEach(item => {
            if (item.id !== parseInt(updateId)) {
                if (item.index >= parseInt(updateIndex) && item.index < parseInt(formerIndex)) {
                    item.index = item.index + 1;
                }
            } else {
                item.index = parseInt(updateIndex);
            }

            newTodos.push(item);
        });
    } else {
        todos.reverse().forEach(item => {
            if (item.id !== parseInt(updateId)) {
                if (item.index <= parseInt(updateIndex) && item.index > parseInt(formerIndex)) {
                    item.index = item.index + 1;
                }
            } else {
                item.index = parseInt(updateIndex);
            }

            newTodos.push(item);
        });
    }

    return saveTodos(newTodos);
}