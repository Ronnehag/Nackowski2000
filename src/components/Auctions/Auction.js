import React from 'react';
export default class Auction extends React.Component {

    render() {
        console.log(this.props.item.SlutDatum)
        console.log(this.props)
        var date = new Date(this.props.item.SlutDatum.replace('T', ' '));
        console.log()

        return (
            <div className="col-lg-4 cardSizing">
                <div className="card">
                    <img class="card-img-top" src="https://picsum.photos/200/300/?random" alt="Card image cap" />
                    <div className="card-body">
                        <h6 className="card-title">Titel: {this.props.item.Titel} </h6>
                        <p className="card-text">Beskrivning: {this.props.item.Beskrivning}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <p>Skapad: {date.toLocaleString()} Utropspris: {this.props.item.Utropspris}kr</p> </li>
                        <li className="list-group-item"></li>
                    </ul>
                </div>


            </div>
        );
    }
}