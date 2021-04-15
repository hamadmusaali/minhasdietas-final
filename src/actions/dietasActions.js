import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_DIETAS = 'SET_DIETAS';
const setDietas = dietas => ({
    type: SET_DIETAS,
    dietas: dietas
})

export const watchDietas = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/dietas`)
            .on('value', snapshot => {
                const dietas = snapshot.val();
                const action = setDietas(dietas);
                dispatch(action); 
            })
    }
}

export const deleteDieta = dieta => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Exclusão', 
                `Deseja excluir a dieta ${dieta.titulo}?`,
                [{
                    text: 'Não',
                    onPress: () => {
                        resolve(false);
                    }
                },{
                    text: 'Sim',
                    onPress: async () => {
                        const { currentUser } = firebase.auth();

                        try {
                            await firebase
                                .database()
                                .ref(`/users/${currentUser.uid}/dietas/${dieta.id}`)
                                .remove();

                            resolve(true);
                        } catch(e) {
                            reject(e);
                        }
                        
                    }
                }
                ],
            { cancelable: false }
            )
        })
    }
}
