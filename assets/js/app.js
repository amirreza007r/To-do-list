const inputBox = document.getElementById("input");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("you must enter somthing");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        console.log(inputBox.value);
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
        item.style.display = "block"; // Reset display property

        if (filter === "ongoing" && item.classList.contains("checked")) {
            item.style.display = "none";
        } else if (
            filter === "completed" &&
            !item.classList.contains("checked")
        ) {
            item.style.display = "none";
        }
    });

    // Remove the active class from all buttons
    filterButtons.forEach((button) => {
        button.classList.remove("active");
    });

    // Add the active class to the clicked button
    document.getElementById(`${filter}Btn`).classList.add("active");
}
