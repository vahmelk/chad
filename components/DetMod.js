import React from 'react';
import { Modal, Text, StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements'
import Data from './UserDet/Data'

export default class DetMod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notSended: true,
            SEND_CODE: '',
            userCode: '',
            bc: "black"
        }
        this.sendMess = this.sendMess.bind(this);
        this.verif = this.verif.bind(this);
    }

    verif() {
        if (this.state.SEND_CODE == this.state.userCode) {
            this.setState({ bc: "green" });
            this.props.hideFull();
        } else
            this.setState({ bc: "red" })
    }

    sendMess() {
        this.setState({
            notSended: false,
            SEND_CODE: makeRan(4)
        })
        setTimeout(() => {
            console.log('code=' + this.state.SEND_CODE)
        }, 500);
    }

    componentWillReceiveProps() {
        this.setState({ notSended: true })
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => this.props.hide()}
            >
                <View style={styles.con}>
                    <View
                        style={styles.bg}
                    >
                        <KeyboardAvoidingView style={styles.inner} behavior="position">
                            <View>
                                <View style={styles.head}>
                                    <Text style={styles.headtxt}>Veify</Text>
                                    <TouchableOpacity
                                        activeOpacity={.7}
                                        onPress={() => this.props.hide()}
                                        style={{ padding: 15 }}
                                    >
                                        <Icon name="close" color="white" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.body}>
                                    <Text style={styles.txt}>Day: {this.props.day}</Text>
                                    <Text style={styles.txt}>Time: {this.props.time}</Text>
                                    <Text style={styles.txt}>Name: {this.props.name}</Text>
                                    <Text style={styles.txt}>Surname: {this.props.sname}</Text>
                                    <Text style={styles.txt}>Phone Number: {this.props.number}</Text>
                                    {
                                        this.props.message.trim() != '' &&
                                        <Text style={styles.txt}>Message: {this.props.message.trim()}</Text>
                                    }
                                    <Text>Enter your verification code</Text>
                                    <View>
                                        {
                                            this.state.notSended ?
                                                <TouchableOpacity
                                                    activeOpacity={.7}
                                                    style={[styles.ver, { marginVertical: 10 }]}
                                                    onPress={this.sendMess}
                                                >
                                                    <Text style={styles.vertxt}>Send Verification Code</Text>
                                                </TouchableOpacity>
                                                :
                                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                                    <TextInput
                                                        style={[styles.verificationCode, { borderColor: this.state.bc }]}
                                                        keyboardType="numeric"
                                                        maxLength={4}
                                                        onSubmitEditing={this.verif}
                                                        value={this.state.userCode}
                                                        onChangeText={txt => this.setState({ userCode: txt })}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={this.verif}
                                                        activeOpacity={.7}
                                                        style={[styles.ver, { marginLeft: 20 }]}
                                                    >
                                                        <Text style={styles.vertxt}>Submit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    ver: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5
    },
    vertxt: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    },
    verificationCode: {
        borderWidth: 1,
        borderColor: "black",
        width: 69,
        padding: 10,
        marginVertical: 10,
        fontSize: 21
    },
    txt: {
        fontSize: 16,
        paddingVertical: 5
    },
    body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 10
    },
    headtxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        padding: 15
    },
    head: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Data.headerColor
    },
    inner: {
        borderRadius: 10,
        backgroundColor: "white",
        width: "80%",
        zIndex: 20
    },
    con: {
        backgroundColor: Data.headerColor,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: "100%"
    },
    bg: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    }
})

function makeRan(length) {
    var result = '';
    var characters = '0123456789012345678901234567890123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}