import React from 'react'
import Data from './UserDet/Data'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default class BookedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noTime: false,
        }
    }

    getContentForBooked() {
        let countOfEvents = 0, color;
        Data.events.map(el => {
            if (el.start.indexOf(this.props.selectedDay.slice(1, 11)) > -1) {
                countOfEvents++;
                color = el.backgroundColor;
            }
        })
        return (
            <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
                <Text style={{ color: "white", marginBottom: 10 }}>
                    Your Events For {this.props.selectedDay.slice(1, 11)}
                </Text>
                <View>
                    {
                        (countOfEvents !== 0) ?
                            (
                                <TouchableOpacity
                                    activeOpacity={.7}
                                    style={[styles.time, { backgroundColor: color }]}
                                    onPress={() => this.props.setModalVisible(true)}
                                >
                                    <Text style={styles.timeText}>{countOfEvents} Booked Events</Text>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <View style={[styles.time, { backgroundColor: "#404142" }]}>
                                    <Text style={styles.timeText}>No Booked Events</Text>
                                </View>
                            )
                    }
                </View>
            </View>
        )
    }

    render() {
        return this.getContentForBooked()
    }
}

const styles = StyleSheet.create({
    timeText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    time: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
});