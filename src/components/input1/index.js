import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const Input1 = (props) => {

    const { children } = props;

    return (
        
        <View style={styles.container}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})

export default Input1;