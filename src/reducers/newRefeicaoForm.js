import { SET_FIELD_REFEICAO, REFEICAO_SAVED_SUCCESS, SET_ALL_FIELDS_REFEICAO, RESET_FORM_REFEICAO } from '../actions';

const INITIAL_STATE_REFEICAO = {
    id: null,
    prato: '',
    variacao: '',
    horario: ''
}

export default function(state = INITIAL_STATE_REFEICAO, action) {
    switch(action.type) {
        case SET_FIELD_REFEICAO:
            const clonedState = {...state};
            clonedState[action.field] = action.value;
            return clonedState;
        case REFEICAO_SAVED_SUCCESS:
            return INITIAL_STATE_REFEICAO;
        case SET_ALL_FIELDS_REFEICAO:
            return action.refeicao;
        case RESET_FORM_REFEICAO:
            return INITIAL_STATE_REFEICAO;
        default: 
            return state;
    }
}