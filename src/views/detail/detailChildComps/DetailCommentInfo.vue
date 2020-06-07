<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="c-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          <span>更多</span>
          <img src="~assets/img/detail/detail-more.svg" alt="">
        </div>
      </div>

      <div class="c-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="c-detail">
        <p>{{commentInfo.content}}</p>
        <div class="c-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="c-imgs">
          <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">       
        </div>
      </div>
      <div class="endline">
        <div class="start"></div>
        <span class="end-title">看了又看</span>
        <div class="end"></div>
      </div>
    </div>

    
  
</template>

<script>
  import {formatDate} from 'common/utils'
export default {
  props: {
    commentInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  filters: {
      showDate(value) {
        // 将时间戳转化成Date对象
        const date = new Date(value * 1000)
        // 2.对date进行格式化
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    }
}
</script>

<style>
  .c-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    text-align: center;
  }
   .header-title {
     margin-left: 10px;
     color: #666;
     font-size: 14px;
   }
   .header-more span {
     color: #666;
     font-size: 14px;
     margin-top: -6px;
   }
   .header-more img {
     width: 25px;
     height: 25px;
     margin-bottom: -7px;

   }
   .c-user {
     width: 100%;
   }
   .c-user img {
     padding: 2px;
     margin-left: 3px;
     width: 40px;
     height: 40px;
     border-radius: 50%;
     
   }
   .c-user span {
     position: relative;
     color: #777;
     top: -15px;
     margin-left: 13px;
   }
   
   .c-other .date,span {
     font-size: 14px;
     color: #999;
     margin-right: 8px;
   }
   .c-detail {
     padding: 0 5px 15px;
   }
   .c-detail p{
     font-size: 14px;
     color: #777;
     line-height: 1.5;
   }
   .c-imgs {
     margin-top: 10px;
   }
   .c-imgs img{
     width: 80px;
     height: 80px;
     margin-right: 8px; 
   }
    .endline {
      display: flex;
      
    }
   .endline .start ,.endline .end {
     width: 40px;
     height: 1px;
    background-color: #a3a3a5;
    position: relative;
   }
   .endline span {
    margin-top: 15px;
    justify-content: center;
    display: flex;
   }
</style>