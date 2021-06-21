<template>
    <div class="slider">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item class="colla" title="3.4" name="1">
                <div class="colitem">3.4.1</div>
                <div class="colitem">3.4.2</div>
                <div class="colitem">3.4.3</div>
            </el-collapse-item>
            <el-collapse-item class="colla" title="4.0" name="2">
                <div class="colitem">4.0.1</div>
                <div class="colitem">4.0.2</div>
                <div class="colitem">4.0.2</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    export default {
        name:'SliderBar',
        data () {
            return {
                activeNames:[],
            }
        },
        components: {
        },
        computed: {
        },
        methods: {
            //折叠面板点击事件
            handleChange(v){
                console.log(v)
            },
            //返回列表页
            handleBack(){
            },
        }
    }
</script>

<style lang="scss" scoped>
/deep/ .el-collapse-item__header,
/deep/ .el-collapse-item__content{
    padding-left: 20px;
    padding-bottom: 0;
}
.slider{
    font-size: 16px;
    background-color: #fff;
    width: 20rem;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 3.6rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
    .colla{
        .colitem{
            padding: 5px;
            cursor: pointer;
        }
        .colitem:first-child{
            border-top: 1px solid #eaecef;
        }
        .colitem:not(:last-child){
            border-bottom: 1px solid #eaecef;
        }
    }
}
</style>

