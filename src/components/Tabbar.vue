<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/message" icon="chat-o">消息</van-tabbar-item>
    <van-tabbar-item to="/mine" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'

let active = ref(0)
const onChange = (index) => {
  active = index
}
</script>
