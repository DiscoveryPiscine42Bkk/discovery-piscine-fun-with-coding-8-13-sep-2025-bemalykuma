const list = document.getElementById("ft_list")
let TodoList = []

function createTodo(text) {
    const element = document.createElement('div')
    element.classList.add('todo')
    element.innerHTML = '<p>' + text + '</p>' +
        '<button onclick="removeTodo(\'' + text + '\')">Delete</button>'
    return element;
}

function render() {
    list.innerHTML = ''
    for (let index = 0; index < TodoList.length; index++) {
        const element = TodoList[index];
        list.appendChild(createTodo(element))
    }
    document.cookie = "todos=" + JSON.stringify(TodoList) + ";path=/";
}

function newTodo() {
    let name = prompt("Name the todo.")
    if (name && name.trim().length > 0) {
        TodoList.unshift(name.trim())
        render()
    }
}

function removeTodo(text) {
    let yes = confirm('Are you sure to remove?')
    if (yes) {
        TodoList = TodoList.filter((a) => a !== text)
        render()
    }
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

window.onload = function () {
    let save = getCookie("todos")
    if (save) {
        TodoList = JSON.parse(save)
        render()
    }
}
