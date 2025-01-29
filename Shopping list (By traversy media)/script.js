const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = document.querySelector('button');

let isEditMode = false;

function displayItems() {
  getItemFromStorage().forEach((item) => {
    addItemToDom(item);
    checkUI();
  });
}

// ADD ITEM TO FORM FUNCTION

function formSubmitAndAddingAnItem(e) {
  e.preventDefault();
  const newItem = itemInput.value; // taking item value from input box

  //checking for an empty item in the input box and returning an alert
  if (newItem == '') {
    alert('Please add an item');
  }

  if (isEditMode === true) {
    const itemToEdit = document.querySelector('.edit-mode');
    console.log(itemToEdit);
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('.edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExist(newItem)) {
      alert('That item already exist');
      return;
    }
  }

  addItemToDom(newItem);
  addItemToStorage(newItem);
  checkUI();
  itemInput.value = '';
}

//add item to DOM (MAINLY USED APPEND CHILD)

const addItemToDom = (item) => {
  const li = document.createElement('li');
  const text = document.createTextNode(item);
  li.appendChild(text); //Inserting text (using const text) using append child to newly created li using const li
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

//add to local storage

const addItemToStorage = (item) => {
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage.push(item);

  // convert to json string and set to locale storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  console.log(itemsFromStorage);
};

//get items from storage

function getItemFromStorage(item) {
  let itemsFromStorage;
  itemsFromStorage = JSON.parse(localStorage.getItem('items')) || [];

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}
function checkIfItemExist(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

//edit item

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>&nbsp;&nbsp;Update item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

//Remove item

const removeItem = (item) => {
  if (confirm('Are u sure?')) {
    item.remove();

    removeItemFromStorage(item.textContent);

    checkUI();
  }
};

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i != item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//remove all

const clearItems = (e) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    localStorage.clear();

    checkUI();
  }
};

//filter items

const filterItems = (e) => {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

//update ui

function checkUI() {
  itemInput.value = '';
  const items = document.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

//initialize app

function init() {
  // event listeners
  itemForm.addEventListener('submit', formSubmitAndAddingAnItem);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
}

init();
