import { combineReducers } from 'redux'
import { mebReducer } from './module/meb/meb.reducer'
import { commonReducer } from './module/common/common.reducer'
import { stationReducer } from './module/station/station.reducer'
import { pileReducer } from './module/pile/pile.reducer'
import { orderReducer } from './module/order/order.reducer'

export const rootReducer = combineReducers({
    meb: mebReducer,
    common: commonReducer,
    station: stationReducer,
    pile: pileReducer,
    order: orderReducer
})

export default rootReducer;