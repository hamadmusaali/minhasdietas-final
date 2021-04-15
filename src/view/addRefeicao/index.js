import * as React from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import { setFieldRefeicao, saveRefeicao, setAllFieldsRefeicao, resetFormRefeicao } from '../../actions';

import HeaderVoltar from '../../components/headerVoltar';
import Input2 from '../../components/input2';
import Botao1 from '../../components/botao1';

class AddRefeicao extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            titulo: 'Adicionar Nova Refeição',
        }
    }

    componentDidMount() {
        const { route, setAllFieldsRefeicao, resetFormRefeicao } = this.props;
        const { params } = route;

        if (params && params.refeicaoToEdit) {
            setAllFieldsRefeicao(params.refeicaoToEdit);
            this.setState({ titulo: 'Alterar Refeição' })
        } else {
            resetFormRefeicao();
        }
    }

    viewForm() {
        const { refeicaoForm, setFieldRefeicao, saveRefeicao, navigation, route } = this.props;
        
        return (
            <View style={styles.container}>
                <HeaderVoltar title={this.state.titulo} onPress={() => navigation.pop()} />
                <Text style={styles.titulo}>Refeição</Text>
                <Input2 label="Prato">
                    <TextInput
                        style={styles.textInput}
                        placeholder="Prato"
                        value={refeicaoForm.prato}
                        onChangeText={value => setFieldRefeicao('prato', value)}
                    />
                </Input2>
                <Input2 label="Variação">
                    <TextInput
                        style={styles.textInput}
                        placeholder="Variação"
                        value={refeicaoForm.variacao}
                        onChangeText={value => setFieldRefeicao('variacao', value)}
                    />
                </Input2>
                <Input2 label="Horário">
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'HH:mm'
                        }}
                        style={styles.textInputHorario}
                        placeholder='Horário'
                        value={refeicaoForm.horario}
                        onChangeText={value => setFieldRefeicao('horario', value)}
                    />
                </Input2>
                <View style={styles.botao}>
                    {
                        this.state.isLoading
                        ?
                        <ActivityIndicator size="large" color="#ADD8E6"/>
                        :
                        <Botao1
                            label="SALVAR"
                            onPress={async () => {
                                this.setState({ isLoading: true })

                                try {
                                    await saveRefeicao(route.params.dieta, refeicaoForm);
                                    navigation.pop();
                                }
                                catch (error) {
                                    Alert.alert('Erro', error.message);
                                } finally {
                                    this.setState({ isLoading: false })
                                }

                            }}
                        />
                    }
                </View>
            </View>
        )
    }

    render() {
        return (this.viewForm())
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FC',
        flex: 1
    },
    textInput: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        borderWidth: 1
    },
    textInputHorario: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        borderWidth: 1,
        width: 100
    },
    pesoIdade: {
        flexDirection: 'row'
    },
    botao: {
        paddingHorizontal: 30,
        paddingTop: 32
    },
    titulo: {
        marginLeft: 30,
        fontSize: 18,
        marginTop: 32
    }

})

const mapStateToProps = (state) => {
    return ({
        refeicaoForm: state.refeicaoForm
    })
}

const mapDispatchToProps = {
    setFieldRefeicao,
    saveRefeicao,
    setAllFieldsRefeicao,
    resetFormRefeicao
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRefeicao);