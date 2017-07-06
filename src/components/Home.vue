<template>
  <div class="hello">
    <h1>Welcome to Your Vue.js PWA</h1>
    <ul>
      <li v-for="({to, name}) of routes" :key="to">
        <router-link :to="to">{{name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import routes from '@/router/routes'
export default {
  name: 'Home',
  metaInfo: {
    title: '主页'
  },
  data() {
    return {
      routes
    }
  }
}
</script>
