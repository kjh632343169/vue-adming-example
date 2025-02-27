<template>
  <div class="nav-wrap">
    <div class="nav-icon">
      <el-icon @click="toggleMenu = !toggleMenu" size="18">
        <Expand v-if="toggleMenu" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="nav-content-wrapper">
      <el-scrollbar wrap-style="display: flex;align-items:center">
        <div class="nav-content">
          <div
            v-for="item in showViewsList"
            :key="item.key"
            @mouseenter="hoverKey = item.name"
            @mouseleave="hoverKey = ''"
            :class="hoverKey === item.name ? 'route-hover content-item' : 'content-item'"
          >
            <div
              @click="jumpUrl(item)"
              :class="curRouteName === item.name ? 'menu-item active-menu-item' : 'menu-item'"
            >
              {{ item.title }}
              <el-icon
                @mouseenter="iconHoverKey = item.name"
                @mouseleave="iconHoverKey = ''"
                :class="iconHoverKey === item.name ? 'icon-hover' : ''"
                v-if="item.key !== RouteName.Home"
                @click.stop="deleteRoute(item)"
                ><Close
              /></el-icon>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="nav-options">
      <NavBarOptions />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import _ from 'lodash'

import { type cachedViewsItem } from '@/stores/config'

import { RouteName } from '@/router/config'
import { useCacheStore } from '@/stores/routeCache'
import { useUserStore } from '@/stores/userStore'

import NavBarOptions from './NavBarOptions.vue'

// 默认展示
const DefaultRouteList = [
  {
    key: RouteName.Home,
    name: RouteName.Home,
    title: '首页',
    scrollTop: 0,
  },
]

const router = useRouter()

const cacheStore = useCacheStore()
const userStore = useUserStore()
const { cachedViews, curRouteName } = storeToRefs(cacheStore)
const { toggleMenu } = storeToRefs(userStore)

const hoverKey = ref('')
const iconHoverKey = ref('')

const showViewsList = computed(() => {
  return _.unionWith(DefaultRouteList, cachedViews.value, (val, val2) => {
    return val.key === val2.key
  })
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
  hoverKey.value = ''
  iconHoverKey.value = ''
  const latelyItem = cachedViews.value[cachedViews.value.length - 1] || DefaultRouteList[0]
  jumpUrl(latelyItem)
}
</script>

<style scoped>
.nav-wrap {
  display: flex;
  gap: 6px;
  background-color: #fff;
  border-radius: 4px;
  align-items: center;
  height: 60px;
}

.nav-icon {
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 15px;
  border: 1px solid rgb(239, 239, 245);
}

.nav-content-wrapper {
  flex: 1;
  height: 100%;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-options {
  height: 100%;
  flex-shrink: 0;
  margin: 0 20px;
}

.content-item {
  flex-shrink: 0;
}

.menu-item {
  height: 36px;
  border: 1px solid rgb(239, 239, 245);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  cursor: pointer;
  gap: 6px;
  font-weight: 500;
}

.route-hover > .menu-item {
  border-color: #409eff;
  color: #409eff;
  background-color: rgb(235.9, 245.3, 255);
}

.active-menu-item {
  border-color: #409eff;
  color: #409eff;
}

.icon-hover {
  border-radius: 50%;
  background-color: #fff;
}
</style>
