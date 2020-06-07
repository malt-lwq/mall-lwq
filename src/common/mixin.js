import {debounce}  from 'common/utils'

import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      newRefresh:null
    }
  },
  mounted() {
    //监听goodsItemImage加载完成，滚动区域bug解决
   // bug原因：better-scroll在计算可滚动高度时，可能只计算了组件的高度，图片可能还没加载出来
   // 调用过于频繁，调用debounce防抖函数解决
     this.newRefresh = debounce(this.$refs.scroll.refresh,100);
      this.itemImgListener = () => {
        this.newRefresh();
      //  console.log('我是混入');
     
   }
   this.$bus.$on('ItemImgLoad',this.itemImgListener  );
 },
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShow: false,

    }
  },
  methods: {
    backClick() {
      // 通过$refs拿到scroll组件
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }

}