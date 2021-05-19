const formReducer = (state, action) => {
    switch(action.type){
        case "HANDLE INPUT":
            return {
                ...state,
                [action.field]: action.payload,
            };
        case "CHANGE IMAGE":
            return {
                ...state,
                [action.field]: {...state[action.field],imageSrc:action.payload},
            };
        case "CHANGE NAME":
            return {
                ...state,
                [action.field]: {...state[action.field],name:action.payload},
            };
        default:
            return state;
    }
};
export default formReducer;