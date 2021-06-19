<template>
  <div class="comment" v-if="Object.keys(commentInfo).length !== 0">
    <div class="title">
      <span>用户评论</span>
      <span class="more"
        >更多
        <i class="arrow-right"></i>
      </span>
    </div>
    <div>
    <div class="content">
        <van-row >
            <van-col span="8"><img :src="commentInfo[0].user.avatar" class="userimg"/></van-col>
            <van-col span="8" style="margin: 12px 0 0 -40px">{{ commentInfo[0].user.uname }}</van-col>
        </van-row>
        <p>{{commentInfo[0].content}}</p>
        <div>
            <span>{{time}}</span>
            <span style="margin-left:15px">{{commentInfo[0].style}}</span>
        </div>
        <div style="margin-bottom:10px">
            <img v-for="(item,index) in commentInfo[0].images" :key="index" :src="item" alt="" class="comment-img"/>
        </div>
    </div>
      
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    commentInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed:{
      time(){
          return moment(new Date(this.commentInfo[0].created*1000)).format("YYYY-MM-DD")
      }
  }
};
</script>

<style  scoped>
.comment {
  border-top: 6px solid rgba(100, 100, 100, 0.1);
  border-bottom: 6px solid rgba(100, 100, 100, 0.1);
  padding: 0 15px;
}
.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 0.7px solid rgba(100, 100, 100, 0.5);
}
.more {
  margin-left: 65%;
}
.content{
    padding: 10px;
}
.userimg {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.content p{
    font-size: 14px;
    margin: 8px 0;
}
.content span{
    font-size: 14px;
    
}
.comment-img{
    width: 70px;
    height: 70px;
    margin: 10px 5px 0 0;
    
}
</style>