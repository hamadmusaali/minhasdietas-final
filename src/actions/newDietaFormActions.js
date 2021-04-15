import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';

export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value
    }
}

export const DIETA_SAVED_SUCCESS = 'DIETA_SAVED_SUCCESS';
export const dietaSavedSuccess = () => {
    return {
        type: DIETA_SAVED_SUCCESS
    }
}

export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = dieta => ({
    type: SET_ALL_FIELDS,
    dieta: dieta
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
    type: RESET_FORM
})

export const saveDieta = dieta => {
    const { currentUser } = firebase.auth();

    return async dispatch => { 
        if(dieta.id) {
            await firebase
            .database()
            .ref(`/users/${currentUser.uid}/dietas/${dieta.id}`)
            .set(dieta);
        }else {
            await firebase
            .database()
            .ref(`/users/${currentUser.uid}/dietas`)
            .push(dieta);
        }
        
        dispatch(dietaSavedSuccess());
    }
}