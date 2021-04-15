import * as React from 'react';
import { View, TextInput, StyleSheet, Image, ActivityIndicator, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome';

import Botao2 from '../../components/botao2';
import Input1 from '../../components/input1';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
            showPass1: true,
            showPass2: true,
            isLoading: false,
            message: ""
        }
    }

    processRegister() {
        this.setState({ isLoading: true });

        const { email, password, passwordRepeat } = this.state;

        const registerUserSuccess = () => {
            this.props.navigation.navigate('Login');
            this.setState({
                email: "",
                password: "",
                passwordRepeat: "",
                message: ""
            })
        }

        const registerUserFailed = error => {
            this.setState({ message: this.getMessageByError(error.code) })
        }

        if (password == passwordRepeat) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(registerUserSuccess)
                .catch(registerUserFailed)
                .then(() => {
                    this.setState({
                        isLoading: false
                    });
                })
        }
        else
            this.setState({
                message: "As senhas não são iguais!",
                isLoading: false
            })
    }

    getMessageByError(code) {
        switch(code) {
            case "auth/invalid-email":
                return "E-mail inválido";
            case "auth/wrong-password":
                return "Senha incorreta.";
            case "auth/email-already-exists":
                return "O e-mail já está em uso.";
            case "auth/email-already-in-use":
                return "O e-mail já está em uso.";
            case "auth/invalid-password":
                return "Senha deve ter no mínimo 7 caracteres";
            case "auth/weak-password":
                return "Senha deve ter no mínimo 7 caracteres";
            default:
                return "Erro desconhecido";
        }
    }

    onChangeHandler(field, valor) {
        this.setState({
            [field]: valor
        })
    }

    showPassword1() {
        if (this.state.showPass1 == true) {
            this.setState({
                showPass1: false
            })
        }
        else {
            this.setState({
                showPass1: true
            })
        }

    }

    showPassword2() {
        if (this.state.showPass2 == true) {
            this.setState({
                showPass2: false
            })
        }
        else {
            this.setState({
                showPass2: true
            })
        }

    }

    renderButton() {

        return (
            <View style={styles.botao} >
                <Botao2 label="CADASTRAR" onPress={() => this.processRegister()} />
            </View>
        )
    }

    renderMessage() {
        const { message } = this.state;

        if (!message)
            return null;

        return (
            <View style={styles.msg}>
                <Text style={styles.msgText}>{message}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container} >
                <Icon
                    name="arrow-left"
                    size={20}
                    color="white"
                    onPress={() => this.props.navigation.pop()}
                    style={{margin: 10}}
                />
                <KeyboardAwareScrollView>
                    <Image source={require('../../../imagens/logo.jpg')} style={{ alignSelf: 'center', marginTop: -35}} />

                    <Input1 >
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={valor => { this.onChangeHandler('email', valor) }}
                        />
                    </Input1>
                    <Input1>
                        <View style={styles.inputSenha}>
                            <TextInput
                                style={styles.textInput2}
                                placeholder="Senha"
                                secureTextEntry={this.state.showPass1}
                                value={this.state.password}
                                onChangeText={valor => { this.onChangeHandler('password', valor) }}
                            />
                            {
                                this.state.showPass1
                                    ?
                                    <Icon
                                        name="eye"
                                        size={24}
                                        color="black"
                                        style={styles.icon}
                                        onPress={() => { this.showPassword1() }}
                                    />
                                    :
                                    <Icon
                                        name="eye-slash"
                                        size={24}
                                        color="black"
                                        style={styles.icon}
                                        onPress={() => { this.showPassword1() }}
                                    />
                            }
                        </View>
                    </Input1>
                    <Input1>
                        <View style={styles.inputSenha}>
                            <TextInput
                                style={styles.textInput2}
                                placeholder="Confirmar Senha"
                                secureTextEntry={this.state.showPass2}
                                value={this.state.passwordRepeat}
                                onChangeText={valor => { this.onChangeHandler('passwordRepeat', valor) }}
                            />
                            {
                                this.state.showPass2
                                    ?
                                    <Icon
                                        name="eye"
                                        size={24}
                                        color="black"
                                        style={styles.icon}
                                        onPress={() => { this.showPassword2() }}
                                    />
                                    :
                                    <Icon
                                        name="eye-slash"
                                        size={24}
                                        color="black"
                                        style={styles.icon}
                                        onPress={() => { this.showPassword2() }}
                                    />
                            }
                        </View>
                    </Input1>

                    {
                        this.state.isLoading
                            ?
                            <ActivityIndicator size="large" color="white" style={{ marginTop: 15 }} />
                            :
                            this.renderButton()
                    }

                    {this.renderMessage()}

                </KeyboardAwareScrollView>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    botao: {
        paddingTop: 32,
        paddingHorizontal: 30
    },
    cadastro: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 20
    },
    textInput: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        marginTop: 5
    },
    inputSenha: {
        flexDirection: 'row',
        marginRight: 30,
        marginLeft: 30,
        backgroundColor: '#fff',
        position: 'relative'
    },
    textInput2: {
        backgroundColor: 'white',
        marginTop: 5,
        width: 250
    },
    icon: {
        right: 12,
        top: 12,
        position: 'absolute'
    },
    msg: {
        marginTop: 10,
        alignSelf: 'center'
    },
    msgText: {
        color: 'red'
    }

})