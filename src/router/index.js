import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../pages/Main'
import Task from '../pages/tasks/Task'
import TaskCategories from '../pages/tasks/Categories'
import TaskList from '../pages/tasks/List'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/task/details/:task_id',
            name: 'Task',
            component: Task
        },
        {
            path: '/task/list/:category_id',
            name: 'TaskList',
            component: TaskList
        },
        {
            path: '/task/categories',
            name: 'TaskCategories',
            component: TaskCategories
        }
    ]
})
