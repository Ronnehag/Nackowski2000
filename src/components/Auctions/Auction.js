import React from 'react';
export default class Auction extends React.Component {

    render() {
        var date = new Date(this.props.item.SlutDatum.replace('T', ' '));
        const dateOptions = {
            hour12: false,
            timeZone: "UTC",
            //year: "numeric",
            day: "numeric",
            month: "numeric",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit"
        }

        return (
            <div className="col-lg-3 cardSizing">
                <div className="card" style={{ position: "relative" }}>
                    <img className="card-img-top" src="https://picsum.photos/200/200/?random" alt="auktionsbild" />
                    <div className="card-body">
                        <h6 className="card-title">{this.props.item.Titel} </h6>
                        <p className="card-text">{this.props.item.Beskrivning}</p>
                        <div className="row">
                            <div className="col-6 text-left">
                                <p id="price"><strong>{this.props.item.Utropspris} kr</strong> 31 bud</p>
                            </div>
                            <div className="col-6 text-right">
                                <p id="date-tag">{date.toLocaleString("sv-SE", dateOptions)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}