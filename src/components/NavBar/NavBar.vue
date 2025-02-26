<template>
  <div class="nav-wrap">
    <div v-for="item in showViewsList" :key="item.key">
      <el-button
        v-if="curRouteName === item.name"
        type="primary"
        @mouseenter="hoverKey = item.name"
        @mouseleave="hoverKey = ''"
      >
        <div class="btn-wrap">
          {{ item.title }}
          <el-icon v-if="hoverKey === item.name && hoverKey !== 'Home'" @click="deleteRoute(item)"
            ><Close
          /></el-icon>
        </div>
      </el-button>
      <el-button
        v-else
        @click="jumpUrl(item)"
        @mouseenter="hoverKey = item.name"
        @mouseleave="hoverKey = ''"
        ><div class="btn-wrap">
          {{ item.title }}
          <el-icon v-if="hoverKey === item.name && hoverKey !== 'Home'" @click="deleteRoute(item)"
            ><Close
          /></el-icon>
        </div>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import _ from 'lodash'

import { type cachedViewsItem } from '@/stores/config'

import { RouteName } from '@/router/index'
import { useCacheStore } from '@/stores/routeCache'
import { Close } from '@element-plus/icons-vue'

// 默认展示
const DefaultRouteList = [
  {
    key: RouteName.Home,
    name: RouteName.Home,
    title: '首页',
  },
]

const router = useRouter()

const cacheStore = useCacheStore()
const { cachedViews, curRouteName } = storeToRefs(cacheStore)

const hoverKey = ref('')

const showViewsList = computed(() => {
  return _.unionWith(DefaultRouteList, cachedViews.value, _.isEqual)
})

const jumpUrl = (item: cachedViewsItem) => {
  const { key, name } = item
  if (key !== name) {
    router.push({
      path: key,
    })
  } else {
    router.push({
      name,
    })
  }
}

const deleteRoute = (item: cachedViewsItem) => {
  cacheStore.removeView(item.name)
  const latelyItem = cachedViews.value[cachedViews.value.length - 1] || DefaultRouteList[0]
  jumpUrl(latelyItem)
}
</script>

<style scoped>
.nav-wrap {
  display: flex;
  gap: 6px;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
}

.btn-wrap {
  display: flex;
  align-items: center;
  gap: 3px;
}
</style>
