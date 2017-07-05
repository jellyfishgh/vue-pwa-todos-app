import Home from '@/components/Home'
import TodoApp from '@/components/TodoApp/TodoApp'

export default [
  {
    path: '/',
    to: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todo-app/:filter?',
    to: '//todo-app',
    name: 'TodoApp',
    component: TodoApp
  }
]
