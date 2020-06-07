<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailnav"/>
    <scroll class="content" ref="scroll" 
        :type="3"
        @scroll="contentScroll">
        <!-- <div>{{$store.state.cartList.length }}</div> -->
      <detail-swiper :top-images="topImages" ></detail-swiper>
      <detail-goods-desc :goods="goods" />
      <detail-shop :shop="shop" />
      <detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
    <detail-bottom-bar @addCart="addCart" @toBuy="toBuy"/>
  </div>
</template>

<script>

  import Scroll from 'components/common/scroll/Scroll';

  import DetailNavBar from './detailChildComps/DetailNavBar';
  import DetailSwiper from './detailChildComps/DetailSwiper';
  import DetailGoodsDesc from './detailChildComps/DetailGoodsDesc';
  import DetailShop from './detailChildComps/DetailShop';
  import DetailGoodsInfo from './detailChildComps/DetailGoodsInfo';
  import DetailParamInfo from './detailChildComps/DetailParamInfo';
  import DetailCommentInfo from './detailChildComps/DetailCommentInfo'
  import GoodsList         from 'components/content/goods/GoodsList'
  import DetailBottomBar  from './detailChildComps/DetailBottomBar'

  import {getDetailData, getRecommend,Goods, Shop, GoodsParams} from 'network/detail';
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener:null,
        themeTopY:[],
        currentIndex: 0,
      }
    },
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailGoodsDesc,
      DetailShop,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    methods: {
      titleClick(index) {
        // console.log(index);
        // 根据对应index进行标题位置跳转
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
        
      },
      imageLoad() {
        // 此处可以进行防抖操作，但是之前已经做过确定图片加载完全的事件判断发射，可不做
        // 图片加载完才能获取到正确的offsetTop
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)
        // console.log(this.themeTopY);
        
        // 1.this.$refs.scroll.refresh();
        // 2.可直接调用mixin中的属性方法
        this.newRefresh();

      },
      contentScroll(position){
        const positionY = -position.y
        let length = this.themeTopY.length

        // 1.普通做法 判断当前index只是为了减少赋值次数
        // for(let i = 0; i < length; i++) {
          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])
          // ||(i === length - 1 && positionY >= this.themeTopY[i]))){
          //     this.currentIndex = i
          //     console.log(this.currentIndex);
          //     this.$refs.detailnav.currentIndex = this.currentIndex
          // }          
        // }

        // 2.hack做法，给数组中加入个最大值，减少判断条件,根据滚动位置显示对应标题
        for(let i = 0; i < length-1; i++) {       
          if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopY[i] && positionY <this.themeTopY[i+1]))
                
                this.currentIndex = i
                this.$refs.detailnav.currentIndex = this.currentIndex
                
              }

        
        
        this.isShow = position.y < -1200;
        this.isTop = (-position.y) >= this.offset;
        },

        // 1.获取购物车需要展示的信息
        addCart() {
          const product = {}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.price = this.goods.realPrice;
          product.desc = this.goods.desc;
          product.iid  = this.iid;

        // 2.将商品信息添加到购物车
        // this.$store.carList.push(product) 直接修改 这样也可以修改state中的数据，但是无法记录，不推荐
        // this.$store.commit('addCart',product) //mutation提交方式，//actions提交方式,
        this.$store.dispatch('addCart',product).then(res => {
          console.log(res);
          this.$toast.show(res,500)
          
          
        })
          
        // 3.成功添加到购物车
        },

        toBuy() {
          this.$toast.show('暂不支持购买喔~',500)
        }
        
      

    
    },
    // ！！！ 混入
    mixins:[itemListenerMixin ,backTopMixin],
    mounted() {
      // !!!通过混入，实现多处调用监听图片加载函数

       //监听goodsItemImage加载完成，滚动区域bug解决-推荐区域的图片加载
      // bug原因：better-scroll在计算可滚动高度时，可能只计算了组件的高度，图片可能还没加载出来
      // 调用过于频繁，调用debouce防抖函数解决
      // const refresh = debounce(this.$refs.scroll.refresh);
      // this.itemImgListener = () => {
      //   refresh();
      // }
      // this.$bus.$on('ItemImgLoad',this.itemImgListener  );
      // console.log('djfj');
      
    },
    destroyed() {
      this.$bus.$off('ItemImgLoad',this.itemImgListener)
    },
    created() {

      // 1.请求详情数据
      this.iid = this.$route.query.id;
      // this.iid = this.$route.params.id
      console.log(this.iid);
      
      //  this.iid = this.$route.params.iid
      getDetailData(this.iid).then(res => {
        //1.轮播图数据
        this.topImages = res.result.itemInfo.topImages;
        // console.log(res);

        const data = res.result;
        //2.商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo);
        //3.商家数据
        this.shop = new Shop(data.shopInfo);
        //4.商品描述
        this.detailInfo = res.result.detailInfo;
        //5.商品参数
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
        // 6.商品评论
        if(data.ratecRate!==0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 2.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
        
      })
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    background-color: #fff;
    z-index: 1;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 54px);
    position: absolute;
    overflow: hidden;
  

  }
</style>
