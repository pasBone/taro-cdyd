import { combineEpics } from "redux-observable"
import * as loginEpics from './module/meb/epics'
import * as todosEpics from './module/todos/epics'

export default combineEpics(
    ...Object.values({
        ...loginEpics,
        ...todosEpics
    }),
)
