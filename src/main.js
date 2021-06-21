// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//elementui
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
Vue.use(ElementUI)

//样式
import 'tinymce/skins/content/default/content.min.css'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
//富文本插件
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
//主题
import 'tinymce/themes/silver'
//插件
import 'tinymce/plugins/link' //链接插件
import 'tinymce/plugins/image' //图片插件
import 'tinymce/plugins/axupimgs' //批量上传图片插件
import 'tinymce/plugins/media' //媒体插件
import 'tinymce/plugins/table' //表格插件
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/quickbars' //快速栏插件
import 'tinymce/plugins/fullscreen' //全屏插件
import 'tinymce/plugins/codesample' //代码插件
import 'tinymce/plugins/template' //代码插件
//5.3.x版本需要额外引进图标，没有所有按钮就会显示not found
import 'tinymce/icons/default/icons'
//本地化
import './utils/tinymce/langs/zh_CN.js'
import './utils/prism/prism.js'
import './utils/prism/prism.css'

import '@/styles/index.scss' // global css

Vue.prototype.$tinymce = tinymce
Vue.use(VueTinymce)

//
import api from '@/api/index'
Vue.prototype.$ajax = api;

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
