import Controller from './Controller.js'
import Store from './Store.js'
import MainView from './MainView.js'


const store = new Store('.main-section');
const mainView = new MainView('.todo-section');
const controller = new Controller(store, mainView);


controller.setView();