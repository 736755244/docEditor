<template>
    <div class="detail">
        <div style="text-align:left;margin-bottom:10px;">
            <el-button type="text" @click="backToHome">BACK</el-button>
        </div>
        <div class="cont" v-loading="loading">
            <div class="dtitle">{{title}}</div>
            <hr>
            <div v-html="content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    data () {
        return {
            loading:true,
            content:'',
            title:''
        }
    },
    mounted(){
        let aid = this.$route.query.id;
        setTimeout(()=>{
            this.getInfo(aid)
        },500)
    },
    methods: {
        backToHome(){
            //this.$router.go(-1)
            this.$router.push('/');
        },
        //获取信息
        getInfo(id){
            if(!id || id==0){
                this.loading = false;
                return
            }
            this.$ajax
                .getByID({
                    type: "get",
                    data: {
                        id: id
                    }
                }).then(res=>{
                    if(res.Status==1){
                        this.title = res.Data.title;
                        this.content = res.Data.content;
                    }else{
                        console.log('查询失败！')
                    }
                    this.loading = false;
                })
        },
    }
}
</script>

<style lang="scss" scoped>
.detail{
    padding: 1rem 1rem 0 21rem;
    display: block;
    position: relative;
    top: 3.6rem;
    .cont{
        font-size: 14px;
        padding: 10px 5px;
        .dtitle{
            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }
    }
}
</style>
