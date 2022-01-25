<template>
    <div class="topic-card">
        <div class="title">{{topic.title}}</div>
        <div class="desc">
            <div v-if="imgs.length<3" class="img-and-text">
                <div class="text van-multi-ellipsis--l3">{{getDescText(topic.content)}}</div>
                <van-image v-if="imgs.length>0" class="img" width="100" height="75" fit="cover" radius="4" lazy-load :src="imgs[0]">
                    <template v-slot:error>加载失败</template>
                </van-image>
            </div>
            <div v-if="imgs.length===3" class="imgs-box">
                <van-image width="100" height="75" fit="cover" radius="4"  lazy-load v-for="(item,idx) in imgs" :src="item" :key="idx">
                    <template v-slot:error>加载失败</template>
                </van-image>
            </div>
        </div>
        <div class="info">
            <div class="author">{{topic.author.loginname}}</div>
            <div class="visit"><van-icon name="eye-o" /> {{topic.visit_count}}</div>
            <div class="reply"><van-icon name="comment-circle-o" /> {{topic.reply_count}}</div>
        </div>
    </div>
</template>

<script setup>
import { formatHtmlToString, getImgFromRichText } from '@/utils/index.js'
const props = defineProps({
  topic: Object
})

// 获取纯文本，提取前300字
const getDescText = (html) => {
  return formatHtmlToString(html).slice(0, 300)
}

// 提取图片，获取前三张
let imgs = getImgFromRichText(props.topic.content)
if (imgs.length > 3) {
  imgs = imgs.slice(0, 3)
}

</script>

<style lang="less" scoped>
.topic-card{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background-color: #ffffff;
    margin-bottom: 5px;
    .title{
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        line-height: 1.3;
    }
    .desc{
        margin-top: 5px;
        .imgs-box{
            display: flex;
            justify-content: space-between;
        }
        .img-and-text{
            display: flex;
            justify-content: space-between;
            .text{
                max-height: 60px;
                line-height: 20px;
                font-size: 14px;
                color: #333;
                flex-grow: 0;
                word-break:break-all;
            }
            .img{
                flex-shrink: 0;
                margin-left: 10px;
            }
        }
    }
    .info{
        display: flex;
        color: #adadad;
        font-size: 12px;
        margin-top: 10px;
        .author,.visit{
            margin-right: 10px;
        }
    }
}
</style>
