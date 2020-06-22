import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
	bindActionCreators
} from 'redux';


import * as actionCreators from '../../actions/index/index';

import { AtButton } from 'taro-ui';

import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import './index.scss'



const mapStateToProps = (state) => {
	return {
		index: state.index
	}
};


const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

@connect(mapStateToProps,mapDispatchToProps)

class Index extends Component {
  state={
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount() {
    wx.getSystemInfo({
      success: (resp)=> {
        console.log(resp, 'resp');
      },
      fail:(err)=> {
        console.log(err, 'err');
      },
      complete: (e)=> {
        console.log(e, '完成');
      }
    })

    wx.request({
      url: 'http://youyong.ba:8080/mock/5ee2f7c8df102b7ecd798e1f/yingshi/pass-server/identity/pass-region', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      method: "post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    });


  }


  getPhoneNumber (e) {
    console.log(`是否成功调用${e.detail.errMsg}`);
    console.log(`加密算法的初始向量:${e.detail.iv}`);
    console.log(`包括敏感数据在内的完整用户信息的加密数据:${e.detail.encryptedData}`);
  } 





  add(e) {
    let {num} = this.props.index;
  


    num = num+1;
    this.props.add({"num":num});
  }

  render () {

    return (
      <View className='index'>
        {/* <Button className='add_btn' onClick={this.props.add({num: 1})}>+</Button> */}
        <Button className='add_btn' onClick={this.add.bind(this)}>+</Button>
        {/* <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button> */}
        {/* <View><Text>{this.props.counter.num}</Text></View> */}
        <View><Text>{this.props.index.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        <View> <AtButton type='primary' className="custornButton">按钮文案</AtButton></View>
      

        <AtButton type='primary' className="custornButton"  openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber.bind(this)}>获得手机号</AtButton>
          {/* onGetPhoneNumber */}
        </View>
    )
  }
}

export default Index
