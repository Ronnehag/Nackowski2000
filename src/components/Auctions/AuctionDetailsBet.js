import React from 'react';

export default class AuctionDetailsBet extends React.Component {
    
    getBid = () => {
        if(!this.props.bids)
        {
            return "Finns inga bud!"
        }
        this.props.bids.map((k => {
            console.log(k.Budgivare)
            return (
                <div>
                    <li className="list-group-item">{k.Budgivare} {k.Summa}kr</li>
                </div>
            );
        }))
    }
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
            
            <div>
                <h2>Budgivare</h2>
                <div className="card">
                    <div className="card-header">
                        <p>Utropspris: {this.props.item.Utropspris}kr Högsta bud: xxx kr Slutdatum: {date.toLocaleString("sv-SE", dateOptions)}</p>
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