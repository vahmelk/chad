import React from 'react';
import Data from './UserDet/Data';
import { StyleSheet, Text, View, Image } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import moment from 'moment'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: JSON.stringify(moment()),
            customDatesStyles: []
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.setColors = this.setColors.bind(this);
        this.setColors();
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
        this.props.parentCallback(JSON.stringify(date.clone().add(1, 'day')))
    }

    setColors() {
        Data.events.map(ev => {
            this.state.customDatesStyles.unshift({
                date: ev.start,
                style: { backgroundColor: ev.backgroundColor },
                textStyle: { color: '#fff' }, // sets the font color
                containerStyle: [], // extra styling for day container
            });
        })
    }

    render() {
        return (
            <View style={{backgroundColor: "white"}}>
                <View>
                    <CalendarPicker
                        onDateChange={this.onDateChange}
                        weekdays={Data.weekdays}
                        startFromMonday={true}
                        months={Data.months}
                        previousTitle={'<'}
                        nextTitle={'>'}
                        todayTextStyle={styles.todayTextStyle}
                        selectedDayColor={'transparent'}
                        selectedDayStyle={styles.selectedDayStyle}
                        selectedDayTextColor={'#000'}
                        customDatesStyles={this.state.customDatesStyles}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selectedDayStyle: {
        borderWidth: 1,
        borderColor: "black"
    },
    todayTextStyle: {
        fontWeight: 'bold',
    }
});
