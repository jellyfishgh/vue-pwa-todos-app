<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input v-auto-focus :value="newTodo" type="text" class="new-todo" placeholder="What needs to be done?" @keydown="handleNewTodoKeyDown" @input="handleInputChange"></input>
    </header>
    <section class="main" v-show="hasItems">
      <input type="checkbox" id="toggle-all" class="toggle-all" :checked="activeCount===0" @change="toggleAllHandler"></input>
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <todo-item v-for="({id, value, completed}) of items.filter(itemFilter)" :key="id" :editing="editingId === id" :id="id" :value="value" :completed="completed" @cancelEdit="onCancelEdit" @editItem="onEditItem" @saveItems="saveItems" @changeItem="changeItem"></todo-item>
      </ul>
    </section>
    <footer class="footer" v-show="hasItems">
      <span class="todo-count">
        <strong>{{activeCount}}</strong> item{{activeCount > 1 ? 's' : ''}} left</span>
      <ul class="filters">
        <li v-for="(filter, index) of filters" :key="index">
          <router-link :to="'/todo-app/'+filter" :class="{selected: currentFilter === filter}">{{filter|capitalizeFilter}}</router-link>
        </li>
      </ul>
      <button class="clear-completed" @click="clearHandler" v-show="items.length - activeCount > 0">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import 'todomvc-app-css/index.css'
import { mapGetters } from 'vuex'
import TodoItem from './TodoItem'
import { ENTER_KEY } from './config'
import uuidv1 from 'uuid/v1'
import * as types from './mutation-types'
export default {
  name: 'TodoApp',
  computed: {
    ...mapGetters(['items']),
    hasItems() {
      return this.items && this.items.length > 0
    },
    activeCount() {
      return this.getActiveItems().length
    }
  },
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: '',
      filters: ['all', 'active', 'completed'],
      currentFilter: 'all',
      editingId: ''
    }
  },
  created() {
    const { filter = 'all' } = this.$route.params
    this.currentFilter = filter
  },
  beforeRouteUpdate(to, from, next) {
    const { filter = 'all' } = to.params
    this.currentFilter = filter
    next()
  },
  filters: {
    capitalizeFilter(value) {
      return `${value[0].toUpperCase()}${value.slice(1)}`
    }
  },
  directives: {
    'auto-focus': {
      inserted(el) {
        el.focus()
      }
    }
  },
  methods: {
    itemFilter({ completed }) {
      switch (this.currentFilter) {
        case 'active': return !completed
        case 'completed': return completed
        default: return true
      }
    },
    handleInputChange(e) {
      this.newTodo = e.target.value
    },
    handleNewTodoKeyDown(e) {
      if (e.keyCode !== ENTER_KEY) return
      e.preventDefault()
      const newTodo = this.newTodo.trim()
      if (newTodo) {
        this.addNewTodo(newTodo)
        this.newTodo = ''
      }
    },
    addNewTodo(newTodo) {
      this.saveItems([{
        value: newTodo,
        completed: false,
        id: uuidv1()
      }].concat(this.items))
    },
    getActiveItems() {
      return this.items.filter(({ completed }) => !completed)
    },
    clearHandler() {
      this.saveItems(this.getActiveItems())
    },
    saveItems(items) {
      this.$store.commit(types.SAVE_TODO_ITEMS, items)
    },
    toggleAllHandler(e) {
      this.changeItem({k: 'completed', v: e.target.checked})
    },
    changeItem({k, v, when = () => true}) {
      this.saveItems(this.items.map(i => {
        const item = Object.assign({}, i)
        when(item) && (item[k] = v)
        return item
      }))
    },
    onCancelEdit() {
      this.editingId = ''
    },
    onEditItem({ id }) {
      this.editingId = id
    }
  }
}
</script>

