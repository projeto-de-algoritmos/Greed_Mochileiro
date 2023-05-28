import { useState } from "react";
import { Avatar, Button, DataTable, Dialog, FAB, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { Image, ScrollView, StyleSheet } from "react-native";
import listBox from "../../../assets/list-box.png"
import mochila from "../../../assets/mochila.png"
import mochila_2 from "../../../assets/mochila_2.png"
import sacoDeCafe from "../../../assets/sacoDeCafé.png"
import barrasDeOuro from "../../../assets/barrasDeOuro.png"
import tecido from "../../../assets/tecido.png"
import { SelectList } from "react-native-dropdown-select-list";

export default function Home() {
    const [text, setText] = useState("")
    const [x, setX] = useState(350)
    const [y, setY] = useState(300)
    const [exibeResultado, setExibeResultado] = useState(false)
    const [exibeAlerta, setExibeAlerta] = useState(false)
    const [numAlerta, setNumAlerta] = useState(0)
    const [editaLista, setEditaLista] = useState(false)
    const [valorTotal, setValorTotal] = useState(0)
    const [adicionarVisivel, setAdicionarVisivel] = useState(false)
    const [selecionado, setSelecionado] = useState("")
    const [adicionarPeso, setAdicionarPeso] = useState("")
    const [adicionarValor, setAdicionarValor] = useState("")
    const [produtos, setProdutos] = useState([])
    const [lista, setLista] = useState([])
    const dados = [
        {key:'0', value:'Arroz', icon: sacoDeCafe},
        {key:'1', value:'Café', icon: sacoDeCafe},
        {key:'2', value:'Ouro', icon: barrasDeOuro},
        {key:'3', value:'Tecido', icon: tecido},
    ]

    /**
     * Algoritmo da Mochila (Knapsack)
     */
    const calculaResultado = () => {
        if (lista.length == 0) {
            setNumAlerta(numAlerta+1)
            setExibeAlerta(true)
            setX(350)
            setY(300)
            return
        }
        let capacidade

        //Se a capacidade não tiver sido definida, por padrão ela será de 20kg.
        if (text == "") {
            capacidade = 20
        } else {
            capacidade = text
        }

        let acumulado = 0

        while (capacidade && lista.length) {
            //Pega o produto de maior valor da lista.
            let maior = lista[0]
            let index = 0
            for (let i = 1; i < lista.length; i++) {
                if (lista[i].valorEspecifico > maior.valorEspecifico) {
                    maior = lista[i]
                    index = i
                }
            }
            
            if (maior.peso <= capacidade) {
                capacidade -= maior.peso
                acumulado += maior.valor
                lista.splice(index, 1)
                
                setProdutos([...produtos, maior])
            } else {
                let valorDaFracao = capacidade * maior.valorEspecifico
                let sobra = {...maior}
                maior.peso = capacidade
                maior.valor = valorDaFracao
                capacidade = 0
                setProdutos([...produtos, maior])
                acumulado += valorDaFracao

                //Produto que não coube na mochila.
                sobra.peso -= maior.peso
                sobra.valor -= valorDaFracao
                lista.splice(index, 1, sobra)
            }
        }
        setValorTotal(acumulado)
        setExibeResultado(true)
        setX(350)
        setY(300)
    }

    /**
     * Adiciona produto à lista de produtos
     */
    const adicionarProduto = () => {
        const novoProduto = {
            produto: dados[selecionado].value,
            peso: Number(adicionarPeso),
            valor: Number(adicionarValor),
            valorEspecifico: adicionarValor/adicionarPeso,
            icone: dados[selecionado].icon
        }

        setLista([...lista, novoProduto])

        setAdicionarVisivel(false)
        setAdicionarPeso("")
        setAdicionarValor("")
        setSelecionado("")
    }

    return (
        <>
            <Portal>
                {/**
                 * Modal que exibe o resultado do Algoritmo da Mochila.
                 */}
                <Modal
                    visible={exibeResultado}
                    onDismiss={() => setExibeResultado(false)}
                    contentContainerStyle={styles.modal}
                >
                    <IconButton
                        icon="close"
                        onPress={() => {
                            setExibeResultado(false)
                            setProdutos([])
                            setValorTotal(0)
                        }}
                        style={styles.botaoX}
                    />

                    <Text
                        style={styles.texto}
                    >Valor Total: {valorTotal}</Text>

                    <DataTable style={{ height: 450 }}>
                        <DataTable.Header>
                            <DataTable.Title />
                            <DataTable.Title>Produto</DataTable.Title>
                            <DataTable.Title numeric>Peso (kg)</DataTable.Title>
                            <DataTable.Title numeric>Valor</DataTable.Title>
                        </DataTable.Header>

                        <ScrollView>
                            {produtos.length > 0 && produtos.map((produto, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell  style={{width: 20}}>
                                            <Avatar.Image
                                                source={produto.icone}
                                                size={40}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        </DataTable.Cell>
                                        <DataTable.Cell>{produto.produto}</DataTable.Cell>
                                        <DataTable.Cell numeric>{produto.peso}</DataTable.Cell>
                                        <DataTable.Cell numeric>{produto.valor}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </ScrollView>
                    </DataTable>
                </Modal>

                {/**
                 * Modal que exibe todos os produtos da lista.
                 */}
                <Modal
                    visible={editaLista}
                    onDismiss={() => setEditaLista(false)}
                    contentContainerStyle={styles.modal}
                >
                    <IconButton
                        icon="close"
                        onPress={() => setEditaLista(false)}
                        style={styles.botaoX}
                    />
                    
                    <DataTable style={{ height: 500 }}>
                        <DataTable.Header>
                            <DataTable.Title />
                            <DataTable.Title>Produto</DataTable.Title>
                            <DataTable.Title numeric>Peso (kg)</DataTable.Title>
                            <DataTable.Title numeric>Valor</DataTable.Title>
                        </DataTable.Header>

                        <ScrollView>
                            {lista.length > 0 && lista.map((produto, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell  style={{width: 20}}>
                                            <Avatar.Image
                                                source={produto.icone}
                                                size={40}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        </DataTable.Cell>
                                        <DataTable.Cell>{produto.produto}</DataTable.Cell>
                                        <DataTable.Cell numeric>{produto.peso}</DataTable.Cell>
                                        <DataTable.Cell numeric>{produto.valor}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </ScrollView>
                    </DataTable>

                    <Button
                        mode="elevated"
                        icon="plus"
                        style={styles.botaoAdicionar}
                        onPress={() => setAdicionarVisivel(true)}
                        labelStyle={{color: "deepskyblue"}}
                    >Adicionar</Button>
                </Modal>

                {/**
                 * Modal quee exibe a janela de adição de produtos.
                 */}
                <Modal
                    visible={adicionarVisivel}
                    onDismiss={() => {
                        setAdicionarVisivel(false)
                        setAdicionarPeso("")
                        setAdicionarValor("")
                        setSelecionado("")
                    }}
                    contentContainerStyle={{
                        ...styles.modal,
                        height: 400,
                        width: '80%',
                        justifyContent: 'flex-start',
                        paddingHorizontal: 20,
                        paddingVertical: 60,
                    }}
                >
                    <Button
                        mode="elevated"
                        icon="plus"
                        disabled={adicionarPeso == "" || adicionarValor == "" || selecionado == "" || adicionarPeso == 0 || adicionarPeso == 0}
                        style={styles.botaoAdicionar}
                        onPress={() => adicionarProduto()}
                        labelStyle={{
                            color: adicionarPeso == "" || adicionarValor == "" || selecionado == "" || adicionarPeso == 0 || adicionarPeso == 0 ? "gray" : "deepskyblue"
                        }}
                    >Adicionar</Button>
                    
                    <TextInput
                        mode="outlined"
                        value={adicionarPeso}
                        label="Peso (kg)"
                        keyboardType="numeric"
                        style={{
                            position: 'absolute',
                            top: 150,
                            width: '100%',
                            alignSelf: 'center',
                            backgroundColor: 'white',
                        }}
                        outlineStyle={{ borderRadius: 10 }}
                        onChangeText={peso => setAdicionarPeso(peso.replace(/[^0-9]/g, ''))}
                    />

                    <TextInput
                        mode="outlined"
                        value={adicionarValor}
                        label="Valor"
                        keyboardType="numeric"
                        style={{
                            position: 'absolute',
                            top: 250,
                            width: '100%',
                            alignSelf: 'center',
                            backgroundColor: 'white',
                        }}
                        outlineStyle={{ borderRadius: 10 }}
                        onChangeText={valor => setAdicionarValor(valor.replace(/[^0-9]/g, ''))}
                    />

                    <SelectList
                        setSelected={(produto) => setSelecionado(produto)}
                        data={dados}
                        save="key"
                        placeholder="Selecione um produto"
                        dropdownStyles={{ backgroundColor: 'white'}}
                        searchPlaceholder="Pesquisar"
                    />

                </Modal>

                <Dialog visible={exibeAlerta} onDismiss={() => setExibeAlerta(false)}>
                    <Dialog.Title>
                        {numAlerta < 3 ? "Atenção!" : "Preste atenção, caramba!"}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            A lista está vazia! Adicione produtos à
                            lista antes de movê-la para a mochila.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            labelStyle={{color: "deepskyblue"}}
                            onPress={() => setExibeAlerta(false)}
                        >Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <TextInput
                label="Capacidade da mochila"
                value={text}
                cursorColor="white"
                defaultValue="20"
                activeOutlineColor="white"
                textColor="white"
                outlineColor="white"
                selectionColor="rgba(255,255,255,0.5)"
                placeholderTextColor="white"
                placeholder="20"
                onChangeText={text => setText(text.replace(/[^0-9]/g, ''))}
                right={<TextInput.Affix text="kg" textStyle={{color: 'white'}}/>}
                keyboardType="numeric"
                style={{
                    position: "absolute",
                    width: 250,
                    fontSize: 12,
                    top: 80,
                    backgroundColor: 'transparent',
                    textAlignVertical: "bottom"
                }}
                mode="outlined"
                outlineStyle={{
                    borderStyle: "dashed",
                    top: 15,
                    bottom: 5,
                }}
            />

            <FAB
                visible={y < 680 ? true : false}
                icon={listBox}
                onPress={() => setEditaLista(true)}
                style={{
                    ...styles.fab,
                    left: x-20,
                    top: y-20,
                }}
                color="deepskyblue"
                onTouchMove={(e) => {
                    setX(e.nativeEvent.pageX)
                    setY(e.nativeEvent.pageY)
                }}
                onTouchEnd={() => {
                    if(y >= 680) {
                        calculaResultado()
                    }
                }}
            />

            <Image
                style={{
                    ...styles.imagem,
                    zIndex: 0,
                    height: 454
                }}
                source={mochila}
            />
            <Image
                style={{
                    ...styles.imagem,
                    zIndex: 20,
                    height:297
                }}
                source={mochila_2}
            />
        </>
    )
}

const styles = StyleSheet.create({
    botaoX: {
        position: "absolute",
        top: 10,
        right: 10
    },
    botaoAdicionar: {
        position: "absolute",
        bottom: 10,
        alignSelf: "center"
    },
    modal: {
        backgroundColor: 'white',
        height: '80%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
    },
    texto: {
        position: "absolute",
        top: 40,
        alignSelf: "center"
    },
    fab: {
        position: "absolute",
        zIndex: 10
    },
    imagem: {
        position: "absolute",
        bottom: -150,
        resizeMode: "contain",
        width: 370,
    }
})