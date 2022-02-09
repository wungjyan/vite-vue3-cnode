<template>
    <div class="article-page" v-if="topic">
        <div class="top-cell">
            <van-icon name="arrow-left" @click="toBack" />
        </div>
        <div class="article-info">
            <div class="title">{{topic.title}}</div>
            <div class="meta">
                <span>发布于 {{formatTime(topic.create_at)}}</span><i class="dot">•</i>
                <span>作者 {{topic.author.loginname}}</span><i class="dot">•</i>
                <span>阅读 {{topic.visit_count}}</span><i class="dot">•</i>
                <span>来自 {{formatTag(topic.tab)}}</span>
            </div>
        </div>
        <div class="content" v-html="topic.content"></div>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTopicDetail } from '@/service/topics.js'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// 主题信息对象
const topic = ref(null)

onMounted(() => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })
  getDetail()
})

const route = useRoute()
const articleId = route.query.id

const getDetail = async () => {
  const res = await getTopicDetail(articleId, { mdrender: false })
  if (res && res.success) {
    res.data.content = marked(res.data.content)
    topic.value = res.data
    console.log('获取详情===', topic)
  }
}

// 返回上一页
const router = useRouter()
const toBack = () => {
  router.go(-1)
}

// 时间格式化
const { proxy } = getCurrentInstance()
const formatTime = (timeStr) => proxy.$dayjs(timeStr).fromNow()

// 获取标签
const tabs = {
  share: '分享',
  ask: '问答',
  job: '招聘'
}
const formatTag = (key) => tabs[key]
</script>

<style lang="less" scoped>
.article-page{
    padding: 0 10px;
    .top-cell{
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        font-size: 20px;
    }
    .article-info{
        .title{
            font-size: 24px;
            color: #000;
            font-weight: 500;
        }
        .meta{
            color: #666;
            font-size: 12px;
            margin-top: 10px;
            .dot{
                font-size: 10px;
                color: #999;
                margin: 0 3px;
            }
        }
    }
    .content{
        font-size: 16px;
        color: #333;
        word-break: break-all;
        line-height: 1.5;
        // :deep(img){
        //     max-width: 100%;
        // }
        ::v-deep img{
            max-width: 100%;
        }
        ::v-deep pre{
            overflow-x: auto;
        }
    }
}
</style>
