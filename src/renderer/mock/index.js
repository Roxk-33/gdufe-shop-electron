import Mock from 'mockjs'
import loginAPI from './login'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import saleAPI from './sale'
import accountAPI from './account'
import purchaseAPI from './purchaseList'
import goodAPI from './good'
import stockAPI from './stock'

// Mock.setup({
//   timeout: '350-600'
// })
if (process.env.NODE_ENV === 'development') {
// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'get', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)



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


Mock.mock(/\/admin\/purchase\/list/, 'get', purchaseAPI.fetchList)
Mock.mock(/\/admin\/purchase\/detail/, 'get', purchaseAPI.fetchListDetail)
Mock.mock(/\/admin\/good\/ajax\/goodInfo/, 'get', purchaseAPI.fetchGoodInfo)
Mock.mock(/\/admin\/purchase\/add/, 'post', purchaseAPI.addList)
Mock.mock(/\/admin\/purchase\/storage/, 'post', purchaseAPI.updateList)



Mock.mock(/\/admin\/good\/info/, 'post', goodAPI.addGoodInfo)


Mock.mock(/\/admin\/stock\/list/, 'get', stockAPI.fetchStockList)
}

export default Mock
