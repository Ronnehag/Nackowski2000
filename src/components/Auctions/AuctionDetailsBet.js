import React from 'react';
import { connect } from "react-redux";
import { placeBet } from '../../store/actions/auctionAction';
import { getRemainingTime, formatDate } from '../../Helpers/DateFunctions';
import { controlIfHighestBid, controlIfAuctionIsValid, getHighestBid } from '../../Helpers/BidControll';
import moment from 'moment';



class AuctionDetailsBet extends React.Component {

    static initialState = () => {
        return {
            amount: "Lägg bud",
            error: {
                amount: "",
            },
            highestBid: "",
            disabled: false
        }
    }

    getHighestBid = async () => {
        let highest = await getHighestBid(this.props.item.AuktionID);
        this.setState({
            highestBid: highest
        })

    }

    state = AuctionDetailsBet.initialState();

    bidValid = () => {
        const { error } = this.state;
        const { amount } = this.state;
        if (error.amount.length > 0 || amount < this.getHighestBid()) return false;

        return true;

    }

    handleChange = (e) => {
        let name = e.target.name;
        this.setState({
            [e.target.name]: Math.ceil(e.target.value)
        }, () => {
            let highest = this.state.highestBid;
            let error = this.state.error;
            const { amount } = this.state;

            switch (name) {
                case "amount":
                    if (amount < this.props.item.Utropspris) {
                        error.amount = "Budet måste vara högre än utropspriset"
                    }
                    else if (amount <= highest) {
                        error.amount = "Budet måste vara högre än tidigare bud"
                    }

                    else {
                        error.amount = "";
                    }
                    break;
                default:
                    break;
            };
            this.setState(prevState => ({
                ...prevState,
                error: error,
            }));
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.bidValid()) {
            this.setState({
                disabled: true
            }, () => {
                controlIfHighestBid(this.props.item.AuktionID, this.state.amount, (valid) => {
                    if (valid) {
                        controlIfAuctionIsValid(this.props.item.AuktionID, (active) => {
                            if (active) {
                                this.props.dispatch(placeBet(this.props.item.AuktionID, this.state.amount));
                                this.setState(AuctionDetailsBet.initialState());
                            }
                            else {
                                this.setState(prevState => ({
                                    ...prevState,
                                    error: { amount: "Auktionen har gått ut" },
                                    disabled: false,
                                }))
                            }
                        })
                    }
                    else {
                        this.setState(prevState => ({
                            ...prevState,
                            error: { amount: "Auktionen har fått in ett högre bud" },
                            disabled: false
                        }))
                    }
                })
            })

        }
    }

    getBid = () => {
        return this.props.bids.length ? (
            this.props.bids.sort((a, b) => {
                if (a.Summa === b.Summa) return 0;
                return a.Summa < b.Summa ? 1 : -1;
            }).map(((k, i) => {
                return (
                    <li key={k.BudID || i} style={i == 0 ? first : null} className="list-group-item">{k.Budgivare} {k.Summa} kr</li>
                );
            }))
        ) : (<span>Finns inga bud</span>);
    }

    render() {
        const { error, disabled } = this.state;
        const { SlutDatum } = this.props.item;

        let date3 = getRemainingTime(this.props.item.SlutDatum);
        const user = sessionStorage.getItem("user");

        let valid = this.props.item.SlutDatum > moment().format();
        this.getHighestBid();

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 text-left">
                                <p>Utropspris: {this.props.item.Utropspris}kr</p>
                            </div>
                            <div className="col-6 text-right">
                                {valid ? <p>Slutar {date3} | {formatDate(SlutDatum)}</p> : <p className="errorMessage">Avslutad</p>}
                            </div>
                        </div>
                        {user !== null && valid ?
                            <form className="row" onSubmit={this.handleSubmit}>
                                <div className="input-group mt-2 col-12">
                                    <input onChange={this.handleChange} value={this.state.amount} max="1000000" min="0" name="amount" type="number" placeholder="Lägg bud"
                                        className={error.amount.length > 0 ? "form-control error" : "form-control"} required
                                    />
                                    {!disabled ?
                                        (<button className="btn btn-sm btn-primary ml-2" disabled={disabled}
                                        >Lägg bud</button>) :
                                        (
                                            <button className="btn btn-sm btn-primary ml-2" disabled={disabled}>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span class="sr-only">Loading...</span>
                                            </button>)
                                    }

                                    <div className="col-12 mt-1" style={{ paddingLeft: "0" }}>
                                        {(error.amount.length > 0 || error.max) && (<span className="errorMessage">{error.amount || error.max}</span>)}
                                    </div>
                                </div>

                            </form>

                            : null}
                    </div>
                    {valid ? <div className="card-body">
                        <h6>Budgivare</h6>
                        <ul className="list-group">
                            {this.getBid()}
                        </ul>
                    </div> : <div className="card-body">
                            <h6>Avslutande bud</h6>
                            {this.props.bids.length > 0 ? <p>{this.state.highestBid} kr</p> : <p>Auktionen avslutades utan bud</p>}

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