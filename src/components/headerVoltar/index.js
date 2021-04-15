import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export default function HeaderVoltar({ title, onPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={onPress} >
                    <Icon name="arrow-left" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerTitle}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#ADD8E6'
    },
    text: {
        color: 'white',
        padding: 5,
        fontSize: 23,
        
    },
    containerTitle: {
        backgroundColor: '#ADD8E6',
        width: '100%'
    },
    containerButton: {
        justifyContent: 'center',
        backgroundColor: '#ADD8E6',
        paddingHorizontal: 10
    }
})