import Mock from 'mockjs'


const goodName = ['皮尔卡丹男装T恤','BDCT自制 日系复古纯色针织开衫','春秋中老年人羊毛背心',
'羊绒背心男V领羊毛针织开衫','2018春季纯羊毛经典tb针织衫','戴森吹风机','国行Apple苹果iphone AirPods无线耳机','Apple/苹果iphone AirPods无线耳麦','Beats Beatsx Beats X入耳式蓝牙无线耳机','姜力洗发水正品专柜清洁控油','远方正品舒霖去屑洗发水'
,'amino mason氨基酸','韩国正品爱敬kerasys 香水洗发水','海盐舒缓头皮洁净霜头皮清洁海盐洗发水','英国正品THE BODY SHOP生姜洗发水','生姜王洗发水防脱发生发增发','生姜王洗发水防脱发生发增发','姜力洗发水正品专柜','宁夏枸杞','三叔公雪之恋麻薯']
export default {
    getSale: () => {
        let data = Mock.mock({
            // 'result':'@range(100, 170, 10)',

            'result|20':[
                /\d{2,3}/
            ],
            // 'result|15-30':[{
            //     'good_id|1-100':100,
            //     'good_name|1':goodName,
            //     'user_id|1-5':5,
            //     'worker_id|1-5':5,
            //     'total_pay':/\d{1,3}/,
            //     'create_time':function () {
            //         return parseInt((Date.parse(new Date()) - 86400000 * 6)/1000 );
            //     }
            // }],


            status : true
        })
        console.log(data);
        return data

    },
}