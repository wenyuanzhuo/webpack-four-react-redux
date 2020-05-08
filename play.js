class A {
  constructor() {
    this.a = 'a'
  }
  getA () {
    return this.a
  }
  static hello() {
    console.log('hello world');
  }
}
class B {
  constructor() {
    this.b = 'b'
  }
  getB () {
    return this.b
  }
}
function copyProperties (target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'name' && key !== 'constrcutor' && key !== 'prototype') {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
    }
  }
}
const mixins = (...arrs) => (targetClass) => {
  for (let arr of arrs) {
    copyProperties(targetClass.prototype, arr.prototype)
    copyProperties(targetClass, arr)
  }
  targetClass.prototype.constructor = targetClass
  return new Proxy(targetClass, {
    construct(target, args) {
      const obj = new target(...args)
      for (let arr of arrs) {
        copyProperties(obj , new arr())
      }
      return obj
    }
  })
}
@mixins(A, B)
class Parent {
  constructor() {
    this.name = 'parent'
  }
  getName () {
    return this.name
  }
}
// const minxParent = mixins()(Parent)
// new minxParent()
console.log(Reflect.ownKeys(Parent))
console.log(Reflect.ownKeys(new Parent()))
console.log(Reflect.ownKeys(Parent.prototype))
console.log(Parent)
const parent = new Parent()
console.log(parent.a)
