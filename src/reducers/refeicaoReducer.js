import { SET_REFEICOES } from "../actions";

export default function(state = null, action) {
    switch(action.type) {
        case SET_REFEICOES:
            console.log(action.refeicoes);
            return action.refeicoes;
        default:
            return state;
    }
}