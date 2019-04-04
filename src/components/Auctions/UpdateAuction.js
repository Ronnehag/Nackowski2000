import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateAuction, fetchSingleAuction } from '../../store/actions/auctionAction';

class UpdateAuction extends Component {

    state = {
        AuktionID: 0,
        Titel: "",
        Beskrivning: "",
        StartDatum: "",
        SlutDatum: "",
        Gruppkod: 2000,
        Utropspris: 0,
        Bud: [],
        error: {
            Titel: "",
            Beskrivning: ""
        }
    };

    validateInput = (name) => {
        switch (name) {
            case "Titel":
                if (this.state.Titel.length < 5) {
                    this.setState(prevState => ({
                        error: { ...prevState.error, Title: "Test" }
                    }));
                } else {
                    this.setState(prevState => ({
                        error: { ...prevState.error, Title: "" }
                    }));
                }

                break;
            case "Beskrivning":

                break;
            default:
                return null;
        }
    }

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.validateInput(name));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //TODO: Validering så man inte kan submitta en tom form
        this.props.dispatch(updateAuction(this.state))
        this.props.history.push({ pathname: "/" });

    }

    componentDidMount() {
        const { match } = this.props;
        this.props.dispatch(fetchSingleAuction(match.params.id));
        if (this.props.auction) {
            this.setState({
                AuktionID: parseInt(this.props.auction.AuktionID),
                Titel: this.props.auction.Titel,
                Beskrivning: this.props.auction.Beskrivning,
                StartDatum: this.props.auction.StartDatum,
                SlutDatum: this.props.auction.SlutDatum,
                SkapadAv: sessionStorage.getItem("user"),
                Utropspris: parseInt(this.props.auction.Utropspris),
                Bud: this.props.auction.Bud
            });
        }

    }

    render() {

        if (this.props.auction) {
            const { Titel, Beskrivning, SlutDatum, StartDatum, Utropspris } = this.props.auction;
            console.log(this.state);
            return (
                <div className="createAuctionContainer">
                    <div className="col-12 col-sm-12 col-md-8 offset-md-2 offset-lg-2 col-lg-8 createAuctionForm">
                        <h1 className="text-center">Uppdatera auktion</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="titel">Titel</label>
                                <input type="text" onChange={this.handleChange} name="Titel" defaultValue={Titel} id="Titel" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="beskrivning">Beskrivning</label>
                                <textarea onChange={this.handleChange} className="form-control" name="Beskrivning" defaultValue={Beskrivning} id={this.props.auction.Beskrivning} rows="5" required ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="slutdatum" className="col-form-label">Slutdatum</label>
                                <input onChange={this.handleChange} className="form-control" defaultValue={SlutDatum} name="SlutDatum" id={this.props.auction.SlutDatum} type="datetime-local" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="utropspris">Utropspris</label>
                                <input type="number" onChange={this.handleChange} defaultValue={Utropspris} name="Utropspris" id={this.props.auction.Utropspris} className="form-control" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn-sm btn-custom">Uppdatera</button>
                            </div>
                        </form>
                        <br />
                        {this.state.error.Title ? this.state.error.Title : null}
                    </div>
                </div>
            )
        } else {
            return <span>Loading...</span>
        }

    }
}
const mapStateToProps = (state) => {
    return {
        auction: state.auctions.auction
    }
}
export default connect(mapStateToProps)(UpdateAuction);