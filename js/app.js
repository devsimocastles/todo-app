
// TODO CLASS
class Todo {
    static lightTheme = false;
    static todo_id = 0;
    constructor(title) {
        this._title = title;
        this.id = Todo.todo_id++;
        this.structure = `
        <label class="checkbox__container">
        <input type="checkbox" class="todo__checkbox" data-cb_id="${this.id}">
        <span class="checkmark"></span>
        </label>
        <p data-title_id="${this.id}" class="todo__title">${this._title}</p>
        <div class="close__icon__container">
            <img src="./../images/icon-cross.svg" class="delete__button" data-buttonid="${this.id}">
        </div>
        `;
    }

    createTodo() {
        let todo = document.createElement("div");
        if (Todo.lightTheme) todo.classList.add("todo", "light");
        else todo.classList.add("todo", "dark");


        todo.setAttribute("data-id", this.id);

        if (this.id === 0) {
            todo.setAttribute("id", "first");
        }

        todo.innerHTML = this.structure;
        todo_container.appendChild(todo);
        actualizarContador();

    }
}

// HTML ELEMENTS 
const todo_container = document.querySelector(".todo__container");
const todo_cantity = document.getElementById("cantity");
const create_todo = document.querySelector(".create__todo");
const input_text = document.querySelector("input[type='text']");
const clear_completed_btn = document.getElementById("clear_completed");
const switch_icon = document.getElementById("switch_icon");
const filter_container = document.querySelector(".filter__options");
const options_container = document.querySelector(".options");


// FILTER OPTIONS
const filter_btn = document.querySelectorAll(".filter__btn");
let all = document.querySelector("span[data-filter='all']");
let active = document.querySelector("span[data-filter='active']");
let completed = document.querySelector("span[data-filter='completed']");



// MISC VARIABLES
let buttons;
let checkboxes;
let checkmarks;
let todos;


// FUNCTIONS
function actualizarTodos(){
    todos = document.querySelectorAll(".todo");
}


function actualizarBotones() {
    buttons = document.querySelectorAll(".delete__button");
    for (const button of buttons) {
        button.addEventListener("click", (e) => {
            for (const todo of document.querySelectorAll(".todo")) {
                if (e.target.dataset.buttonid === todo.dataset.id) {
                    todo.remove();
                    actualizarContador();
                }
            }
        })
    }
}


function actualizarCheckboxes() {
    checkboxes = document.querySelectorAll(".todo__checkbox");
    for (const cb of checkboxes) {
        cb.addEventListener("change", (e) => {
            let todo_title = document.querySelector(`p[data-title_id='${e.target.dataset.cb_id}']`);
            if (e.target.checked) {
                todo_title.classList.add("checked");
            }
            else {
                todo_title.classList.remove("checked");
            }
        })
    }
}


function actualizarContador() {
    todo_cantity.innerText = document.querySelectorAll(".todo").length;
}

function addTodo(nombre) {
    const todo = new Todo(nombre);
    todo.createTodo();
    actualizarContador();
    actualizarCheckboxes();
    actualizarTodos();
}

// LISTENERS
input_text.addEventListener("keydown", (e) => {
    if (input_text.value == "") {
        return;
    }
    if (e.key == "Enter") {
        addTodo(e.target.value);
        actualizarContador();
        actualizarBotones();
        actualizarCheckboxes();
        actualizarTodos();
        input_text.value = "";
    }
})


clear_completed_btn.addEventListener("click", (e) => {
    let todos = document.querySelectorAll(".todo");
    if (!(todos.length == 0)) {
        checkboxes
            .forEach(cb => {
                if (cb.checked) {
                    todos
                        .forEach(todo => {
                            if (cb.dataset.cb_id === todo.dataset.id) {
                                todo.remove();
                                actualizarContador();
                            }
                        })
                }
            })
    } else return;
})


filter_btn.forEach(btn => {
    //COLORS
    let blue = "#3a7bfd", dark_blue = "#4d5066";
    all.style.color = blue;

    function changeOptionColor(all_color, active_color, completed_color) {
        all.style.color = all_color;
        active.style.color = active_color;
        completed.style.color = completed_color;
    }

    function displayTodos(todo_list, cb, display_value) {
        todo_list
            .forEach(todo => {
                if (cb.dataset.cb_id === todo.dataset.id) {
                    todo.style.display = display_value;
                }
            })
    }

    btn.addEventListener("click", (e) => {
        let todos = document.querySelectorAll(".todo");
        switch (e.target.dataset.filter) {
            case "all":
                todos.forEach(todo => todo.style.display = "flex");
                changeOptionColor(blue, dark_blue, dark_blue);
                break;
            case "active":
                checkboxes.forEach(cb => {
                    if (cb.checked) displayTodos(todos, cb, "none");
                    else displayTodos(todos, cb, "flex");
                });
                changeOptionColor(dark_blue, blue, dark_blue);
                break;
            case "completed":
                checkboxes.forEach(cb => {
                    if (!cb.checked) displayTodos(todos, cb, "none");
                    else displayTodos(todos, cb, "flex");
                });
                changeOptionColor(dark_blue, dark_blue, blue);
                break;
            default:
                break;
        }
    })
})
    

function changeBanner(){
    const bg_mobile_dark = "url('https://images2.imgbox.com/05/fa/Y6wPyOYF_o.jpg')";
    const bg_mobile_light = "url('https://images2.imgbox.com/c2/27/cBkZvxY3_o.jpg')";
    const bg_desktop_dark = "url('https://images2.imgbox.com/c7/80/7yurbPTn_o.jpg')";
    const bg_desktop_light = "url('https://images2.imgbox.com/e8/49/8ekyckbz_o.jpg')";

    if (Todo.lightTheme) {
        if (window.innerWidth <= 650) document.body.style.backgroundImage = bg_mobile_light;
        else document.body.style.backgroundImage = bg_desktop_light;
    }

    else{
        if (window.innerWidth <= 650) document.body.style.backgroundImage = bg_mobile_dark;
        else document.body.style.backgroundImage = bg_desktop_dark;
    }
}


switch_icon.addEventListener("click", (e) => {
    actualizarTodos();

    let sunIconSrc = "https://svgur.com/i/zDL.svg";
    let moonIconSrc = "https://svgur.com/i/zDf.svg";



    function switchClass(el, cls_a, cls_b){
        el.classList.remove(cls_b);
        el.classList.add(cls_a);
    }

    if (switch_icon.src == sunIconSrc){
        Todo.lightTheme = true;
        changeBanner();
        switch_icon.src = moonIconSrc;
        switchClass(todo_container, "light", "dark");
        switchClass(create_todo, "light", "dark");
        switchClass(document.body, "light", "dark");
        switchClass(filter_container, "light", "dark");
        switchClass(todo_container, "light", "dark");
        for (const todo of todos) {
            switchClass(todo, "light", "dark");
        }
    } 

    else {
        Todo.lightTheme = false;
        changeBanner();
        switch_icon.src = sunIconSrc;
        switchClass(todo_container, "dark", "light");
        switchClass(create_todo, "dark", "light");
        switchClass(document.body, "dark", "light");
        switchClass(filter_container, "dark", "light");
        switchClass(todo_container, "dark", "light");
        for (const todo of todos) {
            switchClass(todo, "dark", "light");
        }
    }

});

window.addEventListener("resize", changeBanner);






