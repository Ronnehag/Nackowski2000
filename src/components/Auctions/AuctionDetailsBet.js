import React from 'react';
import { connect } from "react-redux";
import { placeBet } from '../../store/actions/auctionAction';

class AuctionDetailsBet extends React.Component {

    state = {
        amount: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.dispatch(placeBet(this.props.item.AuktionID, this.state.amount));
    }

    getBid = () => {
        return this.props.bids.length ? (
            this.props.bids.sort((a, b) => {
                if (a.Summa === b.Summa) return 0;
                return a.Summa < b.Summa ? 1 : -1;
            }).map(((k, i) => {
                return (
                    <li key={k.BudID} style={i == 0 ? first : null} className="list-group-item">{k.Budgivare} {k.Summa}kr</li>
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
                            <input className="form-control" onChange={this.handleChange} name="amount" type="number" placeholder="Lägg bud" />
                            <button onClick={this.handleClick} className="btn btn-primary btn-sm">skicka</button>
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

const first = {
    backgroundColor: "#146ED0",
    color: "#fff"
}

const mapStateToProps = (state) => {
    return {
        auction: state.auctions.auction
    }
}

export default connect(mapStateToProps)(AuctionDetailsBet);