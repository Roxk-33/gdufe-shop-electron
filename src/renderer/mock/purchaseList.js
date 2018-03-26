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
    fetchListDetail: () => {
        let data = Mock.mock({
            'info|4-10':[
                {
                    'good_no|1-100000': 10000,
                    'purchase_num|1-10': 10,
                    'purchase_status|0-2': 2,
                    good_name: '@word'
                }
            ],
            status : true
        })
        return data
    }

}