/* eslint-disable linebreak-style */
'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted, btnRemove, btnComplete) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem("todoList")));
        this.btnRemove = document.querySelector(btnRemove);
        this.btnComplete = document.querySelector(btnComplete);
    }

    addTOStorage() {
        localStorage.setItem("todoList", JSON.stringify([...this.todoData]));
    }
    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
    }

    render() {
        this.todoList.textContent = "";
        this.todoCompleted.textContent = "";
        this.todoData.forEach(this.createItem, this);
        this.addTOStorage();
    }

    createItem(todo) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.key = todo.key;
        li.insertAdjacentHTML("beforeend", `
          <span class="text-todo">${todo.value}</span>
          <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
          </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }
    generateKey() {
        const letters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let word = '';
        for (let i = 0; i < 15; i++) {
            word += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        this.randomKey = word.substr(0, 5) + '-' + word.substr(5, 5) + '-' + word.substr(10, 5);
        return this.randomKey.toUpperCase();
    }

    init() {
        this.form.addEventListener("submit", this.addTodo.bind(this));
        this.render();
        this.btnComplete.addEventListener("click", () => {
            console.log("Hello");
        });
    }
}

// eslint-disable-next-line max-len
const todo = new Todo(".todo-control", ".header-input", ".todo-list", ".todo-completed", ".todo-remove", ".todo-complete");
todo.init();
