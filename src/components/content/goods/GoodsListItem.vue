<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" @load="imageLoad">
    <div class= "goods-info">
      <p>{{content.title}}</p>
      <span class="price">{{content.price}}</span>
      <span class="collect">{{content.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    data() {
      return {
        imageLength:0,
        counter : 0
      }
        
    },
    props: {
      content: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.content.image || this.content.show.img
      }
    },
    methods: {
      imageLoad() {
        // 1.通过路由先判断是首页还是详情页的图片监听，
        // if(this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('ItemImgLoad');
        // } else if(this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailItemImgLoad')
        // }

        // 2.通过deactivated取消对应位置的监听
          this.$bus.$emit('ItemImgLoad')
      },
      // watch: {
      //     content() {
      //       this.imageLength = this.content.img.length || this.content.show.img.length
      //     }
      // },
      itemClick() {
        // this.$router.push('/detail/' + this.content.iid);
        this.$router.push({
          path: '/detail',
          query: {
            id: this.content.iid
          }
        });
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    font-size: 12px;

    /*宽度设置为%，自适应宽度*/
    width: 48%;
    justify-content: space-between;
    margin-left: 3px;
    margin-right: 3px;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
     padding: 2px;
     /* height:100%防止图片大小短一截 */
     height: 100%;
    
  }

  .goods-info {
    text-align: center;
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
  }

  .goods-info p {
    /*  */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    padding: 3px;
  }
  .goods-info .price {
    color: var(--color-tint);
    margin-right: 25px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
