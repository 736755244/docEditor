<template>
    <div class="navbar">
       <div class="nav_title">一般性问题处理方法</div>
       <div v-if="isShowNav">
           <div class="nav_btns">
                <el-button size="small" @click="addArticle">新增</el-button>
            </div>
            <div class="nav_search">
                <!-- <el-autocomplete
                    size="small"
                    suffix-icon="el-icon-search"
                    v-model="like"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入问题描述..."
                    :trigger-on-focus="false">
                    <template slot-scope="{ item }">
                        <div @click="handleSelect(item)">{{item.title}}</div>
                    </template>
                </el-autocomplete> -->
                <el-input 
                    size="small"
                    placeholder="请输入问题描述..."
                    v-model="like">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
                </el-input>
            </div>
       </div>
    </div>
</template>
<script>
    export default {
        name:'NavBar',
        data () {
            return {
                like:''
            }
        },
        components: {
        },
        computed: {
           isShowNav(){
               return this.$route.path=='/home';
           }
        },
        methods: {
            addArticle(){
                this.$router.push({path:"/toEditor",query:{id:0}});
            },
            //自动搜索
            querySearch(qs,cb){
                this.$ajax
                    .getByTitle({
                        type: "get",
                        data: {
                            title: qs
                        }
                    }).then(res=>{
                        if(res.Status==1){
                            cb(res.Data)
                        }else{
                            console.log('查询失败！')
                        }
                    })
            },
            //手动选择
            handleSelect(item){
                this.$router.push({path:"/toEditor",query:{id:item.ID}});
            },
            //
            search(){
                this.$store.dispatch('SetQuery', this.like)
                // console.log(this.$store.state.app.query)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .navbar{
    position: fixed;
    top:0;
    left: 0;
    z-index: 20;
    right: 0;
    height: 3.6rem;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
    padding: .7rem 1.5rem;
    line-height: 2.2rem;
    .nav_title{
        float: left;
        font-size: 20px;
        font-weight: bold;
    }
    .nav_btns{
        float: right;
    }
    .nav_search{
        float: right;
        margin-right: 30px;
    }
}
</style>

