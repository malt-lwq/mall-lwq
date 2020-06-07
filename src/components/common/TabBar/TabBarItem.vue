<template>
     
      <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
       <div v-else><slot name="item-icon-active"></slot></div>
       <!--:style动态绑定样式  -->
       <div :style="activeStyle"><slot name="item-text"></slot></div>
        
      
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
      </div>

</template>

<script>
export default {
      name:"TabBarItem",
      props:{
        path:String,
        activeColor:{
          type:String,
          default:''
        }
      },
      data(){
        return{
          // isActive:true
        }
      },
      computed:{
          isActive() {
            // js中indexOf方法，若结果不等于-1，则表示两个path相等
            // return this.$route.path.indexOf(this.path) !==-1
            // ES6 includes方法 $route表示当前活跃路由对象
            return this.$route.path.includes(this.path) ==1
          },
          activeStyle() { 
            // 获取当前活跃路由的activeColor属性
            return this.isActive ? {color: this.activeColor} : {}
          }
      },
      methods:{
        itemClick(){
            // 连续点击两次异常捕获
          this.$router.push(this.path).catch(err=> {})
          // console.log(this.activeColor)
            
        }
      }
}
</script>

<style>
 #tab-bar{
    display: flex;
    background-color: #f6f6f6;

    /* 设置tabbar固定在底部 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 设置边框上底部阴影 
        box-shadow：x轴偏移量，y轴偏移量，阴影模糊半径，透明度*/

    box-shadow: 0px -1px 1px rgba(100,100,100,.2) 

  }
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;

  font-size: 14px;
  /* 上边距 */

  vertical-align: middle;

}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /*图片最下面多三个像素，去除默认3px  */
}

</style>
