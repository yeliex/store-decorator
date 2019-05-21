import { Store, Reducer, StoreEnhancer, ReducersMapObject } from 'redux';

export default function getStore(): Store;

type Action<S> = (state: S, payload: any) => S

type Effect = (payload: any) => void

export interface Model<S> {
    namespace: string;
    state: S,
    actions?: {
        [key: string]: Action<S>
    },
    effects?: {
        [key: string]: Effect
    }
}

export interface Models {
    [key: string]: Model
}

interface InitialState {
    [key: string]: any
}


type ReducerEnhancer = ((reducer: Reducer) => Reducer) | {
    [key: string]: Reducer
};

export function combine(models: Models): void;

export function register(model: Model): void;

export function create(reducers?: ReducerEnhancer, enhancer?: StoreEnhancer): Store;
export function create(preloadedState: InitialState, enhancer?: StoreEnhancer): Store;
export function create(reducers: ReducerEnhancer, preloadedState: InitialState, enhancer?: StoreEnhancer): Store;
