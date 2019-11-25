export declare type TypeConstant = string;

export declare type Action<TType extends TypeConstant = TypeConstant> = {
  type: TType;
};

export declare type ActionCreator<TType extends TypeConstant> = (...args: any[]) => Action<TType>;

export declare type Reducer<TState, TAction extends Action> = (state: TState | undefined, action: TAction) => TState;

export declare type ActionType<TActionCreatorOrMap extends any> = TActionCreatorOrMap extends ActionCreator<TypeConstant> ? ReturnType<TActionCreatorOrMap> : TActionCreatorOrMap extends Record<any, any> ? {
  [K in keyof TActionCreatorOrMap]: ActionType<TActionCreatorOrMap[K]>;
}[keyof TActionCreatorOrMap] : TActionCreatorOrMap extends infer R ? never : never;

export declare type StateType<TReducerOrMap extends any> = TReducerOrMap extends Reducer<any, any> ? ReturnType<TReducerOrMap> : TReducerOrMap extends Record<any, any> ? {
  [K in keyof TReducerOrMap]: StateType<TReducerOrMap[K]>;
} : never;

export interface IAction<T=any> {
  type: string;
  payload: T;
}

export type RootState = StateType<typeof import('./root-reducer').default>;
export type RootServices = typeof import('../api/index');



