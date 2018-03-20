import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import saleAPI from './sale'
import accountAPI from './account'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)


// 销售相关
Mock.mock(/\/front\/good\/in/, 'get', saleAPI.cartIn)
Mock.mock(/\/front\/good\/clean/, 'post', saleAPI.cartDeal)
Mock.mock(/\/front\/vip\/add/, 'post', saleAPI.addVip)
Mock.mock(/\/front\/vip\/check/, 'get', saleAPI.checkVip)


//账户
Mock.mock(/\/admin\/account\/list/, 'get', accountAPI.getAccountList)
Mock.mock(/\/admin\/account\/add/, 'post', accountAPI.addAccount)
Mock.mock(/\/admin\/account\/edit/, 'post', accountAPI.editAccount)

export default Mock
