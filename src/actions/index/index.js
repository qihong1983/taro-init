import Taro, { Component } from '@tarojs/taro'
import {
  ADD,
  MINUS
} from '../../constants/index'

const add = (data) => {
	return function(dispatch) {

    Taro.request({
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

		dispatch({
			type: ADD,
			payload: data.num
		});
	}

}


// export const add = () => {
//   return {
//     type: ADD
//   }
// }


const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }

export {
  add,
  minus
}