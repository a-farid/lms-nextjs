export default class Airport {
  constructor(name, code) {
    this._name = name;
    this._code = code;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getCode() {
    return this.code;
  }
  setCode(code) {
    this.code = code;
  }
  toString() {
    return `[object ${this._code}]`;
  }
}
