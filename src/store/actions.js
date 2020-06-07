export default {
  
    addCart(context,payLoad) {

      return new Promise((resolve,reject) => {  
      // 1.payLoad新添加商品 写法1
      // let oldProduct = null;
      // for(let item of state.cartList) {
      //   if(item.iid === payLoad.iid) {
      //     oldProduct = item
      //   }
      // }
      // 1.写法2，查找数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
      // let oldProduct = context.state.cartList.find(function(item) {
      //   return item.iid === payLoad.iid
      // })

      // 2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payLoad.count = 1
        // context.state.cartList.push(payLoad)
        context.commit('addToCart',payLoad)
        resolve('添加了新商品喔~')
      }
      }) 
    }
   
}