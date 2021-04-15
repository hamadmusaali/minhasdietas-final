import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Home from '../../view/home';
import AddDietaDrawer from '../../view/addDietaDrawer';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const Drawer = createDrawerNavigator();

export default function Menu() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={styles.drawerStyle}
            drawerContentOptions={{ labelStyle: { "color": "#fff", fontSize: 18 } }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{ drawerIcon: config => <Icon name="home" size={30} color="#fff" /> }}
            />
            <Drawer.Screen
                name="Adicionar Dieta"
                component={AddDietaDrawer}
                options={{ drawerIcon: config => <Icon name="plus" size={30} color="#fff" /> }}
            />
        </Drawer.Navigator>
    )
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <ProfileDrawer {...props} />
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={() => { props.navigation.navigate('Login') }} labelStyle={{ color: '#fff', fontSize: 18 }} icon={() => <Icon name="sign-out" size={30} color="#fff" />} />
        </DrawerContentScrollView>
    )
}

function ProfileDrawer(props) {
    return (
        <TouchableOpacity onPress={() => {props.navigation.navigate("Home")}} >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../imagens/logo.jpg')} style={styles.imageStyle} />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.drawerText}>Usuário</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    drawerStyle: {
        width: 250,
        backgroundColor: '#ADD8E6'
    },
    container: {
        alignItems: 'center',
        height: 165
    },
    imageStyle: {
        height: 100,
        width: 100
    },
    drawerText: {
        color: '#fff',
        fontSize: 18
    },
    drawerTextSmall: {
        color: '#fff',
        fontSize: 12
    },
    containerText: {
        alignItems: 'center'
    },
    imageContainer: {
        marginTop: 10
    }
})