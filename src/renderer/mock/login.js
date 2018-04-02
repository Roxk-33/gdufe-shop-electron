import { param2Obj } from '@/utils'

const userMap = {
  
  admin: {
    role: 'admin',
    name: 'Super Admin',
    status:true,
    token:'admin'
  },
  manager: {
    role: 'manager',
    name: 'Super Admin',
    status:true,
    token:'manager'
    
  },
  saler: {
    role: 'saler',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  stocker: {
    role: 'stocker',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    console.log(config);
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => {
    return {
      status : true
    }
  }
}
