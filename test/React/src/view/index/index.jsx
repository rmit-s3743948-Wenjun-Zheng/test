import React from 'react';

import './index.css';


class Index extends React.Component {

    butClick() {
        // 跳转页面
        // console.log('')
        this.props.history.push('/selectRoom')
    }

    render() {
        return (
            <div className="starting_page">
                <p>Soundbox Karaoke</p>
                <button id="bookingButton" onClick={this.butClick.bind(this)}>booking</button>
            </div>
        )
    }
}

export default Index;