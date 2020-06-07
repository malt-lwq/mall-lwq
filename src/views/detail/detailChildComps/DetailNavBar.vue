<template>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             @click="titleClick(index)"
             :class="{active: currentIndex === index}"
             :key="item.id">
             <span>{{item}}</span>
         
          
        </div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index)
        
      },
      back() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title > div {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);

  } 

  .active span{
    color: var(--color-high-text);
    padding-bottom: 2px;
    border-bottom: 2px solid #ff8191;
  }
  .back {
    margin-top: 7px;
  }

</style>
