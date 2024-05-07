export const initData = {
    loading: false,
    error: null,
};

export const createReducer = (initialState, actions) => {
    return (state = { ...initialState }, action) => {
        switch (action.type) {
            case actions.request().type:
                return { ...state, loading: true, error: null };
            case actions.success().type:
                return { ...state, data: action.payload, loading: false };
            case actions.failure().type:
                return { ...state, error: action.error, loading: false };
            default:
                return state;
        }
    };
};