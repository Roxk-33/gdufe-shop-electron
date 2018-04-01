import Mock from 'mockjs'


export default {
    fetchStockList: () => {
        let data = Mock.mock({
            'info|4-10':[
                {
                    goodNo: '@id',
                    goodName: '@cname',
                    'goodStock|1-100': 100,
                    status: true,
                },
            ],
            'total|1-100':100,            
            status : true
        })
        return data
    }
}