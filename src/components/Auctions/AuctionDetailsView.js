import React from 'react';

export default class AuctionDetailsView extends React.Component {
    render() {
        var date = new Date(this.props.item.StartDatum.replace('T', ' '));
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
            <div>
                <h2>Produkt</h2>
                <div className="card">
                    <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <div className="text-left">{this.props.item.Titel}</div>
                        </div>
                        <div className="col-6">
                            <div className="text-right">{date.toLocaleString("sv-SE", dateOptions)}</div>
                        </div>
                    </div>
                    </div>
                    <div className="card-body">
                        {this.props.item.Beskrivning}
                    </div>
                    <div className="card-footer">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary btn-md">Ta bort</button>
                            <button type="button" className="btn btn-primary btn-md">Uppdatera</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}