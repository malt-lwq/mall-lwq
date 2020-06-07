<template>
    <div id="home">
      <nav-bar class="home_nav">
        <div slot="left">
          <img src="~assets/img/home/more.svg" alt="">
        </div>
        <div slot="center">购物街</div>
      </nav-bar>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="fixed"
                   v-show="isTop"/>
      <scroll class="content"
              ref="scroll"
              @scroll="contentScroll"
              :type="3"
              :isPull="true"
              @pullingUpLoad="pullingUpLoad">
        <home-swiper :banners="banners"
                     @imageLoad="imageLoad" />
        <home-r-view :recommends="recommends" />
        <feature-view />
        <tab-control :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"/>
        <goods-list :goods="showGoods" />
      </scroll>
      <!-- 监听组件按钮事件，需要加上native修饰词 -->
      <back-top @click.native="backClick" v-show="isShow"/>
    </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComs/HomeSwiper";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  //工具
  import {getHomeMultidata, getHomeData} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from 'common/mixin'

  //home子组件
  import HomeRView from "./childComs/HomeRView";
  import FeatureView from "./childComs/FeatureView";

  //业务组件
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: 'pop',//当前的goodsType
        isShow: false,     //默认不显示返回按钮
        isTop: false,      //是否置顶
        offset: 0,         //是否吸顶
        position: 0,        //保存home中的位置信息
        itemImgListener:null,
      }
    },
    activated() {
      this.$refs.scroll.refresh();
      // 在0秒内定位到离开时的y值位置
      this.$refs.scroll.scrollTo(0, this.position,0);
      //  this.$refs.scroll.refresh();
    },
    deactivated() {
      // 1.保存scroll.y值
      this.position = this.$refs.scroll.position;
      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created() {
      //请求轮播图数据
      this.getHomeMultidata();

      //请求列表数据
      this.getHomeData('pop');
      this.getHomeData('new');
      this.getHomeData('sell');

    },
    mixins: [itemListenerMixin],
    mounted() {
        // !!!通过混入的方式，实现监听图片加载函数的多处

       //监听goodsItemImage加载完成，滚动区域bug解决
      // bug原因：better-scroll在计算可滚动高度时，可能只计算了组件的高度，图片可能还没加载出来
      // 调用过于频繁，调用debouce防抖函数解决
      // const refresh = debounce(this.$refs.scroll.refresh,100);
      // this.itemImgListener = () => {
      //   refresh();
      // }
      // this.$bus.$on('ItemImgLoad',this.itemImgListener)
    },
    methods: {

      /**
       * 网络请求
       */
      getHomeMultidata() {
        getHomeMultidata().then(rs => {
          // console.log(rs);
          this.banners = rs.data.banner.list;
          this.recommends = rs.data.recommend.list;
        });
      },
      getHomeData(type) {
        const page = this.goods[type].page;
        getHomeData(type, page+1).then(rs => {
          // ...展开运算符，对数组进行解析，然后添加进新数组，push方法可传入多个参数
          this.goods[type].list.push(...rs.data.list);
          // console.log(rs);
          
          // 当上拉加载完成，需要调用此方法告诉better-scroll数据已加载，否则无法进行再次加载，默认只加载一
          this.$refs.scroll.finishLoad();
        });
        this.goods[type].page++;
      },

      /**
       * 事件监听的方法
       */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0: this.currentType = 'pop';break;
          case 1: this.currentType = 'new';break;
          case 2: this.currentType = 'sell';break;
        }
        // 设置占位tabControl选中index状态的统一
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        // 通过$refs拿到scroll组件
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
         // 1.判断backTop是否显示
        this.isShow = -position.y > 1000;
        // console.log(position);
        
        // 2.判断是否置顶
        this.isTop = -(position.y) > this.offset;
        // console.log(this.offset);
      },
      // 上拉加载更多事件
      pullingUpLoad() {
        this.getHomeData(this.currentType);
      },
      // 获取当前的tabControl的offsetTop
      imageLoad() {
        // console.log('----');
        
        this.offset = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.offset);
        
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>

  #home {
     height: 100vh;
    position: relative;
  }
  .home_nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 对于原生的浏览器滚动才需要fixed */
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .content {
    /* position: absolute; */
    width: 100%;
    top: 44px;
    left: 0;
    right: 0;
    position: absolute;
    height: calc(100% - 44px - 49px );
    overflow: hidden;
  }

 .fixed {
     position: relative;
    z-index: 9;
 }
  .home_nav img{
    margin: 4px 2px;
    width: 32px;
    height: 38px;
    align-items: center;
    display: flex;
  }
</style>
