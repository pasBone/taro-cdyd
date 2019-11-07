import { combineReducers } from 'redux'
import { mebReducer } from './module/meb/meb.reducer'
import { commonReducer } from './module/common/common.reducer'
import { stationReducer } from './module/station/station.reducer'

export const rootReducer = combineReducers({
    meb: mebReducer,
    common: commonReducer,
    station: stationReducer
})

export default rootReducer;