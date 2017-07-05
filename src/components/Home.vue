<template>
  <div>
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
