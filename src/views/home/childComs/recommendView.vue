<template>
    <div class="recommend">
        <div v-for="(item,index) in recoData" :key='index' class="recomItem">
            <a :href="item.link">
                <img :src="item.image" class="recoImg"/>
                <p class='recomText'>{{item.title}}</p>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            recoData:{
                type:Array,
                default(){
                    return []
                }
            }
        }
        
    }
</script>

<style  scoped>
.recommend{width: 100%;display: flex;padding: 10px 0 20px 0;border-bottom: 10px solid #eee;}
.recomItem{flex: 1;text-align: center;}
.recoImg{width: 65px;height: 65px;}
.recomText{font-size: 14px;margin-top: 5px;}
</style>