import Mock from 'mockjs'

const List = []
const count = 20

export default {
    cartIn: (data) => {
        return {
            status: true,
            info: Mock.mock({
                'good_no|1-100000': 10000,
                'good_num|1-10': 10,
                good_price: '@float(100, 150, 0, 2)',
                'status|1': true,
                good_name: '@word'
            }),
        }
    },
    cartDeal: () => {
        return {
            status: true,
            info: '成功'
        }
    },
    addVip: () => {
        return {
            status: true,
            message: '成功'
        }
    },
    checkVip: () => {
        return {
            status: true,
            info: Mock.mock({
                no: '@id',
                name: '@cname',
                tel: 18024589062,
                'sex|1-2': 3
            })
        }
    }
}