<template>
    <div class="tabbaritem" @click='tabClick'>
        <div class="icon" v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div class="icon-active" v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div class="text" :style="textColor">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            path:String,
            activeColor:{
                type:String,
                default:'deepPink'
            }
        },
        data(){
            return{
                
            }
        },
        methods:{
            tabClick(){
                console.log(this.path)//上一个组件传来的地址
                this.$router.push(this.path)
                console.log(this.$route.path)//当前活跃地址
            }
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1//判断传来地址是否与当前活跃地址一致
            },
            textColor(){
                return this.isActive?{color:this.activeColor}:{}//如果isActive为true，那么是活跃的,加上props的样式，否则不加样式
            }
        }
    }
</script>

<style  scoped>
.tabbaritem{flex:1;text-align: center;}
.icon img,.icon-active img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 5px;
}

</style>