import React from 'react';

export default class AuctionDetailsView extends React.Component {
    render() {
        return (
            <div>
                <h2>Produkt</h2>
                <div className="card">
                    <div className="card-header">{this.props.item.Titel}</div>
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