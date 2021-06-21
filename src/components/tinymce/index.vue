<template>
  <div class="ueditor" v-loading="loading">
    <div class="htitle">标题</div>
    <div class="title">
      <el-input
        placeholder="请输入标题"
        v-model="postData.title"
        clearable>
      </el-input>
    </div>
    <div class="htitle">内容</div>
    <vue-tinymce
      v-model="postData.content"
      :setup="setup"
      :setting="setting"/>
      <div style="margin-top:10px;">
        <el-row>
          <el-col :span="8">
            <span style="margin-right:10px;">所属项目</span>
            <el-select v-model="postData.project" size="small" placeholder="请选择所属项目">
              <el-option v-for="item in projects" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span style="margin-right:10px;">问题类型</span>
            <el-select v-model="postData.solve" size="small" placeholder="请选择问题类型">
              <el-option v-for="item in sovles" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">

          </el-col>
        </el-row>
      </div>
      <div style="text-align:center;margin:15px 0;">
        <el-button type="primary" round @click="save">发布内容</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UE',
  props:[],
  data () {
    return {
      loading:true,
      postData:{
        ID:0,
        title:'',
        project:'',
        solve:'',
        saveContent:'',
        sub_title: '这是一个固定的额摘要信息',
        creator:'admin',
      },
      //所属项目
      projects:[
        { label:'3.4_x',value:'3.4'},
        { label:'4.0_x',value:'4.0'}
      ],
      //解决方案
      sovles:[
        { label:'新增bug',value:'新增bug'},
        { label:'版本问题',value:'版本问题'}
      ],
      //
      setting: {
        // readonly: true,
        menubar: true,
        branding:false,
        statusbar:false,
        toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist |\
                    + image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough hr insertdatetime| \
                    +indent outdent | superscript subscript | removeformat | anchor codesample template preview |",// save|axupimgs 
        // toolbar_drawer: "sliding",
        quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars codesample template autoresize autosave save preview anchor hr autolink insertdatetime",
        language: 'zh_CN',
        // save_enablewhendirty:false,//允许保存空白内容
        min_height:700,
        max_height:700,
        // height: 850,
        // width:document.body.clientWidth-50 || 1000,
        //代码块自定义
        // codesample_languages: [
        //   {text: 'HTML/XML', value: 'markup'},
        //   {text: 'JavaScript', value: 'javascript'},
        //   {text: 'CSS', value: 'css'},
        // ],
        draggable_modal:false,//允许拖动
        automatic_uploads: true,
        //图片上传配置
        images_upload_handler: function(blobInfo, success, failure) {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', 'http://172.16.10.112:8080/Pmt/Api/File/UploadFile');
          xhr.onload = function () {
              var res = JSON.parse(xhr.responseText);
              success('http://172.16.10.112:8080/Pmt/Api/File/DownloadFile?FilePath='+res.Data.FilePath+'&FileName='+res.Data.DocName);
          };
          formData = new FormData();
          formData.append('file', blobInfo.blob());
          formData.append('DocName', blobInfo.filename());
          xhr.send(formData);
        },
        //所有文件上传入口
        file_picker_callback: function(callback, value, meta) {
          //文件分类
          // var filetype='',//'.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
          //模拟出一个input用于添加本地文件
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          // input.setAttribute('accept', filetype);
          input.click();
          input.onchange = function() {
            var file = this.files[0];
            var xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'http://172.16.10.112:8080/Pmt/Api/File/UploadFile');
            // xhr.open('POST', 'http://localhost:2326/Pmt/Api/File/UploadFile');
            xhr.onload = function() {
              var res = JSON.parse(xhr.responseText);
              //此处完整路径
              callback('http://172.16.10.112:8080/Pmt/Api/File/DownloadFile?FilePath='+res.Data.FilePath+'&FileName='+res.Data.DocName);
            };
            formData = new FormData();
            formData.append('file', file);
            formData.append("DocName", file.name);
            xhr.send(formData);
          }
        },
        file_picker_types: 'file image media',
        //自定义模板
        templates: [
          {title: '模板1', description: '', url: '/static/temp_doc/temp.html'}
        ],
        //模板日期格式化
        // template_cdate_classes: "cdate creationdate",
        // template_cdate_format: "%m/%d/%Y - %H:%M:%S",
        // save_onsavecallback: function (e) { 
        //     console.log(this.saveContent)
        // }
      }
    }
  },
  mounted(){
  },
  methods: {
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
              this.postData = res.Data;
            }else{
              console.log('查询失败！')
            }
            this.loading = false;
        })
    },
    setup(editor) {
      // console.log(editor)
    },
    save(){
      if(!this.postData.title){
        this.$message.warning('请填写标题！');
        return;
      }
      this.loading = true;
      this.$ajax
        .saveArt({
          type: "post",
          data: this.postData
        }).then(res=>{
          if(res.Status==1){
            this.$message.success('保存成功');
            this.$emit('save');
          }
          this.loading = false;
        })
    },
  }
}
</script>
<style lang="scss" scoped>
.ueditor{
  height: 100%;
  margin: 10px 10px 0;
  .htitle{
    margin: 3px 0;
    font-size: 15px;
  }
  .title{
    margin-bottom: 10px;
  }
}
</style>
