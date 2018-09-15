import View from './View.js'

export default class extends View {
  constructor(el) {
    super(el);
  }

  render(cmd, ...params) {
    const commands = {
      list: () => {
        this.list(...params)
      }
    }
    commands[cmd]();
    return this;
  }


  list() {
    console.log("hello!");    
  }

}