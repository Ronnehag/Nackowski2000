import React from 'react';

export default class Auction extends React.Component
{
    render()
    {
        console.log(this.props.item)
        console.log(this.props)

        return(
        <div className="row">
            <div className="col-lg-12">
                <div><h6>Titel: {this.props.item.Titel} </h6> <p>Datum: {this.props.item.SlutDatum}</p></div>
                <p>Beskrivning: {this.props.item.Beskrivning}</p>
            </div>
        </div>);
    }
}