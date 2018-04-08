import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/stock',
    component: Layout,
    redirect: 'noredirect',
    name: 'stock',
    meta: {
      title: 'stock',
      icon: 'menu',
      roles: ['stocker']
    },
    children: [
      { path: 'catalog', component: _import('stock/catalog/index'), name: 'catalog', meta: { title: 'catalogStock', noCache: true,icon:'catalog' }},
    ],
  },
  {
    path: '/account',
    component: Layout,
    redirect: 'noredirect',
    name: 'account',
    meta: {
      title: 'accountAdmin',
      icon: 'management',
      roles: ['manager']
    },
    children: [
      { path: 'addAccount', component: _import('account/addAccount/index'), name: 'addAccount', meta: { title: 'addAccount', noCache: true,icon:'addAccount' }},
      { path: 'catalogAccount', component: _import('account/catalog/index'), name: 'catalogAccount', meta: { title: 'catalogAccount', noCache: true, icon:'catalog' }},
    ],
  },
  {
    path: '/addGood',
    component: Layout,
    redirect: '/addGood/index',
    meta: { roles: ['accountant'] }, // you can set roles in root nav    
    children: [{
      path: 'index',
      component: _import('addGood/index'),
      name: 'addGood',
      meta: {
        title: 'addGood',
        icon: 'adjunction',
      }
    }],
  },

  {
    path: '/purchaseList_admin',
    component: Layout,
    redirect: 'noredirect',
    name: 'purchaseList_admin',
    meta: {
      title: 'purchaseList_admin',
      icon: 'management',
      roles: ['manager']
    },
    children: [
      { path: 'list', component: _import('purchase_manage/list/index'), name: 'purchaseList', meta: {title: 'purchaseList',icon: 'catalog',}},
      { path: 'adjunction', component: _import('purchase_manage/add/index'), name: 'addPurchase', meta: { title: 'addPurchase',  icon:'adjunction' }},
    ],
  },


  {
    path: '/addVip',
    component: Layout,
    redirect: '/addVip/index',
    meta: { roles: ['saler'] }, // you can set roles in root nav    
    children: [{
      path: 'index',
      component: _import('addVip/index'),
      name: 'vipAdd',
      meta: {
        title: 'vipAdd',
        icon: 'addAccount',
      }
    }],
  },
  {
    path: '/purchaseBystock',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['stocker'] }, 
    children: [{
      path: 'list',
      component: _import('purchase_stock/index'),
      name: 'purchaseList',
      meta: {
        title: 'purchaseList',
        icon: 'catalog',
      }   
    }
    ],
  },
  { path: '*', redirect: '/404', hidden: true }
]
