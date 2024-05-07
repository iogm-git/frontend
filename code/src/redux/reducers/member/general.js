import { discussionForumsActions, storeDiscussionForumActions, updateDobAddressActions } from "@root/redux/actions/member/general";
import { initData, createReducer } from '@root/redux/reducers'

export const discussionForumsReducer = createReducer({ ...initData }, discussionForumsActions);
export const storeDiscussionForumReducer = createReducer({ ...initData }, storeDiscussionForumActions);
export const updateDobAddressReducer = createReducer({ ...initData }, updateDobAddressActions);