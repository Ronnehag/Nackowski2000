import React from 'react';
import { Link } from 'react-router-dom';
import { getRemainingTime } from '../../Helpers/DateFunctions';
export default class Auction extends React.Component {

    formatPrice = () => {
        if (this.props.item) {
            let price = this.props.item.Utropspris;
            const { Bud } = this.props.item;
            let highest;
            if (Bud.length) {
                highest = this.getHighestBid(Bud);
            }
            if (highest > price) {
                return highest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }

    getHighestBid = (arr) => {
        return Math.max.apply(Math, arr.map(b => b.Summa));
    }

    countBids = () => {
        return this.props.item.Bud.length ?
            (<span>{this.props.item.Bud.length} bud</span>)
            : <span>0 bud</span>
    }

    render() {
        let timeLeft = getRemainingTime(this.props.item.SlutDatum);
        const { valid } = this.props;

        let rand = (Math.floor(Math.random() * 50) + 1);

        return (
            <div className="col-6 col-md-3 col-lg-3 cardSizing non-link" id="auction-card">
                <Link to={`/Auctions/${this.props.item.AuktionID}`}>
                    <div className="card">
                        <img className="card-img-top img-fluid" src={`https://picsum.photos/200/150/?image=${rand}`} alt="auktionsbild" />
                        <div className="card-body">
                            <h6 className="card-title">{this.props.item.Titel.substr(0, 15)} </h6>
                            <p className="card-text non-link">{this.props.item.Beskrivning.substr(0, 20) + "..."}</p>
                            <div className="row non-link mt-2">
                                <div className="col-12 col-md-6 col-lg-6 text-left">
                                    <p id="price"><strong>{this.formatPrice()} kr</strong> {this.countBids()}</p>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 text-right">
                                    {valid ?
                                        (<p id="date-tag" style={timeLeft.includes("minuter") || timeLeft.includes("minut") || timeLeft.includes("sekunder") ? closing : null}>{timeLeft}</p>)
                                        :
                                        (<p id="date-tag" style={closing}>Avslutad</p>)
                                    }
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