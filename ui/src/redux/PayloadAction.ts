import { Action } from 'redux'

export default interface PayloadAction<T> extends Action<string> {
    payload: T
}
