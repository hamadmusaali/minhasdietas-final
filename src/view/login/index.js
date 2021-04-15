import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import { processLogin } from '../../actions';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Botao2 from '../../components/botao2';
import Input1 from '../../components/input1';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPass: true,
            isLoading: false,
            message: "",
        }
    }

    processLogin() {
        this.setState({ isLoading: true });

        const { email, password } = this.state;

        this.props.processLogin({ email, password })
            .then(user => {
                if (user) {
                    this.props.navigation.replace('Menu');
                }
                else {
                    this.setState({
                        isLoading: false,
                        message: '',
                    })
                }
            })
            .catch(error => {
                this.setState({
                    message: this.getMessageByError(error.code),
                    isLoading: false
                });
            })
    }

    onChangeHandler(field, valor) {
        this.setState({
            [field]: valor
        })
    }

    showPassword() {
        if (this.state.showPass == true) {
            this.setState({
                showPass: false
            })
        }
        else {
            this.setState({
                showPass: true
            })
        }

    }

    getMessageByError(code) {
        switch (code) {
            case "auth/invalid-email":
                return "E-mail inválido";
            case "auth/user-not-found":
                return "E-mail inexistente.";
            case "auth/wrong-password":
                return "Senha incorreta.";
            default:
                return "Erro desconhecido";
        }
    }

    renderButton() {

        return (
            <View style={styles.botao} >
                <Botao2 label="LOGIN" onPress={() => this.processLogin()} />
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

            <View style={styles.container}>
                <Image source={require('../../../imagens/logo.jpg')} style={{ alignSelf: 'center' }} />

                <KeyboardAwareScrollView>
                    <Input1>
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
                                secureTextEntry={this.state.showPass}
                                value={this.state.password}
                                onChangeText={valor => { this.onChangeHandler('password', valor) }}
                            />
                            {
                                this.state.showPass
                                    ?
                                    <Icon
                                        name="eye"
                                        size={24}
                                        color="black"
                                        style={styles.icon}
                                        onPress={() => { this.showPassword() }}
                                    />
                                    :
                                    <Icon
                                        name="eye-slash"
                                        size={24}
                                        color="black"
                                        style={styles.icon}
                                        onPress={() => { this.showPassword() }}
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

                    <View style={styles.cadastro}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Não possui conta?</Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                            <Text style={{ color: '#007FEE', fontSize: 16 }}> Cadastre-se.</Text>
                        </TouchableOpacity>
                    </View>
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
        marginTop: 30,
    },
    textInput: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        marginTop: 5,
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

export default connect(null, { processLogin })(Login);