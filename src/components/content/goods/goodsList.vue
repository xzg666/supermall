<template>
    <div class="goods">
        <goods-list-item v-for="(item,index) in goods" :key='index' :goodsItem="item" class="goods-item"></goods-list-item>
    </div>
</template>

<script>
import goodsListItem from './goodsListItem.vue'
    export default {
        props:{
            goods:{
                type:[],
                default(){
                    return []
                }
            }
        },
        components:{
            goodsListItem
        },
        
        
    }
</script>

<style  scoped>
.goods{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5px;
}
.goods-item{
    width: 46%;
    font-size: 12px;
    margin-bottom: 5%;
}
</style>