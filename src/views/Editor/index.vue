<template>
    <div class="tiny">
        <div style="text-align:left;margin-bottom:10px;">
            <el-button type="text" @click="backToHome">BACK</el-button>
        </div>
        <UE ref="tiny" @save="saveSuccess"></UE>
    </div>
</template>

<script>
import UE from '@/components/tinymce/index.vue'
export default {
    name: 'Editor',
    data () {
        return {
        }
    },
    components:{ UE },
    mounted(){
        var that =this;
        let aid = this.$route.query.id;
        setTimeout(()=>{
            that.$refs.tiny.getInfo(aid)
        },500)
    },
    methods: {
        backToHome(){
            //this.$router.go(-1)
            this.$router.push('/');
        },
        /*
            问题新增/编辑/详情
        */ 
        //保存成功回调
        saveSuccess(){
            this.$message.success('保存成功！');
            this.backToHome();
        },
    }
}
</script>

<style lang="scss" scoped>
.tiny{
    padding: 1rem 1rem 0 21rem;
    display: block;
    position: relative;
    top: 3.6rem;
}
</style>
