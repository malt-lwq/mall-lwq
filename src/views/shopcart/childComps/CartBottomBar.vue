<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="allSelectClick" />
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:￥{{totalPrice}}
    </div>
    <div class="calculate">
      结算({{cartLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  props: {
    isChecked: {
      type: Boolean,
      default:false
    }
  },
  components: {
    CheckButton
  },

  computed: {
    totalPrice() {
      // 先过滤-filter没被选中的商品，再计算汇总-reduce,保留两位小数-toFixed
      return this.$store.state.cartList.filter(item => {
        return  item.checked 
      }).reduce((preValue,item) => {
        return preValue += item.price * item.count
      },0).toFixed(2)
    },
   cartLength() {
     return this.$store.state.cartList.filter(item => item.checked).length
   },
  isSelectAll() {
    if(this.$store.state.cartList.length === 0) return false 
    // 可使用filter find,some,every等方法进行判断-需要判断没有数据的情况
    // return !(this.$store.state.cartList.filter(item => !item.checked).length)
    // return !this.$store.state.cartList.some(item => !item.checked)
    return this.$store.state.cartList.every(item => item.checked)
  }
  },
  methods: {
   allSelectClick() {
     if(this.isSelectAll){
       this.$store.state.cartList.filter(item => { return (item.checked = !item.checked)})
       
     }else {
       this.$store.state.cartList.forEach(item => item.checked = true)
     }
     
   }
  }
  
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    height: 38px;
    background-color:#eee;
    display: flex;
  }
  

  .check-all {
    /*居中对齐弹性盒子的各项元素 */
    display: flex;
    align-items: center;

    width: 80px;
  }
   .check-all span {
      margin-left: 6px;
      font-size: 15px;
      color: #999
   }
  .check-button {
    margin-left: 4px;
  }
  .total-price {
    display: flex;
    align-items: center;
    flex: 1;

    margin-left: 5px;
    font-size: 15px;
    color: #999;
  }
  .calculate {
    display: flex;
    align-items: center;/*垂直居中 */
    text-align: center;
    justify-content: center;/*水平居中 */

    margin-right: 5px;
    width: 80px;
    border-radius: 4px;
    color: #999;
    background-color: pink;
  }
</style>