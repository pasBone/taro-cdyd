import { View, Image, Text } from "@tarojs/components"
import { CardBox } from "@/components/card"
import { useCallback, FC, eventCenter, useEffect, useRef, useState } from "@tarojs/taro";
import { useDispatch, useSelector } from "@tarojs/redux";
import { getPileListAsync } from '@/store/module/pile/pile.actions';
import { RootState } from "@/store/types";
import { PILE_STATUS } from "@/constant";
import { IMAGE_MAP } from "@/assets";
import './style.scss'
import { AtProgress } from "taro-ui";

type IProps = {
  stationId: string
}

const PILE_SHOW_MAP = {
  [PILE_STATUS.空闲中]: {
    image: IMAGE_MAP.charging_free,
    style: {
      backgroundColor: '#def1e6',
      color: '#1ea456'
    }
  },
  [PILE_STATUS.使用中]: {
    image: IMAGE_MAP.charging_busy,
    style: {
      backgroundColor: '#fde2dd',
      color: '#f54c2b'
    }
  },
  [PILE_STATUS.刷卡中]: {
    image: IMAGE_MAP.charging_busy,
    style: {
      backgroundColor: '#dce6fa',
      color: '#2565de'
    }
  },
  [PILE_STATUS.充电结束]: {
    image: IMAGE_MAP.charging_busy,
    style: {
      backgroundColor: '#faeedb',
      color: '#ef9e10'
    }
  },
  [PILE_STATUS.故障]: {
    image: IMAGE_MAP.charging_fault,
    style: {
      backgroundColor: '#fde2dd',
      color: '#f54c2b'
    }
  },
  [PILE_STATUS.离线]: {
    image: IMAGE_MAP.charging_fault,
    style: {
      backgroundColor: '#fde2dd',
      color: '#f54c2b'
    }
  },
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
            <View className="pile_status__item" key={item.pile_id}>
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