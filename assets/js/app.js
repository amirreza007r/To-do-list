const inputBox = document.getElementById("input");
const listContainer = document.getElementById("list-container");

function handleInputChange() {
    const addBtn = document.getElementById("add-btn");
    const inputText = inputBox.value.trim();

    if (inputText.length > 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

function addTask() {
    if (inputBox.value === "") {
        alert("You must enter something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});
function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

function filterTasks(filter) {
    const listItems = document.querySelectorAll("#list-container li");
    const filterButtons = document.querySelectorAll(".filter-section button");

    listItems.forEach((item) => {
        item.style.display = "block";

        if (filter === "ongoing" && item.classList.contains("checked")) {
            item.style.display = "none";
        } else if (
            filter === "completed" &&
            !item.classList.contains("checked")
        ) {
            item.style.display = "none";
        }
    });

    filterButtons.forEach((button) => {
        button.classList.remove("active");
    });

    document.getElementById(`${filter}Btn`).classList.add("active");
}
