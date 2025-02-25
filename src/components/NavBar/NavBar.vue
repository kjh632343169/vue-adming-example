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
          {{ item.name }}
          <el-icon v-if="hoverKey === item.name && hoverKey !== 'Home'" @click="deleteRoute(item)"
            ><Delete
          /></el-icon>
        </div>
      </el-button>
      <el-button
        v-else
        @click="jumpUrl(item)"
        @mouseenter="hoverKey = item.name"
        @mouseleave="hoverKey = ''"
        ><div class="btn-wrap">
          {{ item.name }}
          <el-icon v-if="hoverKey === item.name && hoverKey !== 'Home'" @click="deleteRoute(item)"
            ><Delete
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

import { FlatRouteMap, RouteName } from '@/router/index'
import { useCacheStore } from '@/stores/routeCache'

interface RouteItem {
  key: string
  name: string
}

const DefaultRouteList = [
  {
    key: RouteName.Home,
    name: RouteName.Home,
  },
]

const router = useRouter()

const cacheStore = useCacheStore()

const { cachedViews, curRouteName } = storeToRefs(cacheStore)

const hoverKey = ref('')

const showViewsList = computed(() => {
  return _.unionWith(DefaultRouteList, cachedViews.value, _.isEqual)
})

const jumpUrl = (item: RouteItem) => {
  const { key, name } = item
  const route = FlatRouteMap[name]
  if (route.meta?.keyStrategy === 'path') {
    router.push({
      path: key,
    })
  } else {
    router.push({
      name,
    })
  }
}

const deleteRoute = (item: RouteItem) => {
  cacheStore.removeView(item.name)
  const latelyItem = cachedViews.value[cachedViews.value.length - 1] || DefaultRouteList[0]
  jumpUrl(latelyItem)
}
</script>

<style scoped>
.nav-wrap {
  display: flex;
  gap: 3px;
  padding: 4px;
  background-color: #fff;
}

.btn-wrap {
  display: flex;
  align-items: center;
  gap: 3px;
}
</style>
