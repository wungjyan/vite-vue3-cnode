<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/message" icon="chat-o" badge="5">消息</van-tabbar-item>
    <van-tabbar-item to="/mine" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue'

let active = ref(0)
const onChange = (index) => {
  active = index
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
