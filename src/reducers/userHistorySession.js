import { TRAER_ULTIMOS_6, ERROR_HISTORY } from '../types/historySessionTypes';

const INITIAL_STATE = {
    historySession: [],
    error: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRAER_ULTIMOS_6:
            return {
                ...state,
                historySession: action.payload,
                error: "",
            };

        case ERROR_HISTORY:
            return { ...state, historySession: [], error: action.payload };

        default:
            return state;
    }
};
