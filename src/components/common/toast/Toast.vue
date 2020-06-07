<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message:'',
      isShow: false
    }
  },
  methods: {
    show(message,duration = 1000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  }

}
</script>

<style>
  /* 添加过渡效果 */
 
  .toast {
    position: fixed;
    transform: translate(-50%,-50%);
    text-align: center;

    height: 44px;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    z-index: 99;
    padding: 15px 15px;
    font-size: 13px;

    color: #999;
    background-color: rgba(0,0,0,0.7);
    
  }
</style>