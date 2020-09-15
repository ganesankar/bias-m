import React, { Component } from 'react'

export default class GridCard extends Component {
    render() {
        return (
            <div >
              Card-{this.props.color}  
            </div>
        )
    }
}