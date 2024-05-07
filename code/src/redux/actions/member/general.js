import { fetchActions } from "@root/redux/actions"
import { fetchDataDiscussionForums, storeDataDiscussionForum, updateDobAddress } from "@root/services/member/general"

export const discussionForumsActions = fetchActions('DISCUSSION_FORUM', fetchDataDiscussionForums)
export const storeDiscussionForumActions = fetchActions('STORE_DISCUSSION_FORUM', storeDataDiscussionForum)
export const updateDobAddressActions = fetchActions('UPDATE_DOB_ADDRESS', updateDobAddress)
