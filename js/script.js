'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem("todoList")));
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
        } else if (this.input.value === "") {
            alert("Пустое дело добавить нельзя!");
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
        li.insertAdjacentHTML("beforeend", `
          <span class="text-todo">${todo.value}</span>
          <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
          </div>
        `);
        this.handler(li, todo);
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
    }

    handler(li, todo) {
        li.key = todo.key;
        li.addEventListener("click", event => {
            const target = event.target;
            if (target.matches(".todo-remove")) {
                this.deleteItem(target, li);
            }
            if (target.matches(".todo-complete")) {
                this.completedItem(target, li);
            }
        });
    }

    deleteItem(target, li) {
        this.todoData.forEach((item, i) => {
            if (i === li.key && target) {
                return this.todoData.delete(i);
            }
            this.todoData.set(i, item);
        });
        this.render();
    }

    completedItem(target, li) {
        this.todoData.forEach((item, i) => {
            if (item.completed) {
                item.completed = !(i === li.key && target);
            } else {
                item.completed = item.completed || i === li.key && target;
            }
            this.todoData.set(i, item);
        });
        this.render();
    }
}

const todo = new Todo(".todo-control", ".header-input", ".todo-list", ".todo-completed");
todo.init();
