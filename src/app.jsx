import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

state = {
  userInfo: null
}

  config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }


  componentWillMount() {

    // import Taro from '@tarojs/taro'

    

    Taro.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        console.log(res, 'wx.login');



      }
    })

        // 获取用户信息
        Taro.getSetting({
          success: res => {
            console.log(res, 'wx.getSetting');
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              Taro.getUserInfo({
                success: res => {
                  console.log(res, 'wx.getUserInfo');

                  
                  // 可以将 res 发送给后台解码出 unionId
                  // this.globalData.userInfo = res.userInfo

                  console.log(res.userInfo, 'res.userInfo');
                  Taro.setStorageSync('userInfo', res.userInfo);
    

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况

                
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            } else {

              Taro.setStorageSync('userInfo', res);
              this.setState({
                userInfo: res
              })
            }
          }
        })
  }
  
  componentDidMount () {
    
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index userInfo={this.state.userInfo}/>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
