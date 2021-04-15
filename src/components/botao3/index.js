import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Botao3({ onPress, label, texto }) {
    return (
        <View>
            <Text style={styles.texto}>{texto}</Text>
            <TouchableOpacity onPress={onPress} style={styles.botao}>
                <Text style={styles.textoBotao}>{label}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#DBDBDB',
        borderRadius: 5,
        elevation: 5,
        width: 150,
        height: 30,
        marginLeft: 30
    },
    textoBotao: {
        alignSelf: 'center',
        fontSize: 14,
        color: 'black',
        marginTop: 5
    }, 
    texto: {
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 5,
    }
})