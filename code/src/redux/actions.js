export const fetchActions = (prefix, fn) => ({
    request: () => ({ type: `${prefix}_REQUEST` }),
    success: (payload) => ({ type: `${prefix}_SUCCESS`, payload }),
    failure: (error) => ({ type: `${prefix}_FAILURE`, error }),
    init: (...param) => fn(...param)
});
