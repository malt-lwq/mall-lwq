<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    props: {
      type: {
        type: Number,
        default: 0
      },
      isPull: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        position: 0,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.type,
        pullUpLoad: this.isPull
      });

      //监听滚动
      if(this.type === 2 || this.type ===3) {
        this.scroll.on('scroll', position => {
          this.position = position.y;
          // console.log(this.position);
          this.$emit('scroll', position);
        });
      }

      //监听上拉加载
      if(this.isPull) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUpLoad');
        });

      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time );
      },
      finishLoad() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        // console.log('---');
        
        this.scroll && this.scroll.refresh();
      }
    },
    computed: {
    }
  }
</script>

<style scoped>
  
</style>
