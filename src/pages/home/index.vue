<template>
  <div class="home-page">
    <van-tabs v-model:active="activeIdx" @change="changeTab" sticky>
      <van-tab v-for="tab in tabsType" :title="tab.title" :key="tab.key">
        <template v-if="listObj[tab.key].length">
          <div class="list-wrapper">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
            <topic-card v-for="topic in listObj[tab.key]" :topic="topic" :key="topic.id"></topic-card>
          </van-list>
         </van-pull-refresh>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { getTopicsList } from '@/service/topics'
import { useTopics } from '@/store/topics.js'
import TopicCard from './components/TopicCard.vue'

onMounted(async () => {
  const res = await getList()
  if (res) {
    topics.updateList('all', res)
  }
})

// 所有 tabs 类型
const tabsType = [
  { title: '全部', key: 'all' },
  { title: '精华', key: 'good' },
  { title: '分享', key: 'share' },
  { title: '问答', key: 'ask' },
  { title: '招聘', key: 'job' }
]

// topic store
const topics = useTopics()

// 各 key 下的列表
const listObj = reactive({
  all: computed(() => topics.all),
  good: computed(() => topics.good),
  share: computed(() => topics.share),
  ask: computed(() => topics.ask),
  job: computed(() => topics.job)
})

// 当前激活状态的tab的索引
const activeIdx = ref(0)

// 当前激活状态的tab的key
const activeKey = computed(() => tabsType[activeIdx.value].key)

// 获取主题列表
const params = reactive({
  page: 1,
  tab: 'all',
  limit: 20
})
const getList = async () => {
  const res = await getTopicsList(params)
  console.log('获取主题列表', res)
  if (res.success) {
    return res.data
  } else {
    return []
  }
}

// 根据 key 更新列表
const updateListByKey = async (key = 'all') => {
  params.tab = key
  const list = await getList()
  if (list) {
    topics.updateList(key, list)
    return true
  } else {
    return false
  }
}

// 切换tab
const changeTab = async (idx) => {
  activeIdx.value = idx
  params.page = 1
  const currentList = topics[activeKey.value]
  if (!currentList.length) {
    updateListByKey(activeKey.value)
  }
}

// 滚动加载列表
const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  if (!finished.value) {
    params.page += 1
    const list = await getList()
    if (list) {
      const tempList = listObj[activeKey.value].concat(list)
      topics.updateList(activeKey.value, tempList)
      loading.value = false
      // 判断是否全加载完
      finished.value = list.length < params.limit
    }
  }
}

// 下拉刷新
const refreshing = ref(false)
const onRefresh = async () => {
  params.page = 1
  topics.updateList(activeKey.value, []) // 清空原列表
  const res = await updateListByKey(activeKey.value)
  if (res) {
    refreshing.value = false
  }
}

</script>

<style lang="less" scoped>
.home-page{
  background-color: #F5F5F5;
}
.list-wrapper{
  height: calc(100vh - 94px);
  overflow: scroll;
}
</style>
