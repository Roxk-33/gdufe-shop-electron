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

export const asyncRouterMap = [{
        path: '/stock',
        component: Layout,
        redirect: 'noredirect',
        name: 'stock',
        meta:{
            roles: ['stocker','manager','accountant']
        },
        children: [
            { path: 'catalog', component: _import('stock/catalog/index'), name: 'catalog', meta: { title: 'catalogStock', noCache: true, icon: 'catalog' } },
        ],
    },
    {
        path: '/sale',
        component: Layout,
        redirect: 'noredirect',
        name: 'settleAccounts',
        meta:{
            roles: ['saler']
        },
        children: [
            { path: 'index', component: _import('settleAccounts/index'), name: 'sale', meta: { title: 'settleAccounts', noCache: true, icon: 'sale'} },
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
            { path: 'addAccount', component: _import('account/addAccount/index'), name: 'addAccount', meta: { title: 'addAccount', noCache: true, icon: 'addAccount' } },
            { path: 'catalogAccount', component: _import('account/catalog/index'), name: 'catalogAccount', meta: { title: 'catalogAccount', noCache: true, icon: 'catalog' } },
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
        path: '/purchaseListByadmin',
        component: Layout,
        redirect: 'noredirect',
        name: 'purchaseListByadmin',
        meta: {
            title: 'purchaseListByadmin',
            icon: 'purchaseManagement',
            roles: ['manager']
        },
        children: [
            { path: 'list', component: _import('purchase/index'), name: 'purchaseList', meta: { title: 'purchaseList', icon: 'purchaseList', roles: ['manager']} },
            { path: 'adjunction', component: _import('purchase/addList/index'), name: 'addPurchase', meta: { title: 'addPurchase', icon: 'adjunction',roles: ['manager'] } },
        ],
    },


    {
        path: '/addVip',
        component: Layout,
        redirect: '/addVip/index',
        meta: { roles: ['saler'] }, // you can set roles in root nav    
        children: [{
            path: 'index',
            component: _import('vip/addVip/index'),
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
        meta: { 
            roles: ['stocker'],
        },
        children: [{
            path: 'list',
            component: _import('purchase/index'),
            name: 'purchaseList',
            meta: {
                title: 'purchaseList',
                icon: 'purchaseList', 
            }
        }],
    },

    {
        path: '/priceSetting',
        component: Layout,
        redirect: 'noredirect',
        meta: {
            
            roles: ['manager', 'accountant']
        },
        children: [{
            path: '',
            component: _import('priceSetting/index'),
            name: 'priceSetting',
            meta:{
                title: 'priceSetting',
                icon: 'priceSetting',
            }
        }],
    },
    {
        path: '/vipList',
        component: Layout,
        redirect: 'noredirect',
        meta: {
            roles: ['manager', 'accountant']
        },
        children: [{
            path: '',
            component: _import('vip/catalog/index'),
            name: 'vipList',
            meta: {
                title: 'vipList',
                icon: 'catalog',
            }
        }],
    },
    {
        path: '/loss',
        component: Layout,
        redirect: 'noredirect',
        meta: {
            title: 'lossAdmin',
            icon: 'management',
        },
        children: [{
                path: 'list',
                component: _import('loss/catalog'),
                name: 'lossList',
                meta: {
                    title: 'lossList',
                    icon: 'catalog',
                    roles: ['stocker', 'accountant','manager']
                    
                }
            },
            {
                path: 'add',
                component: _import('loss/loss'),
                name: 'lossAdd',
                meta: {
                    title: 'lossAdd',
                    icon: 'adjunction',
                    roles: ['stocker', 'saler']
                    
                }
            },

        ],
    },
    { path: '*', redirect: '/404', hidden: true }
]