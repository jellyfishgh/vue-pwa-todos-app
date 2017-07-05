<template>
  <li :class="{completed: completed, editing: editing}">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="completed" @change="changeItem('completed', !completed)"></input>
      <label @dblclick="handleEdit">{{value}}</label>
      <button class="destroy" @click="deleteItem"></button>
    </div>
    <input v-todo-focus="editing" ref="editField" class="edit" :value="editText" @blur="handleSubmit" v-model="editText" @keydown="handleKeyDown"></input>
  </li>
</template>

<script>
import { ENTER_KEY, ESCAPE_KEY } from './config'
import { mapGetters } from 'vuex'
export default {
  props: ['id', 'value', 'completed', 'editing'],
  data() {
    return {
      editText: this.value
    }
  },
  computed: mapGetters(['items']),
  directives: {
    'todo-focus': (el, binding) => {
      if (binding.value) {
        el.focus()
        el.setSelectionRange(el.value.length, el.value.length)
      }
    }
  },
  methods: {
    deleteItem() {
      this.$emit('saveItems', this.items.filter(({ id }) => id !== this.id))
    },
    handleSubmit() {
      const editText = this.editText.trim()
      this.$emit('cancelEdit')
      if (editText) {
        this.changeItem('value', editText)
      } else {
        this.deleteItem()
      }
    },
    changeItem(k, v) {
      this.$emit('changeItem', { k, v, when: item => item.id === this.id })
    },
    handleEdit() {
      this.$emit('editItem', { id: this.id })
    },
    handleKeyDown(e) {
      const keyCode = e.keyCode
      if (keyCode === ENTER_KEY) this.handleSubmit()
      else if (keyCode === ESCAPE_KEY) {
        this.editText = this.value
        this.$emit('cancelEdit')
      }
    }
  }
}
</script>
