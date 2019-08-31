import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux'
import { useSelector, useDispatch  } from '@tarojs/redux'

// console.log(actions);

const mapStateToProps = state => {
    console.log(state, 'state');
    return state.mebReducer
}

// const mapDispatchToProps = dispatch => {
//     return {
//         add: dispatch(add())
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//       // dispatching plain actions
//       increment: () => dispatch({ type: 'INCREMENT' }),
//       decrement: () => dispatch({ type: 'DECREMENT' }),
//       reset: () => dispatch({ type: 'RESET' })
//     }
//   }

// @connect(mapStateToProps, actions)
// class Demo extends Component<{ num }> {
//     render() {
//         console.log(this);
//         return (
//             <View className='todo'>
//                 <AtButton className='add_btn' onClick={this.props.add}>+</AtButton>
//                 <AtButton className='dec_btn' onClick={this.props.dec}>-</AtButton>
//                 <AtButton className='dec_btn' onClick={this.props.asyncAdd}>async</AtButton>
//                 <View>值：{this.props.num}</View>
//             </View>
//         )
//     }
// }

// export default Demo

const Demo = () => {
    const counter = useSelector(state => {
        return state.mebReducer.num
    });

    const dispatch = useDispatch();
    return (
        <View className='todo'>
            <AtButton className='add_btn' onClick={()=> dispatch({type: 'ADD'})}>+</AtButton>
            <AtButton className='dec_btn' onClick={this.props.dec}>-</AtButton>
            <AtButton className='dec_btn' onClick={this.props.asyncAdd}>async</AtButton>
            <View>值：{this.props.num}</View>
            <View>值：{counter}</View>
        </View>
    )
}

export default Demo;