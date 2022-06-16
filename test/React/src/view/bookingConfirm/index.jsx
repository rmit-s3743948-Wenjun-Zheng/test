import React from 'react';
import { Descriptions } from 'antd';
import axios from 'axios';

import './index.css';


class BookingConfirm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name:'',
            phone:'',
            room:'',
            inputDate:'',
            realPeople:'',
            span:[]

        }
    }

    componentDidMount(){
        // console.log( this.props.location.state)
        if(!this.props.location.state){
            return
        }
        axios.get('/api/query',{
            params:{
               ...this.props.location.state
            }
        }).then((res)=>{
            let spanShow = []
            res.data.map((value)=>{
                spanShow.push(value.span)
                return true
            })

            this.setState({
                name:res.data[0].name,
                phone:res.data[0].phone,
                room:res.data[0].room,
                inputDate:res.data[0].inputDate,
                realPeople:res.data[0].people,
                span:spanShow
            })
        })
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
          return;
        }
    }
    

    render() {
        return (
            <div className="comfirmationShow">
                <Descriptions title="Booking Info" className="confirmationDetails">
                    <Descriptions.Item label="Customer Name" value={this.state.name}>{this.state.name}</Descriptions.Item>
                    <Descriptions.Item label="Phone" value={this.state.phone}>{this.state.phone}</Descriptions.Item>
                    <Descriptions.Item label="Room  Number" value={this.state.room}>{this.state.room}</Descriptions.Item>
                    <Descriptions.Item label="Number of people" value={this.state.phone}>{this.state.phone}</Descriptions.Item>
                    <Descriptions.Item label="Date" value={this.state.inputDate}>{this.state.inputDate}</Descriptions.Item>
                    <Descriptions.Item label="Time">{this.state.span}</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

export default BookingConfirm;