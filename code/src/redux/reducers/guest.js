import { coursesActions, certificateActions } from "@root/redux/actions/guest";
import { initData, createReducer } from '@root/redux/reducers'

export const coursesReducer = createReducer({ ...initData }, coursesActions);
export const certificateReducer = createReducer({ ...initData }, certificateActions);