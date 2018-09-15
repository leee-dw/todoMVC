export default class {
  constructor(store, mainView) {
    this.store = store;
    this.mainView = mainView;
  }

  setView() {
    this.addItem();

  }

  addItem() {
    this.store.insert({
      id: Date.now(),
      completed: false
    });
  }
}