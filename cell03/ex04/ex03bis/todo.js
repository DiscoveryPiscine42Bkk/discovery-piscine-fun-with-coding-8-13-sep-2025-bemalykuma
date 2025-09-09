let TodoList = [];

function createTodo(text) {
    return $(`
        <div class="todo">
            <p>${text}</p>
            <button class="delete">Delete</button>
        </div>
    `);
}

function render() {
    $("#ft_list").empty();
    TodoList.forEach(todo => {
        const element = createTodo(todo);
        $("#ft_list").append(element);
    });
    document.cookie = "todos=" + JSON.stringify(TodoList) + ";path=/";
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

$(document).ready(function () {

    const save = getCookie("todos");
    if (save) {
        TodoList = JSON.parse(save);
        render();
    }

    $("#new").on("click", function () {
        const name = prompt("Name the todo.");
        if (name && name.trim().length > 0) {
            TodoList.unshift(name.trim());
            render();
        }
    });

    $("#ft_list").on("click", ".delete", function () {
        const text = $(this).siblings("p").text();
        if (confirm("Are you sure to remove?")) {
            TodoList = TodoList.filter(a => a !== text);
            render();
        }
    });
});