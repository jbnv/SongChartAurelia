export class Messages {

  remove(index) {
    var rest = this.messages.slice(index + 1 || this.messages.length);
    this.messages.length = index;
    return this.messages.push.apply(this.messages, rest);
  };

  activate(messages) {
    this.messages = messages;
  }
}
