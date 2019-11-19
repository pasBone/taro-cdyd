import './style.scss';
import { View, Canvas } from '@tarojs/components';
import { px2rpx as _ } from '@/utils/common'
import CircleProgressCanvas from './canvas';

export default class CircleProgress extends Taro.Component {

  state = {
    canvasWidth: 420,
    canvasHeight: 420
  }

  componentDidShow() {
    const circle = new CircleProgressCanvas({
      ctx: this,
      canvasWidth: this.state.canvasWidth,
      canvasHeight: this.state.canvasHeight
    });
    let progress = 0;
    setInterval(_ => {
      progress += 0.01;
      circle.repaint(progress)
    }, 500);
  }

  render() {
    const { canvasWidth, canvasHeight } = this.state;
    return (
      <View className="ball-progress">
        <View>{this.props.children}</View>
        <Canvas canvasId="ball" style={{ width: canvasWidth + 'rpx', height: canvasHeight + 'rpx', margin: '0 auto' }} />
      </View>
    )
  }
}
