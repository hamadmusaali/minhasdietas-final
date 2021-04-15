import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';

import HeaderDrawNav from '../../components/headerDrawNav';
import Botao1 from '../../components/botao1';
import CardDieta from '../../components/cardDieta';

import { connect } from 'react-redux';

import { watchDietas, deleteDieta } from '../../actions';

class Home extends React.Component {
    componentDidMount() {
        this.props.watchDietas();
    }

    render() {

        return (
            <View style={styles.container}>
                <HeaderDrawNav title='Home' navigation={this.props.navigation} />
                <ScrollView>
                    <View style={styles.botao}>
                        <Botao1
                            label="ADICIONAR"
                            onPress={() => { this.props.navigation.replace('AddDieta') }}
                        />
                    </View>
                    <FlatList
                        data={this.props.dietas}
                        renderItem={({ item }) => {
                            return (
                                <CardDieta
                                    dieta={item}
                                    onNavigate={() => this.props.navigation.navigate('ListaRefeicao', { dieta: item })}
                                    editarDieta={() => {
                                        this.props.navigation.replace('AddDieta', { dietaToEdit: item });
                                    }}
                                    deletarDieta={async () => { await this.props.deleteDieta(item) }}
                                />
                            );
                        }}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FC',
        flex: 1
    },
    botao: {
        paddingHorizontal: 30,
        paddingTop: 32
    },
    lista: {
        paddingHorizontal: 30,
        marginTop: 32
    }
})

const mapStateToProps = state => {
    const { listaDietas } = state;

    if (listaDietas === null) {
        return { dietas: listaDietas };
    }

    const keys = Object.keys(listaDietas);
    const listaDietasWithId = keys.map(key => {
        return { ...listaDietas[key], id: key }
    })
    return { dietas: listaDietasWithId }

}

export default connect(mapStateToProps, { watchDietas, deleteDieta })(Home);