import Toast from './Toast'
const obj = {}

// install函数在执行时，默认会传递参数Vue
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastConstrutor = Vue.extend(Toast)

  // 2.根据组件构造器，创建组件对象
  const toast = new toastConstrutor

  // 3.将组件对象，挂载到某个元素上
  toast.$mount(document.createElement('div'))

  // 4.将toast.$el添加到body中
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
  
}
export default obj