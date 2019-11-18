import { mebApi } from "./meb"
import { pileApi } from './pile'
import { stationApi } from './station'
import { orderApi } from './order'
import { chargeApi } from './charge'
import * as todosApi from './todos'

export const api = {
  meb: mebApi,
  todo: todosApi,
  pile: pileApi,
  station: stationApi,
  order: orderApi,
  charge: chargeApi
}
