import firebase from 'firebase';

export const USER_LOGIN_SUCESS = 'USER_LOGIN';
const userLoginSucess = user => ({
    type: USER_LOGIN_SUCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});

export const processLogin = ({ email, password }) => dispatch => {

    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            const action = userLoginSucess(user);
            dispatch(action);
            return user;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}