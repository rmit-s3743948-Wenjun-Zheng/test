import React from 'react';
import { DatePicker } from 'antd';
import './index.css';
import { Button, Select } from 'antd';
import moment from 'moment'
import deepclone from 'loadsh';
import axios from 'axios'
const { Option } = Select;
// const children = [<Option key={0}>13:00-14:00</Option>, <Option key={1}>14:00-15:00</Option>, <Option key={2}>15:00-16:00</Option>, <Option key={3}>16:00-17:00</Option>, <Option key={4}>17:00-18:00</Option>, <Option key={5}>18:00-19:00</Option>, <Option key={6}>19:00-20:00</Option>, <Option key={7}>20:00-21:00</Option>, <Option key={8}>21:00-22:00</Option>, <Option key={9}>22:00-23:00</Option>, <Option key={10}>23:00-24:00</Option>];




class SelectRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state =
        {
            completeAlert: false,
            span: [],
            currentCheckedRoom: '',
            inputDate: '',
            people: '',
            showRoom: false,
            showPeriod: false,
            timeSpan: [
                {
                    key: 0,
                    time: '13:00-14:00',
                    disabled: false
                },
                {
                    key: 1,
                    time: '14:00-15:00',
                    disabled: false
                },
                {
                    key: 2,
                    time: '15:00-16:00',
                    disabled: false
                },
                {
                    key: 3,
                    time: '16:00-17:00',
                    disabled: false
                },
                {
                    key: 4,
                    time: '17:00-18:00',
                    disabled: false
                },
                {
                    key: 5,
                    time: '18:00-19:00',
                    disabled: false
                },
                {
                    key: 6,
                    time: '19:00-20:00',
                    disabled: false
                },
                {
                    key: 7,
                    time: '20:00-21:00',
                    disabled: false
                },
                {
                    key: 8,
                    time: '21:00-22:00',
                    disabled: false
                },
                {
                    key: 9,
                    time: '22:00-23:00',
                    disabled: false
                },
                {
                    key: 10,
                    time: '23:00-24:00',
                    disabled: false
                }
            ],
            numberPeople: [{
                value: '1-3',
                key: '1'
            },
            {
                value: '4-8',
                key: '2'
            }, {
                value: '9-15',
                key: '3'
            }, {
                value: '16+',
                key: '4'
            }],
            roomList: [
                {
                    roomSize: 'small',
                    roomChildren: [
                        {
                            roomNumber: 'Small Room 1',
                            disabled: false
                        }, {
                            roomNumber: 'Small Room 2',
                            disabled: false
                        }
                    ]
                }, {
                    roomSize: 'middle',
                    roomChildren: [
                        {
                            roomNumber: 'Middle Room 1',
                            disabled: false
                        }, {
                            roomNumber: 'Middle Room 2',
                            disabled: false
                        }
                    ]
                }, {
                    roomSize: 'large',
                    roomChildren: [
                        {
                            roomNumber: 'Large Room 1',
                            disabled: false
                        }, {
                            roomNumber: 'Large Room 2',
                            disabled: false
                        }, {
                            roomNumber: 'Large Room 3',
                            disabled: false
                        }
                    ]
                }, {
                    roomSize: 'party',
                    roomChildren: [
                        {
                            roomNumber: 'Party Room',
                            disabled: false
                        }
                    ]
                }

            ]
        }

    }

    confirmBooking() {
        let people = this.state.people
        let inputDate = this.state.inputDate
        let room = this.state.currentCheckedRoom
        let span = this.state.span
        if (!people || !inputDate || !room || !span.length) {
            this.setState({
                completeAlert:true
            })
            return;
        }   
    
            this.props.history.push({
                pathname: '/bookTime',
                state: {
                    people,
                    inputDate,
                    room,
                    span
                }
            })
    }

    showRoom = (value) => {
        var { roomList, } = this.state
        if (value.value != null) {
            this.setState({
                showRoom: true,
                people: value.value,
                completeAlert:false
            })
            if (value.value === '1-3') {
                let deepcopy = deepclone.cloneDeep(roomList)
                deepcopy.map((v) => {
                    v.roomChildren.map((value) => {
                        return value.disabled = true
                    })
                    return true
                })
                deepcopy[0].roomChildren[0].disabled = false
                deepcopy[0].roomChildren[1].disabled = false
                this.setState({
                    roomList: deepcopy
                })
            } else if (value.value === '4-8') {
                let deepcopy = deepclone.cloneDeep(roomList)
                deepcopy.map((v) => {
                    v.roomChildren.map((value) => {
                        return value.disabled = true
                    })
                    return true
                })
                deepcopy[1].roomChildren[0].disabled = false
                deepcopy[1].roomChildren[1].disabled = false
                this.setState({
                    roomList: deepcopy
                })
            } else if (value.value === '9-15') {
                let deepcopy = deepclone.cloneDeep(roomList)
                deepcopy.map((v) => {
                    v.roomChildren.map((value) => {
                        return value.disabled = true
                    })
                    return true
                })
                deepcopy[2].roomChildren[0].disabled = false
                deepcopy[2].roomChildren[1].disabled = false
                deepcopy[2].roomChildren[2].disabled = false
                this.setState({
                    roomList: deepcopy
                })
            } else {
                let deepcopy = deepclone.cloneDeep(roomList)
                deepcopy.map((v) => {
                    v.roomChildren.map((value) => {
                        return value.disabled = true
                    })
                    return true
                })
                deepcopy[3].roomChildren[0].disabled = false
                this.setState({
                    roomList: deepcopy
                })
            }
        }
    }

    timeAvailable = (date, dateString) => {
        // console.log('datatstring', dateString)
        this.setState({
            showPeriod: true,
            inputDate: dateString,
            completeAlert:false
        })

    }


    selectRoomBtn = (item) => {
        this.setState({
            currentCheckedRoom: item.roomNumber
        })
        axios.get('/api/queryAvailableSpan', {
            params: {
                inputDate: this.state.inputDate,
                room: item.roomNumber
            }
        }).then((res) => {
            let availableArr = deepclone.cloneDeep(this.state.timeSpan)
            availableArr.forEach((value, index) => {
                value.disabled = false
                res.data.forEach((v, i) => {
                    if (v.span === value.time) {
                        value.disabled = true
                    } 
                })
            })
            this.setState({
                timeSpan: availableArr
            })

        })


    }

    render() {
        var { roomList, numberPeople, timeSpan, showRoom, showPeriod, completeAlert } = this.state
        // var {roomChildren} = roomList

        var timeSpanArray = []
        timeSpan.map((value, index) => {
            return timeSpanArray.push(<Option disabled={value.disabled} value={value.time} key={index}>{value.time}</Option>)
        })
        return (
            < div className="select_room_main_board" >
                <p>Select Room</p>
                <br></br>
                <div className='dataInputBoard'>
                    <Select
                        onChange={this.showRoom}
                        labelInValue='true'
                        placeholder='Number of people'
                        className='select_Number_of_people' >
                        {
                            numberPeople.map((value, index) => {
                                return (<Option value={value.value} key={index}>{value.value}</Option>)
                            })
                        }
                    </Select>
                    <DatePicker placeholder='Date' className='inputDate' disabledDate={(currentDate) => {
                        return currentDate && currentDate > moment().add(7, 'days')
                    }}
                        onChange={this.timeAvailable}
                    />
                </div>
                <br></br>
                {
                    showRoom && (
                        <div className='select_room'  >
                            {
                                roomList.map((value, index) => {
                                    return (
                                        <div className='room_item' key={index}>
                                            <div key={index} >
                                                {
                                                    value.roomChildren.map((v, i) => {
                                                        return (
                                                            // <Radio.Button key={Math.random()} value="a">{v.roomNumber}</Radio.Button>
                                                            <Button disabled={v.disabled} value={v.roomSize} className={v.roomNumber} key={i}
                                                                onClick={() => {
                                                                    this.selectRoomBtn(v);
                                                                }}
                                                            > {v.roomNumber}</Button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    )
                }

                {
                    showPeriod && (
                        <div className='timePeriod'>
                            <Select placeholder="Time period" mode="multiple" className='timespan' onChange={(value) => {
                                this.setState({
                                    span: value,
                                    completeAlert:false
                                })
                            }}>
                                {timeSpanArray}
                            </Select>
                        </div>
                    )
                }
                <br />
                <div className="confirmBtn">
                    <Button className="confirm" onClick={this.confirmBooking.bind(this)}> Confirm </Button>                     
                    {
                        completeAlert && (<span className='completeAlert'>Please complete the form!</span>)
                        
                    }
                </div>

            </div >
        )
    }
}

export default SelectRoom;