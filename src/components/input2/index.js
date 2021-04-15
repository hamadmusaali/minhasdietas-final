import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Input2 = (props) => {

    const { label, children } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    text:{
        marginLeft: 30,
        marginBottom: 5
    }
})

export default Input2;