import { mebApi } from "./meb"
import { pileApi } from './pile'
import { stationApi } from './station'
import * as todosApi from './todos'

export const api = {
  meb: mebApi,
  todo: todosApi,
  pile: pileApi,
  station: stationApi
}
