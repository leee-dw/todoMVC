let input = $qs('.input');

let data = {
  todo: [],
  done: [],
}

let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><g><g><path d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path  d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
let completeSVG = `<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0h24v24H0z" fill="none" />
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
</svg>`

let ENTER_KEY = 13;


function init() {
  $on(input, 'keydown', (event) => {
    return input.value.trim() !== '' && (event.keyCode || event.which) === ENTER_KEY ? render() : '';
  })
}

function render() {
  let todoEl = document.createElement('li');
  let todoContents = document.createElement('p');
  let todoIconLists = document.createElement('div');
  let completeDiv = document.createElement('div');
  let removeDiv = document.createElement('div');
  let todos = $qs('.list__todo__wrapper');
  let dones = $qs('.list__done__wrapper');

  addClass(todoContents, todoIconLists, completeDiv, removeDiv, todoEl);
  append(todoEl, todoContents, todoIconLists);
  append(todoIconLists, completeDiv, removeDiv);

  data.todo.push(input.value);
  todoContents.innerHTML += data.todo.reduce((acc, curr) => acc = curr, '');
  input.value = '';

  inputHTML(completeDiv, completeSVG);
  inputHTML(removeDiv, removeSVG);
  todos.appendChild(todoEl);
  completeItem(completeDiv, dones);
  removeItem(removeDiv);
}


function append(target, first, second) {
  return target.appendChild(first) && target.appendChild(second);
}


function inputHTML(target, select) {
  return target.innerHTML = select;
}


function addClass(...args) {
  let arr = ['list__contents', 'list__icon', 'complete__icon', 'remove__icon', 'list'];
  args.forEach((elem, idx) => {
    elem.classList.add(arr[idx]);
  })
}


function completeItem(cm, dones) {
  $on(cm.firstElementChild, 'click', e => {
    data.todo.forEach((elem, idx) => {
      if (cm.firstElementChild.parentElement.parentElement.parentElement.firstElementChild.innerText === elem) {
        data.done.push(elem) && data.todo.splice(idx, 1);
        cm.firstElementChild.parentElement.firstElementChild.style.fill = '#25b99a';
        dones.appendChild(cm.firstElementChild.parentElement.parentElement.parentElement);
      }
    })
  })
}


function removeItem(rm) {
  $on(rm.firstElementChild, 'click', () => {
    let { todo, done } = data;
    todo.forEach((elem, idx) => {
      if (rm.firstElementChild.parentElement.parentElement.parentElement.firstElementChild.innerText === elem) {
        todo.splice(idx, 1);
        rm.firstElementChild.parentElement.parentElement.parentElement.remove();
      }
    })

    done.forEach((elem, idx) => {
      if (rm.firstElementChild.parentElement.parentElement.parentElement.firstElementChild.innerText === elem) {
        done.splice(idx, 1);
        rm.firstElementChild.parentElement.parentElement.parentElement.remove();
      }
    })
  })
}



init();