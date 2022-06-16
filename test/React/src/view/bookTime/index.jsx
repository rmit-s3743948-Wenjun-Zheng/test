import React from 'react';
import './index.css';
import { Input, Button,InputNumber} from 'antd';
import axios from 'axios'







class BookTime extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            realPeople: '',
            phone: '',
            numberPeopleAlert: false,
            phoneNumberAlert: false,
            completeAlert:false,
            alerMessage:'Please complete the form',
            failCreateOrder:false
        }
    }


    goBookConfirm() {
        let name = this.state.name
        let realPeople = this.state.realPeople
        let phone = this.state.phone
        // let people = this.props.location.state.people
        // let inputDate = this.props.location.state.inputDate
        // let room = this.props.location.state.room
        // let span = this.props.location.state.span
        // let data = []
        // span.map((value)=>{
        //     let obj = {
        //         name,realPeople,phone,people,inputDate,room,value

        //     }
        //     return data.push(obj)
        // })
        // console.log(data)
        if(!name||!realPeople||!phone){
            this.setState({
                completeAlert:true,
                alerMessage:'Please complete the form'
            })
        }
        if(!this.props.location.state){
            this.setState({
                completeAlert:true,
                alerMessage:'You did not select room yet, please go back.'
            })
        }else if(!name||!realPeople||!phone){
            this.setState({
                completeAlert:true,
                alerMessage:'Please complete the form'
            })
        }
            setTimeout(()=>{
            this.setState({
                completeAlert:false,
            })
        }, 2000)
        axios.post('./api/create',{
            ...this.props.location.state,
            name,
            phone,
            realPeople
        }).then((res)=>{
            if(res.data ==='one phone number cant have 2 orders'){
                this.setState({
                    failCreateOrder:true,
                },()=>{
                    setTimeout(()=>{
                        this.setState({
                            failCreateOrder:false,
                        })
                    }, 5000)
                })
            }else{
                this.props.history.push({
                    pathname: '/bookingConfirm',
                    state: {
                        ...this.props.location.state,
                        name,
                        phone,
                        realPeople
                    }
                });
            }

        })
    }

    isNumber = (val) => {
        let isNum = false 
        var regPos = /^\d+(\.\d+)?$/; 
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if(regPos.test(val) || regNeg.test(val)) {
            isNum = true
            return isNum;
            } else {
                isNum = false
            return isNum;
            }
        }

        componentWillUnmount = () => {
            this.setState = (state,callback)=>{
              return;
            };
        }
        
    render() {
        var { numberPeopleAlert, phoneNumberAlert,completeAlert,failCreateOrder}= this.state
        return (<div className="select_time">
            <p>
                Booking details
            </p>


            <Input onChange={(e) => {
                this.setState({
                    name : e.target.value
                })

            }} className="name" placeholder="Name"></Input>

            <InputNumber
                className="numberPeople"
                min={0}
                max={15}
                onChange={(value) => {
                        this.setState({
                            realPeople:value
                        })
                    }
                }

                onBlur = {() =>{
                    this.setState({
                        phoneNumberAlert:false
                    })
                }}

                placeholder="Number of people"/>
            {
                phoneNumberAlert && (<span className='alert_message' >Please input integer number!</span>)
            }
            <Input className="phone" placeholder="Phone number" onChange ={(e)=>{
                let isNum = this.isNumber(e.target.value)
                
                if(!isNum){
                    this.setState({
                        numberPeopleAlert:true
                    })
                }
                this.setState({
                    phone:e.target.value
                })
            }} onBlur = {() =>{
                this.setState({
                    numberPeopleAlert:false
                })
            }}></Input>
            {
                numberPeopleAlert&& (<span className='alert_phone_message'>Please input correct number!</span>)
            }


            <div className="submit_div">
                <Button className="submit" onClick={this.goBookConfirm.bind(this)}> Submit </Button>
            </div>
            <div className = 'alerMeassageDiv'>
                { completeAlert&&(<span className = 'completeAlertbooktime'> {this.state.alerMessage}</span>)}
            </div>
            <div className = 'failedCreateOrder'>
                { failCreateOrder&&(<span className = 'completeAlertbooktime'> One phone number allow to create a single order</span>)}
            </div>
        </div >

        )
    }
}


export default BookTime;