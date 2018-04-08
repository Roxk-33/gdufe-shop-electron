import Mock from 'mockjs'


export default {
    fetchStockList: () => {
        let data = Mock.mock({
            'goods|4-10':[
                {
                    good_id: '@id',
                    good_name: '@cname',
                    'good_stock|1-100': 100,
                    status: true,
                    good_divide:'@cname'
                },
            ],
            'total|1-100':100,            
            status : true
        })
        return data
    }
}

