// const submitBtn = document.querySelector("#inputForm");
// const topFeedbackBox = document.querySelector("#feedback");
// const btmFeedbackBox = document.querySelector("#deletedfeedback");
// const inputBox = document.querySelector("#inputBox");
// const itemList = document.querySelector(".list-item");
// const clearAll = document.querySelector("#clear-all");

// let groceryList = [];
// //form submit event
// submitBtn.addEventListener("submit", submitInput);
// //clear all click event
// clearAll.addEventListener("click", clearAllItem);

// function showfeedback(element, text, color) {
//   let p = document.createElement("p");

//   if (color === true) {
//     p.classList.add("inputfeedback");
//     p.innerHTML = text;
//     element.appendChild(p);
//   } else {
//     p.classList.add("no-inputfeedback");
//     p.innerHTML = text;
//     element.appendChild(p);
//   }
//   setTimeout(() => {
//     p.classList.add("hide");
//     p.remove();
//   }, 3000);
// }

// function submitInput(event) {
//   event.preventDefault();
//   let input = inputBox.value;

//   if (input === "") {
//     topFeedbackBox.innerHTML = "";
//     showfeedback(topFeedbackBox, "Please add grocery items", false);
//   } else {
//     topFeedbackBox.innerHTML = "";
//     showfeedback(topFeedbackBox, `${input} has been added to the list`, true);
//     groceryList.push(input);
//     setLocalStorage(groceryList);
//     addItem(groceryList);

//   }
//   console.log(localStorage);
//   console.log(groceryList);

//   inputBox.value = "";
// }

// function addItem(item) {
//   itemList.innerHTML = "";

//   item.forEach(element => {
//     let div = document.createElement("div");

//     div.classList.add("item");
//     div.innerHTML = `<h5 class="item-title">${element}</h5>
// <a class="trash-icon" href="javascript:void(0)"><i class="fa fa-trash text-danger"
//         aria-hidden="true"></i></a>`;
//     itemList.appendChild(div);

//     removeSingleItem(element);
//   });
// }

// function removeSingleItem(itemName) {
//   let icon = document.querySelectorAll(".item");

//   icon.forEach(selected => {
//     if (selected.querySelector(".item-title").textContent === itemName) {
//       selected.querySelector(".trash-icon").addEventListener("click", () => {
//         itemList.removeChild(selected);
//         groceryList = groceryList.filter(item => {
//           console.log(item);
//           console.log(groceryList);
//           return item !== itemName;
//         });
//         btmFeedbackBox.innerHTML = "";
//         showfeedback(
//           btmFeedbackBox,`${itemName} has been deleted from the list`,false
//         );
//         removeSingleItemFromLocalStorage(itemName);
//       });
//     }
//   });

// console.log(localStorage)
// }



// function getLocalStorage() {
//   const listStorage = localStorage.getItem("groceryList");
//   if (listStorage === "undefined" || listStorage === null) {
//     groceryList = [];
//   } else {
//     groceryList = JSON.parse(listStorage);
//     addItem(groceryList);
//   }
// }

// getLocalStorage();

// function setLocalStorage(item) {
//   localStorage.setItem("groceryList", JSON.stringify(item));
// }

// function clearAllItem() {
//   if (groceryList.length > 0) {
//     btmFeedbackBox.innerHTML = "";
//     showfeedback(btmFeedbackBox, "All item has been deleted.", false);
//   } else {
//     btmFeedbackBox.innerHTML = "";
//     showfeedback(btmFeedbackBox, "No item to deleted", false);
//   }
//   localStorage.removeItem("groceryList");
//   let item = document.querySelectorAll(".item");
//   groceryList = [];
//   console.log(groceryList);
//   item.forEach(element => {
//     itemList.removeChild(element);
//   });
// }

// function removeSingleItemFromLocalStorage(item) {
//   let storage = JSON.parse(localStorage.getItem("groceryList"));
//   let index = storage.indexOf(item);

//   storage.splice(index, 1);

//   localStorage.removeItem("groceryList");

//   localStorage.setItem("groceryList", JSON.stringify(storage));
// }

const topFeedback = document.querySelector("#feedback");
const inputBox = document.querySelector("#inputBox");
const submitBtn = document.querySelector("#inputForm");
const listItem = document.querySelector(".list-item");
const clearAll = document.querySelector("#clear-all");
const btmFeedback = document.querySelector("#deletedfeedback");

submitBtn.addEventListener("submit", submitItem);
clearAll.addEventListener("click", clearAllItem);
listItem.addEventListener("click", removeAnItem);
document.addEventListener("DOMContentLoaded", displayLocalStorage);

function submitItem(event) {
  event.preventDefault();
  let input = inputBox.value;

  if (input === "") {
    topFeedback.innerHTML = ""
    inputValidate(topFeedback, "Please add grocery items", true);
  } else {
    topFeedback.innerHTML = ""
    inputValidate(topFeedback, `${input} added to the list`, false);
    createItem(input);
    getLocalStorage(input);
  }
  console.log(localStorage);
  inputBox.value = "";
}

function inputValidate(where, text, conditionMet) {

  let p = document.createElement("p");
  where.appendChild(p);

  if (conditionMet === true) {
    p.classList.add("no-inputfeedback");
    p.innerHTML = text;
  } else {
    p.classList.add("inputfeedback");
    p.innerHTML = text;
  }
  setTimeout(() => {
    p.classList.add("hide");
    p.remove();
  }, 3000);
}

function createItem(text) {
  let div = document.createElement("div");
  div.classList.add("item");

  div.innerHTML = `<h5 class="item-title">${text}</h5>
  <a class="trash-icon" href="javascript:void(0)"><i class="fa fa-trash text-danger"
          aria-hidden="true"></i></a>`;

  listItem.appendChild(div);
}

function getLocalStorage(item) {
  let groceryList;
  groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))  //<<<if true run this
    : [];  ///<<if false or else run this

  groceryList.push(item);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

function displayLocalStorage() {
  let exists = localStorage.getItem("groceryList");
  console.log(exists);

  if (exists) {
    let storageItems = JSON.parse(localStorage.getItem("groceryList"));
    console.log(storageItems);
    storageItems.forEach(element => {
      createItem(element);
      console.log(element);
    });
  }
}

function clearAllItem() {
  localStorage.removeItem("groceryList");
  let item = document.querySelectorAll(".item");
  if (item.length > 0) {
    btmFeedback.innerHTML = ""
    inputValidate(btmFeedback, "All items deleted", true);
    item.forEach(selected => {
      listItem.removeChild(selected);
    });
  } else {
    btmFeedback.innerHTML = ""
    inputValidate(btmFeedback, "No item to delete", true);
  }
}

function removeAnItem(event) {
  event.preventDefault();
  let link = event.target.parentElement;
  if (link.classList.contains("trash-icon")) {
    let item = event.target.parentElement.parentElement;
    console.log(item);
    // let itemName = event.target.parentElement.parentElement.firstChild.textContent;
    let itemName = link.previousElementSibling.textContent;
    listItem.removeChild(item);
    btmFeedback.innerHTML ="";
    inputValidate(
      btmFeedback,
      `${itemName} has been removed from the list`,
      true
    );
    removeSingleFromStorage(itemName);
  }
}

function removeSingleFromStorage(item) {
  let store = JSON.parse(localStorage.getItem("groceryList"));
  let index = store.indexOf(item);

  store.splice(index, 1);

  localStorage.removeItem("groceryList");

  localStorage.setItem("groceryList", JSON.stringify(store));
}
