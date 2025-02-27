<!-- App.vue -->
<template>
  <div>
    <div class="layout-view" v-if="isLayoutPage">
      <!-- <LayoutHeader /> -->
      <div class="layout-content">
        <div class="layout-list">
          <NavMenu />
        </div>
        <div class="page-view">
          <!-- <PageHeader /> -->
          <div class="page-view-bar">
            <NavBar />
          </div>
          <div class="page-view-content">
            <router-view v-slot="{ Component, route }">
              <KeepAlive :include="cachedViews.map((i) => i.name)" :max="10">
                <component
                  :is="Component"
                  :key="resolveKey(route as any)"
                  v-if="shouldRefresh(route as any)"
                />
              </KeepAlive>
            </router-view>
          </div>

          <!-- <PageBottom /> -->
        </div>
      </div>
      <!-- <LayoutBottom /> -->
    </div>
    <div v-else>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { type RouteRecordRaw } from 'vue-router'

import { useCacheStore } from '@/stores/routeCache'
import NavBar from './components/NavBar/NavBar.vue'
import NavMenu from './components/NavMenu/NavMenu.vue'
// import PageBottom from './components/Layout/PageBottom.vue'
// import PageHeader from './components/Layout/PageHeader.vue'
// import LayoutHeader from './components/Layout/LayoutHeader.vue'
// import LayoutBottom from './components/Layout/LayoutBottom.vue'

import { useRoute } from 'vue-router'
import { ref, watch, nextTick } from 'vue'

const route = useRoute()

const isLayoutPage = ref(false)

const cacheStore = useCacheStore()
const { cachedViews } = storeToRefs(cacheStore)

watch(
  () => route,
  () => {
    if (Object.keys(route.meta).includes('layout')) {
      isLayoutPage.value = route.meta.layout as boolean
    } else {
      isLayoutPage.value = true
    }
    if (route.meta?.title) {
      document.title = route.meta.title as string
    } else {
      document.title = '项目名称'
    }

    const key = cacheStore.generateKey(route as never)
    const item = cachedViews.value.find((i) => i.key === key)
    if (item && item.scrollTop > 0) {
      nextTick(() => {
        const scrollContainer = document.querySelector('.page-view-content')
        scrollContainer?.scrollTo(0, item.scrollTop)
      })
    }
  },
  { deep: true },
)

// 动态生成缓存 Key
const resolveKey = (route: RouteRecordRaw) => {
  return route.meta?.keyStrategy === 'path' ? route.path : route.name || route.meta?.cacheKey
}

// 处理强制刷新逻辑
const shouldRefresh = (route: RouteRecordRaw) => {
  return !route.meta?.keepAlive || cacheStore.shouldReload(route)
}
</script>

<style scoped>
.layout-content {
  height: 100vh;
  display: flex;
}

.page-view {
  flex: 1;
  min-width: 1024px;
  display: flex;
  flex-direction: column;
}

.page-view-bar {
  flex-shrink: 0;
}

.page-view-content {
  flex: 1;
  height: 100%;
  margin: 12px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  overflow: auto;
}

.layout-list {
  flex-shrink: 0;
  height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
