import './style.scss';
import { View, Canvas } from '@tarojs/components';
import { px2rpx as _ } from '@/utils/common'
import CircleProgressCanvas from './canvas';

type IProps = {
  progress: number
}

export default class CircleProgress extends Taro.Component<IProps> {

  private circleProgress;

  componentDidMount() {
    this.circleProgress = new CircleProgressCanvas({
      ctx: this
    });
  }
  componentDidUpdate() {
    this.circleProgress.repaint(this.props.progress);
  }

  render() {
    return (
      <View className="ball-progress">
        <View>{this.props.children}</View>
        <Canvas canvasId="ball" style={{ width: 420 + 'rpx', height: 420 + 'rpx', margin: '0 auto' }} />
      </View>
    )
  }
}
