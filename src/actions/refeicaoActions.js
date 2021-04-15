import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_REFEICOES = 'SET_REFEICOES';
const setRefeicoes = refeicoes => ({
    type: SET_REFEICOES,
    refeicoes: refeicoes
})

export const watchRefeicoes = dieta => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/dietas/${dieta.id}/refeicoes`)
            .on('value', snapshot => {
                const refeicoes = snapshot.val();
                const action = setRefeicoes(refeicoes);
                dispatch(action); 
            })
    }
}

export const deleteRefeicao = (dieta, refeicao) => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Exclusão', 
                `Deseja excluir essa refeição?`,
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
                                .ref(`/users/${currentUser.uid}/dietas/${dieta.id}/refeicoes/${refeicao.id}`)
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
