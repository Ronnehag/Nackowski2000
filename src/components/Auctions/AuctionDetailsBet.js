import React from 'react';

export default class AuctionDetailsBet extends React.Component {

    getBid = () => {
        return this.props.bids.length ? (
            this.props.bids.map((k => {
                return (
                    <div>
                        <li className="list-group-item">{k.Budgivare} {k.Summa}kr</li>
                    </div>
                );
            }))
        ) : (<span>Finns inga bud</span>);
    }
    render() {

        return (

            <div>
                <h2>Budgivare</h2>
                <div className="card">
                    <div className="card-header">
                        <p>Utropspris: {this.props.item.Utropspris}kr Högsta bud: xxx kr</p>
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Lägg bud" />
                            <button className="btn btn-primary btn-sm">skicka</button>
                        </div>
                    </div>
                    <h6>Budgivare</h6>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.getBid()}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}