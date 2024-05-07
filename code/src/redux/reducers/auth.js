import { userActions } from "@root/redux/actions/auth";
import { initData, createReducer } from '@root/redux/reducers'


export const userReducer = createReducer({ ...initData }, userActions);
