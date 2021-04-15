import firebase from 'firebase';

export const SET_FIELD_REFEICAO = 'SET_FIELD_REFEICAO';

export const setFieldRefeicao = (field, value) => {
    return {
        type: SET_FIELD_REFEICAO,
        field,
        value
    }
}

export const REFEICAO_SAVED_SUCCESS = 'REFEICAO_SAVED_SUCCESS';
export const refeicaoSavedSuccess = () => {
    return {
        type: REFEICAO_SAVED_SUCCESS
    }
}

export const SET_ALL_FIELDS_REFEICAO = 'SET_ALL_FIELDS_REFEICAO';
export const setAllFieldsRefeicao = refeicao => ({
    type: SET_ALL_FIELDS_REFEICAO,
    refeicao: refeicao
});

export const RESET_FORM_REFEICAO = 'RESET_FORM_REFEICAO';
export const resetFormRefeicao = () => ({
    type: RESET_FORM_REFEICAO
});

export const saveRefeicao = (dieta, refeicao) => {
    const { currentUser } = firebase.auth();

    return async dispatch => { 
        if(refeicao.id) {
            await firebase
            .database()
            .ref(`/users/${currentUser.uid}/dietas/${dieta.id}/refeicoes/${refeicao.id}`)
            .set(refeicao);
        }else {
            await firebase
            .database()
            .ref(`/users/${currentUser.uid}/dietas/${dieta.id}/refeicoes`)
            .push(refeicao);
        }
        
        dispatch(refeicaoSavedSuccess());
    }
}