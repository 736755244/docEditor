<template>
  <div class="editor">
    <main class="page" v-loading="loading">
        <template v-if="total>0">
            <el-card class="box-card" v-for="(v,i) in articles" :key="i" >
                <h3>
                    <span class="el-icon-edit-outline titledit" @click="editArt(v,i)"></span>
                    <span class="titlelnk" @click="ShowDetail(v,i)">{{v.title}}</span>
                </h3>
                <p class="post_item_summary">
                    <img src="@/assets/images/logo.png" class="logo" alt="picture">
                    <span>{{v.sub_title}}</span>
                </p>
                <div class="post_item_foot">
                    <span class="article_comment">{{v.project}}</span>
                    <span class="article_view">{{v.solve}}</span>
                </div>
            </el-card>
            <div style="text-align:right;">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    next-text="Next" 
                    prev-text="Prev"
                    @current-change="currentChange"
                    :pager-count="5"
                    :current-page="apiData.page"
                    :page-size="apiData.size"
                    :total="total">
                </el-pagination>
            </div>
        </template>
        <template v-if="total==0">
            <div class="noData">暂无数据</div>
        </template>
    </main>
  </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            loading:true,
            pics:[10,15,20],//分页数
            total:0,
            apiData:{
                page:1,
                size:10,
                like:''
            },
            articles:[],
        }
    },
    mounted(){
        //获取文章列表
        this.apiData.like = this.query;
        this.getTableData();
    },
    computed:{
        query(){
            return this.$store.state.app.query;
        }
    },
    watch:{
        query(v){
            this.apiData.like = v;
            this.getTableData();
        }
    },
    methods: {
        /*
            列表操作
        */ 
        //列表
        getTableData(){
            this.$ajax
                .getList({
                    type: "post",
                    data: {
                        whereSql: this.apiData.like,
                        PageSize: this.apiData.size,
                        PageNumber:this.apiData.page
                    }
                }).then(res=>{
                    if(res.Status==1){
                        this.articles = res.Data;
                        this.total = res.PageModel.TotalCount;
                        // this.$message.success('查询成功！')
                    }else{
                        this.$message.warning('查询失败！')
                    }
                    this.loading = false;
                })
        },
        //当前页变化
        currentChange(v){
            this.page = v;
            this.getTableData();
        },
        //查看详情
        editArt(v,i){
            this.$router.push({path:"/toEditor",query:{id:v.ID}});
        },
        ShowDetail(v,i){
            this.$router.push({path:"/toDetail",query:{id:v.ID}});
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-collapse-item__header,
/deep/ .el-collapse-item__content{
    padding-left: 20px;
    padding-bottom: 0;
}
.editor{
    position: relative;
    padding-left: 20rem;
}
.noData{
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}
.page{
    padding: 1rem;//1rem 1rem 0 21rem;
    // padding-left: 20rem;
    // padding-bottom: 2rem;
    display: block;
    position: relative;
    top: 3.6rem;
    .box-card{
        margin: 8px 0;
        // height: 80px;
        h3{
            font-size: 14px;
            margin: 0 0 5px 0;
            .titlelnk{
                color: #105cb6;
                font-size: 14px;
                font-weight: bold;
                text-decoration: underline;
            }
            // a.titlelnk:visited{
            //     color: #551a8b;
            // }
            .titledit{
                margin-right: 10px;
                color: red;
            }
        }
        .post_item_summary{
            line-height: 1.8em;
            margin-bottom: 5px;
            color: #333;
            overflow: hidden;
            padding-right: 5px;
            font-size: 12px;
            padding-top: 5px;
            .logo{
                height: 48px;
                width: 48px;
                padding: 1px;
                margin-top: 3px;
                margin-right: 5px;
                border: 1px solid #ccc;
                float: left;
            }
        }
        .post_item_foot{
            color: #555;
            padding-top: 5px;
            text-align: right;
            // margin-left: 10px;
            .article_comment{
                // padding-left: 18px;
                padding-right: 5px;
                // margin-left: 1px;
            }
            .article_view{
                padding-left: 18px;
                padding-right: 5px;
                margin-left: 1px;
            }
        }
    }
}
</style>
