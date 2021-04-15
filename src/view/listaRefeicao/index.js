import * as React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { watchRefeicoes, deleteRefeicao } from '../../actions';

import HeaderVoltar from '../../components/headerVoltar';
import Botao1 from '../../components/botao1';
import CardRefeicao from '../../components/cardRefeicao';

class ListaRefeicao extends React.Component {

    componentDidMount() {
        const { route } = this.props;

        this.props.watchRefeicoes(route.params.dieta);
    }

    render() {
        const { route, navigation } = this.props;

        return (
            <View style={styles.container}>
                <HeaderVoltar title='Lista das refeições' onPress={() => navigation.pop()} />
                <ScrollView>
                    <View style={styles.botao}>
                        <Botao1
                            label="ADICIONAR"
                            onPress={() => navigation.navigate('AddRefeicao', { dieta: route.params.dieta })}
                        />
                    </View>
                    <FlatList
                        data={this.props.refeicoes}
                        renderItem={({ item }) => {
                            return (
                                <CardRefeicao
                                    refeicao={item}
                                    editarRefeicao={() => {
                                        navigation.navigate('AddRefeicao', { dieta: route.params.dieta, refeicaoToEdit: item });
                                    }}
                                    deletarRefeicao={async () => { await this.props.deleteRefeicao(route.params.dieta, item) }}
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
        paddingTop: 32,
        paddingHorizontal: 30
    }
})

const mapStateToProps = state => {
    const { listaRefeicoes } = state;

    if (listaRefeicoes === null) {
        return { refeicoes: listaRefeicoes };
    }

    const keys = Object.keys(listaRefeicoes);
    const listaRefeicoesWithId = keys.map(key => {
        return { ...listaRefeicoes[key], id: key }
    })
    return { refeicoes: listaRefeicoesWithId }

}

export default connect(mapStateToProps, { watchRefeicoes, deleteRefeicao })(ListaRefeicao);