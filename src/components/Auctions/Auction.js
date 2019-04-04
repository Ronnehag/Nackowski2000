import React from 'react';
import { Link } from 'react-router-dom';
import { getRemainingTime } from '../../Helpers/DateFunctions';
import { red } from 'ansi-colors';
export default class Auction extends React.Component {

    formatPrice = () => {
        let price = this.props.item.Utropspris;
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    countBids = () => {
        return this.props.item.Bud.length ?
            (<span>{this.props.item.Bud.length} bud</span>)
            : <span>Inga bud</span>
    }

    render() {
        let timeLeft = getRemainingTime(this.props.item.SlutDatum);

        let rand = (Math.floor(Math.random() * 50) + 1);
        return (
            <div className="col-lg-3 cardSizing non-link" id="auction-card">
                <Link to={`/Auctions/${this.props.item.AuktionID}`}>
                    <div className="card">
                        <img className="card-img-top" src={`https://picsum.photos/200/200/?image=${rand}`} alt="auktionsbild" />
                        <div className="card-body">
                            <h6 className="card-title">{this.props.item.Titel} </h6>
                            <p className="card-text non-link">{this.props.item.Beskrivning.substr(0, 15) + "..."}</p>
                            <div className="row non-link">
                                <div className="col-6 text-left">
                                    <p id="price"><strong>{this.formatPrice()} kr</strong> {this.countBids()}</p>
                                </div>
                                <div className="col-6 text-right">
                                    <p id="date-tag" style={timeLeft.includes("minuter") ? closing : null}>{timeLeft}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

const closing = {
    color: "red"
}