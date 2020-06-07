export default {
  
    // 修改state都应该通过mutations,才能对状态进行修改，mutation目的是对数据状态进行跟踪
    // mutation中的每个方法尽可能完成的事情比较单一一些
    addCounter(state,payLoad) {
      payLoad.count++
    },
    addToCart(state,payLoad) {
      payLoad.checked = true
      state.cartList.push(payLoad)
    }
}