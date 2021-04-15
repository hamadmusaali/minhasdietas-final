import * as React from 'react';
import { View, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { setField, saveDieta, setAllFields, resetForm } from '../../actions';
import {RNCamera} from 'react-native-camera';

import HeaderVoltar from '../../components/headerVoltar';
import Input2 from '../../components/input2';
import Botao1 from '../../components/botao1';
import Botao3 from '../../components/botao3';

class AddDieta extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isCamera: false,
            titulo: 'Adicionar Nova Dieta'
        }
    }

    componentDidMount() {
        const { route, setAllFields, resetForm } = this.props;
        const { params } = route;

        if(params && params.dietaToEdit) {
            setAllFields(params.dietaToEdit);
            this.setState({ titulo: 'Alterar dieta ' + params.dietaToEdit.titulo })
        } else {
            resetForm();
        }           
    }

    async requestExternalStorageAccess() {
        try{
            const permission = await PermissionsAndroid
                .request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)

            if(permission !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permissão negada');
            }
        } catch(err) {
            
        }
    }

    viewCamera() {
        return (
            <View style={styles.container}>
                <RNCamera 
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'Nós precisamos de sua permissão para usar a câmera',
                        buttonPositive: 'Aceito',
                        buttonNegative: 'Cancelar'
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to record audio',
                        message: 'Nós precisamos de sua permissão para gravar áudio',
                        buttonPositive: 'Aceito',
                        buttonNegative: 'Cancelar'
                    }}
                />
                <View>
                    <TouchableOpacity 
                        style={styles.capture}
                        onPress={this.takePicture.bind(this)}
                    >
                        <Text>Tirar foto!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    takePicture = async() => {
        if(this.camera) {
            const options = {quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true};
            const data = await this.camera.takePictureAsync(options);

            if(data) {
                this.props.setField('img', data.base64);

                this.setState({ isCamera: false})
            }
        }
    }

    viewForm() {
        const { dietaForm, setField, saveDieta, navigation } = this.props;

        return (
            <View style={styles.container}>
                
                <HeaderVoltar title={this.state.titulo} onPress={() => navigation.navigate('Menu')}/>
                <Input2 label="Título">
                    <TextInput
                        style={styles.textInput}
                        placeholder="Título"
                        value={dietaForm.titulo}
                        onChangeText={value => setField('titulo', value)}
                    />
                </Input2>
                <View style={styles.pesoIdade}>
                    <Input2 label="Peso">
                        <TextInput
                            style={styles.textInputMenor}
                            placeholder="Peso"
                            keyboardType='numeric'
                            value={dietaForm.peso}
                            onChangeText={value => setField('peso', value)}
                        />
                    </Input2>
                    <Input2 label="Idade">
                        <TextInput
                            style={styles.textInputMenor}
                            placeholder="Idade"
                            keyboardType='numeric'
                            value={dietaForm.idade}
                            onChangeText={value => setField('idade', value)}
                        />
                    </Input2>
                </View>
                <Input2 label="Descrição">
                    <TextInput
                        style={styles.textInputMaior}
                        placeholder="Descrição"
                        value={dietaForm.descricao}
                        onChangeText={value => setField('descricao', value)}
                    />
                </Input2>
                <Botao3 
                    texto="Imagem" 
                    label="Insira uma imagem" 
                    onPress={() => {
                        this.setState({ isCamera: true })
                    }}
                />
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
                                    await saveDieta(dietaForm);
                                    navigation.navigate('Menu');
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
        if(this.state.isCamera) {
            return(this.viewCamera())
        }

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
    textInputMenor: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        borderWidth: 1,
        width: 120
    },
    textInputMaior: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        borderWidth: 1,
        height: 120
    },
    pesoIdade: {
        flexDirection: 'row'
    },
    botao: {
        paddingHorizontal: 30,
        paddingTop: 32
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }

});

const mapStateToProps = (state) => {
    return ({
        dietaForm: state.dietaForm
    })
}

const mapDispatchToProps = {
    setField,
    saveDieta,
    setAllFields,
    resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDieta);