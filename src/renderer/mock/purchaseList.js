import Mock from 'mockjs'

export default {
    fetchList: () => {
        let data = Mock.mock({
            'info|4-10':[
                {
                    no: '@id',
                    name: '@cname',
                    'status|0-1': 2,
                    'time':'@date()',
                    'importance|1-5':5
                }
            ],
            status : true
        })
        return data
    },
    fetchListDetail: (p) => {
        let data = Mock.mock({
            'info|4-10':[
                {
                    'goodNo|1-100000': 10000,
                    'purchaseNum|1-10': 10,
                    'purchaseStatus|0-2': 2,
                    goodName: '@word'
                }
            ],
            status : true
        })
        return data
    },
    fetchGoodInfo: (param) => {
        console.log(param);
        let data = Mock.mock({
            'info|1-10':[
                {
                    'goodNo|1-100000': 10000,
                    'goodName': '@word'
                }
            ],
            status : true
        })
        return data
    },
    addList: (data) => {
        console.log(data);
        return {
            status:true
        }
    },
    updateList: (data) => {
        console.log(data);
        return {
            status:true
        }
    },

}