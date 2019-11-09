import React from 'react'
import { Icon } from 'react-native-elements'
import Data from './UserDet/Data'
import { StyleSheet, View, Text, TouchableOpacity, Picker, ScrollView, ScrollViewComponent } from 'react-native'

export default class BottomDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timePicked: '',
            noTime: false,
        }
    }

    firstTimePicked = '';
    isAnyAvailableTime = false;

    getContentForRegistration() {
        let iter = 0;
        return (
            Data.timeTypeIsSelect ?
                Data.times.map(el => {
                    this.isAnyAvailableTime = false;
                    return ((this.props.selectedDay.indexOf(el.day) > -1) ? 1 : 0)
                }).reduce((a, b) => a + b) === 0 ?
                    <View>
                        <View style={styles.noTime}>
                            <Text style={styles.noTimeText}>No available hours</Text>
                        </View>
                    </View>
                    :
                    <>
                        <View style={styles.inner}>
                            <Picker
                                selectedValue={this.state.timePicked}
                                onValueChange={itemValue => this.setState({ timePicked: itemValue })}
                            >
                                {Data.times.map((el, ind) => {
                                    if (this.props.selectedDay.indexOf(el.day) > -1) {
                                        this.isAnyAvailableTime = true;
                                        this.firstTimePicked = Data.times[ind].available[0];
                                        return Data.times[ind].available.map(time =>
                                            <Picker.Item label={time} value={time} />
                                        )
                                    }
                                    else return [];
                                })}
                            </Picker>
                        </View>
                    </>
                :
                <ScrollView>
                    {
                        (Data.times.map((el, ind) => {
                            if (this.props.selectedDay.indexOf(el.day) > -1) {
                                iter = ind;
                                return Data.times[ind].available.map(time => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { this.props.setAddEventModalVisible(true, time) }}
                                            style={styles.select}
                                            activeOpacity={.7}
                                        >
                                            <Text style={styles.selectText}>{time}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        })[iter])
                    }
                </ScrollView>
                ||
                <View>
                    <View style={styles.noTime}>
                        <Text style={styles.noTimeText}>No available hours</Text>
                    </View>
                </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ color: "white", marginBottom: 10 }}>
                    You Can Book This Times For {this.props.selectedDay.slice(1, 11)}
                </Text>
                <View style={styles.con}>
                    {this.getContentForRegistration()}
                </View>
                {
                    this.isAnyAvailableTime &&
                    <View style={{ position: "absolute", bottom: 0, right: 15 }}>
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={() => { this.props.setAddEventModalVisible(true, this.state.timePicked || this.firstTimePicked) }}
                        >
                            <Icon
                                name='angle-right'
                                type='font-awesome'
                                color='#fff'
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nextBtn: {
        backgroundColor: "blue",
        width: 50,
        height: 50,
        borderRadius: 50,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    noTimeText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    noTime: {
        width: "100%",
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    con: {
        backgroundColor: Data.headerColor,
    },
    selectText: {
        color: "white",
        lineHeight: 20,
        fontSize: 16
    },
    select: {
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        margin: 2,
        marginBottom: 10,
    },
    inner: {
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
        overflow: "hidden",
        color: "black"
    }
});
