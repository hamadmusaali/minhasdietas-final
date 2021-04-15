import { SET_DIETAS } from "../actions";

export default function(state = null, action) {
    switch(action.type) {
        case SET_DIETAS:
            return action.dietas;
        default:
            return state;
    }
}