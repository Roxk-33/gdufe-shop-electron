import Mock from 'mockjs'

export default {
    getAccountList: () => {

        let data = Mock.mock({
            'info|4-10':[
                {
                    no: '@id',
                    name: '@cname',
                    tel: 18024589062,
                    "job|1": ['saler','stocker','accountant'],
                    'sex|0-1': 2
                }
            ],
            status : true
        })
        return data
    },
    addAccount(){
        return{
            status:true,
            
        }
    },
    editAccount(){
        return{
            status:true,
            
        }
    }

}