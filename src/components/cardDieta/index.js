import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const CardDieta = ({ dieta, onNavigate, editarDieta, deletarDieta }) => {

    return (

        <TouchableOpacity onPress={onNavigate} style={styles.container}>
            
                <View style={styles.card}>
                    <View style={styles.conteudo}>
                        <Text style={styles.textTitulo}>{dieta.titulo}</Text>
                        <View style={styles.containerImagem}>
                            <Image 
                                style={styles.imagem} 
                                source={
                                    {
                                        uri: `data:image/jpeg;base64,${dieta.img}`
                                    }
                                } 
                            />
                        </View>

                        <Text >Descrição: {dieta.descricao}</Text>
                        <View style={styles.pesoIdade}>
                            <Text style={{ paddingRight: 30 }}>Peso: {dieta.peso}</Text>
                            <Text >Idade: {dieta.idade}</Text>
                        </View>
                        <View style={styles.icones}>
                            <Icon name="trash" size={30} color="#ADD8E6" style={{ paddingLeft: 30 }} onPress={deletarDieta}/>
                            <Icon name="pencil" size={30} color="#ADD8E6" onPress={editarDieta} />
                        </View>
                    </View>
                </View>
            

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        backgroundColor: 'white',
        height: 275,
        borderRadius: 14,
        elevation: 8,
        marginHorizontal: 30,
        marginTop: 32,
        marginBottom: 8
    },
    conteudo: {
        padding: 10
    },
    textTitulo: {
        fontSize: 22,
        color: '#ADD8E6'
    },
    pesoIdade: {
        flexDirection: 'row',
        marginTop: 4
    },
    icones: {
        flexDirection: 'row-reverse',
        position: 'absolute',
        top: 230,
        left: 200
    },
    containerImagem: {
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center',
    },
    imagem: {
        width: 110,
        height: 110,
        aspectRatio: 1,
        borderRadius: 6
    }
})

export default CardDieta;