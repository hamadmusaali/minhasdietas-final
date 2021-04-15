import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Botao2({ onPress, label }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.botao}>
            <Text style={styles.textoBotao}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#007FEE',
        borderRadius: 5,
        elevation: 5,
        paddingVertical: 8
    }, 
    textoBotao: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white'
    }
})