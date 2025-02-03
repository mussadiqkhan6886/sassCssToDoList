const form = document.getElementById("form");
const inputBox = document.getElementById("input");
const listItems = document.getElementById("listItems");
const clearBtn = document.getElementById("clearButton");
let index = 1;

// Add event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputBox.value.trim().length > 0) {
        addToList();
    } else {
        alert("No input provided!");
    }
});

// Function to add an item to the list
const addToList = () => {
    const inputValue = inputBox.value.trim();

    let div = document.createElement("div");
    div.className = "item";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = index;
    div.appendChild(input);

    let label = document.createElement("label");
    label.htmlFor = index;
    label.innerHTML = inputValue;
    div.appendChild(label);

    index += 1;

    listItems.appendChild(div);
    inputBox.value = "";

    storeData(listItems); // Store the updated list
    removeChecked(); // Ensure items can be removed when checked
};

// Event listener for the clear button
clearBtn.addEventListener("click", () => {
    const confirmResult = confirm("Are you sure you want to clear the list?");
    if (confirmResult) {
        listItems.innerHTML = "";
        storeData(listItems); // Clear localStorage
    }
});

// Function to hide and remove checked items after 1.5 seconds
const removeChecked = () => {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
        const checkbox = item.querySelector("input[type='checkbox']");
        item.addEventListener("click", () => {
            if (checkbox.checked) {
                setTimeout(() => {
                    item.remove(); // Remove the item from the DOM
                    storeData(listItems); // Update localStorage immediately
                }, 1500);
            }
        });
    });
};

// Function to store the list data in localStorage
const storeData = (list) => {
    let data = [];
    Array.from(list.children).forEach((child) => {
        const checkbox = child.querySelector("input[type='checkbox']");
        const label = child.querySelector("label");
        data.push({
            id: checkbox.id,
            text: label.innerHTML,
            checked: checkbox.checked
        });
    });
    localStorage.setItem("toDoList", JSON.stringify(data));
};

// Function to load the list from localStorage
const loadListObject = () => {
    const storedList = localStorage.getItem("toDoList");
    if (storedList) {
        const data = JSON.parse(storedList);
        data.forEach((item) => {
            let div = document.createElement("div");
            div.className = "item";

            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = item.id;
            input.checked = item.checked;
            div.appendChild(input);

            let label = document.createElement("label");
            label.htmlFor = item.id;
            label.innerHTML = item.text;
            div.appendChild(label);

            listItems.appendChild(div);
        });
        removeChecked(); // Re-apply the event listener for loaded items
    }
};

// Load the list when the page is loaded
loadListObject();
