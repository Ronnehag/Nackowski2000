import React from 'react';
import { connect } from "react-redux";
import { placeBet } from '../../store/actions/auctionAction';
import { getRemainingTime } from '../../Helpers/DateFunctions';
import moment from 'moment';

const bidValid = error => {
    let valid = true;

    Object.values(error).forEach(val => {
        val.length > 0 && (valid = false)
    })
    return valid;
}

class AuctionDetailsBet extends React.Component {

    state = {
        amount: 0,
        error: {
            amount: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        let highest = Math.max.apply(Math, this.props.bids.map(b => b.Summa));

        let error = this.state.error;
        switch (e.target.name) {
            case "amount":
                if (e.target.value < this.props.item.Utropspris) {
                    error.amount = "Budet måste vara högre än utropspriset"
                }
                else if (e.target.value <= highest) {
                    error.amount = "Budet måste vara högre än tidigare bud"
                }
                else {
                    error.amount = "";
                }
                break;
            default:
                break;
        };
        this.setState({ error, [e.target.name]: e.target.value });

    }


    handleClick = (e) => {
        e.preventDefault();

        if (bidValid(this.state.error)) {

            this.props.dispatch(placeBet(this.props.item.AuktionID, this.state.amount));

        }
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
        const { error } = this.state;

        let date3 = getRemainingTime(this.props.item.SlutDatum);
        const user = sessionStorage.getItem("user");

        let valid = this.props.item.SlutDatum > moment().format();
        console.log('valid: ' + valid);

        let highest = Math.max.apply(Math, this.props.bids.map(b => b.Summa));

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 text-left">
                                <p>Utropspris: {this.props.item.Utropspris}kr</p>
                            </div>
                            <div className="col-6 text-right">
                                <p>Slutar {date3}</p>
                            </div>
                        </div>
                        {user !== null && valid ?
                            <div className="input-group mt-2">
                                <input onChange={this.handleChange} name="amount" type="number" placeholder="Lägg bud"
                                    className={error.amount.length > 0 ? "form-control error" : "form-control"} required
                                />
                                {error.amount.length > 0 && (<span className="errorMessage">{error.amount}</span>)}

                                <button onClick={this.handleClick} className="btn btn-sm btn-primary ml-2">Lägg bud</button>
                            </div> : <p></p>}
                    </div>
                    {valid ? <div className="card-body">
                        <h6>Budgivare</h6>
                        <ul className="list-group">
                            {this.getBid()}
                        </ul>
                    </div> : <div className="card-body">
                            <h6>Avslutande bud</h6>
                            {this.props.bids.length > 0 ? <p>{highest} kr</p> : <p>Auktionen avslutades utan bud</p>}

                        </div>}

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
        auction: state.auctions.auction,
        user: state.auth.user

    }
}

export default connect(mapStateToProps)(AuctionDetailsBet);