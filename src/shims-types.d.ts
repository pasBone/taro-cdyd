import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
    export type Store = StateType<typeof import('./store').default>;

    export type RootState = StateType<typeof import('./store/root-reducer').default>;

    export type RootAction = ActionType<typeof import('./store/root-action')>;

    interface Types {
        RootAction: RootAction;
    }
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }

}
