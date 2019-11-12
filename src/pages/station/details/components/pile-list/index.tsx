import { View, Image, Text } from "@tarojs/components"
import { CardBox } from "@/components/card"
import { useCallback, FC, eventCenter, useEffect, useRef, useState, navigateTo } from "@tarojs/taro";
import { useDispatch, useSelector } from "@tarojs/redux";
import { getPileListAsync } from '@/store/module/pile/pile.actions';
import { RootState } from "@/store/types";
import { PILE_STATUS, PILE_SHOW_MAP } from "@/constant";
import { AtProgress } from "taro-ui";
import './style.scss'

type IProps = {
  stationId: string
}

export const PileList: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const pileList = useSelector((state: RootState) => state.pile.pileList);
  // const pageNumber = pileList.pageNumber;
  const [pageNumber, setPageNumber] = useState(1);

  /** 获取列表 */
  const getPileList = useCallback(() => {
    dispatch(
      getPileListAsync({
        station_id: props.stationId,
        pageNumber: pageNumber,
        pageSize: 10
      })
    ).then(_ => {
      setPageNumber(pageNumber + 1);
    })

  }, [pageNumber]);

  useEffect(() => {
    eventCenter.on('GET_PILE_LIST', getPileList);
    getPileList();
  }, [])

  return (
    <CardBox title="电桩实时状态">
      <View className="pile_status__list">
        {
          pileList.list.map(item => (
            <View
              className="pile_status__item"
              onClick={() => navigateTo({
                url: `/pages/pile/details/index?id=${item.pile_id}`
              })}
              key={item.pile_id}>
              <View className="pile_status__header">
                <Image className="pile_status__img" src={PILE_SHOW_MAP[item.pile_status].image} />
                <View className="pile_status__label">
                  <View className="pile_code">NO.{item.pile_code}</View>
                  {
                    [PILE_STATUS.使用中].includes(item.pile_status) ?
                      <AtProgress color="#2565de" status='progress' percent={item.soc} strokeWidth={6} isHidePercent /> :
                      <View className="pile_status__tag" style={PILE_SHOW_MAP[item.pile_status].style}>{PILE_STATUS[item.pile_status]}</View>
                  }

                </View>
              </View>

              <View className="pile_status__info">
                <View className="order_nums">位置编号：{item.order_num}#</View>
                <View>充电功率：{item.power}kW</View>
              </View>
            </View>
          ))
        }
      </View>
    </CardBox>
  )
}