import { createCanvasContext } from "@tarojs/taro";
import { px2rpx as _ } from '@/utils/common'
import { IMAGE_MAP } from "@/assets";

class CircleProgressCanvas {
  constructor(config: Config) {
    this.ctx = createCanvasContext('ball', config.ctx);
    this.config = Object.assign(this.config, config);
    this.repaint(this.progress);
  }
  /** canvas context */
  private ctx;
  /** 进度值 */
  private progress = 0.001;

  private config = {
    canvaswidth: 420,
    canvasHeight: 420,
    barStrokeColor: '#5996ec',  //圆形背景颜色
    barLineWidth: 32,  //线宽
    ballRadius: 300, //圆形半径
  }

  public repaint(progress: number) {
    this.progress = progress;
    this.drawProgressBar();
    this.drawProgressCircle(this.progress);
    this.drawCoverCircle();
  }

  /** 圆形线框
   * @params progress 参数progress 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 progress 的值确定,取值范围(0 - 2)
   */
  private drawProgressCircle(progress = 0) {
    const ctx = this.ctx;
    const config = this.config;
    ctx.setLineWidth(_(config.barLineWidth));// 设置圆环的宽度
    ctx.setStrokeStyle(config.barStrokeColor); // 设置圆环的颜色
    // ctx.setLineCap('round') // 设置圆环端点的形状
    const x = _(config.canvaswidth / 2);
    const y = _(config.canvasHeight / 2);
    const ballRadius = _(config.ballRadius - config.barLineWidth) / 2;
    ctx.beginPath();//开始一个新的路径
    ctx.arc(x, y, ballRadius, -Math.PI / 2, progress * Math.PI - Math.PI / 2, true);
    ctx.stroke();//对当前路径进行描边
  }

  /** 图片圆环背景 */
  private drawProgressBar() {
    const ctx = this.ctx;
    const config = this.config;
    const x = _(config.canvaswidth - config.ballRadius) / 2;  //图到画布左边的距离
    const y = x;
    const width = _(config.ballRadius);
    const height = width;
    ctx.drawImage(IMAGE_MAP.calibration, x, y, width, height);
  }

  /** 绘制遮盖小白圆 */
  private drawCoverCircle() {
    const ctx = this.ctx;
    const config = this.config;
    ctx.beginPath();
    const x = _(config.canvaswidth / 2);
    const y = _(config.canvasHeight / 2);
    const ballRadius = _(config.ballRadius - config.barLineWidth) / 2;
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.draw();
  }
}

type Config = {
  ctx: any
}

export default CircleProgressCanvas;