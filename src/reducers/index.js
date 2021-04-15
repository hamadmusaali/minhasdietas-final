import { combineReducers } from 'redux';
import userReducer from './userReducer';
import dietaReducer from './dietaReducer';
import newDietaForm from './newDietaForm';
import refeicaoReducer from './refeicaoReducer';
import newRefeicaoForm from './newRefeicaoForm';

export default combineReducers({
    user: userReducer,
    dietaForm: newDietaForm,
    listaDietas: dietaReducer,
    refeicaoForm: newRefeicaoForm,
    listaRefeicoes: refeicaoReducer
});