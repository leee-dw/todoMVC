export default class {
  constructor(el) {
    if (!el) throw el;
    this.el = document.querySelector(el);
  }
}