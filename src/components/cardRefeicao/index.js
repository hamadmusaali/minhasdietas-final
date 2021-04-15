import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

const CardRefeicao = ({ refeicao, editarRefeicao, deletarRefeicao }) => {

    return (

        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.textTitulo}>Refeição</Text>
                    <Icon2 name="restaurant" size={30} color="white" style={{ marginRight: 10, marginTop: 5 }} />
                </View>
                <View style={styles.conteudo}>
                    <View style={styles.teste}>
                        <Text style={styles.textConteudo}>Prato </Text>
                        <Icon2 name="restaurant" size={20} color="black" style={{ marginTop: 20 }}/>
                        <Text style={styles.textConteudo}>: {refeicao.prato} </Text>
                    </View>
                    <View style={styles.teste}>
                        <Text style={styles.textConteudo}>Variação </Text>
                        <Icon2 name="restaurant-menu" size={20} color="black" style={{ marginTop: 20 }}/>
                        <Text style={styles.textConteudo}>: {refeicao.variacao} </Text>
                    </View>
                    <View style={styles.teste}>
                        <Text style={styles.textConteudo}>Horário </Text>
                        <Icon2 name="schedule" size={20} color="black" style={{ marginTop: 20 }}/>
                        <Text style={styles.textConteudo}>: {refeicao.horario} </Text>
                    </View>
                    <View style={styles.icones}>
                        <Icon name="trash" size={30} color="#ADD8E6" style={{ paddingLeft: 30 }} onPress={deletarRefeicao} />
                        <Icon name="pencil" size={30} color="#ADD8E6" onPress={editarRefeicao} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        backgroundColor: 'white',
        height: 240,
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
        color: 'white',
        marginTop: 5,
        marginLeft: 10
    },
    pesoIdade: {
        flexDirection: 'row',
        marginTop: 4
    },
    icones: {
        flexDirection: 'row-reverse'
    },
    containerImagem: {
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center',
    },
    imagem: {
        width: 100,
        height: 100
    },
    header: {
        backgroundColor: '#ADD8E6',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textConteudo: {
        marginTop: 16,
        fontSize: 20
    },
    teste: {
        flexDirection: 'row'
    }
})

export default CardRefeicao;