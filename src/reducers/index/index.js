import { ADD, MINUS,TOP } from '../../constants/index/index'

const INITIAL_STATE = {
    appCode: "",
    channelCategory: "",
    top: 10,
    num: 0
}

const index = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case ADD:
      // return {
      //   ...state,
      //   num: state.num + 1
      // }

      return Object.assign({}, state, {
        num: action.payload
      });
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }

      case TOP:
        return Object.assign({}, state, {
          top: action.payload
        });
     default:
       return state
  }
}

export {index};
