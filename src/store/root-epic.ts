import { combineEpics } from "redux-observable"
import * as loginEpics from './module/meb/epics'

export default combineEpics(
    ...Object.values({
        ...loginEpics,
    }),
)
