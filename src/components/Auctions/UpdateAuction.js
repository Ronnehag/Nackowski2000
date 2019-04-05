import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAuction, fetchSingleAuction } from '../../store/actions/auctionAction';
import { controlIfBids } from '../../Helpers/BidControll';

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
            Beskrivning: "",
            HarBud: ""
        }
    };

    validateInput = (name) => {
        const { Titel, Beskrivning } = this.state;
        switch (name) {
            case "Titel":
                if (Titel.length < 5) {
                    this.setState(prevState => ({
                        error: { ...prevState.error, [name]: `${name} måste vara längre än 5 bokstäver` }
                    }));
                }
                else if (Titel.length > 50) {
                    this.setState(prevState => ({
                        error: { ...prevState.error, [name]: `${name} får inte överstiga 50 bokstäver` }
                    }));
                } else {
                    this.setState(prevState => ({
                        error: { ...prevState.error, [name]: "" }
                    }));
                }
                break;
            case "Beskrivning":
                if (Beskrivning.length < 5) {
                    this.setState(prevState => ({
                        error: { ...prevState.error, [name]: `${name} måste vara längre än 5 bokstäver` }
                    }));
                } else {
                    this.setState(prevState => ({
                        error: { ...prevState.error, [name]: "" }
                    }));
                }
                break;
            default:
                return null;
        }
    }

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        }, () => this.validateInput(name));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { error } = this.state;
        if (error.Titel || error.Beskrivning || error.Utropspris) return;
        controlIfBids(this.state.AuktionID, (bool) => {
            if (bool) {
                this.props.dispatch(updateAuction(this.state))
                this.props.history.push({ pathname: "/" });
            } else {
                this.setState(prevState => ({
                    error: { ...prevState.error, HarBud: "Auktionen har fått ett bud och kan inte längre uppdateras." }
                }));
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.auction !== prevProps.auction) {
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

    componentDidMount() {
        const { match } = this.props;
        this.props.dispatch(fetchSingleAuction(match.params.id));


    }

    render() {
        if (this.props.auction) {
            const { Titel, Beskrivning, Utropspris } = this.props.auction;
            const { error } = this.state;
            return (
                <div className="row createAuctionContainer">
                    <div className="col-12 col-sm-12 col-md-8 offset-md-2 offset-lg-2 col-lg-8 createAuctionForm">
                        <h2 className="text-center mt-3">Uppdatera auktion</h2>
                        <div className="row">
                            <div className="col-md-10 col-lg-10 offset-md-1 offset-lg-1">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-8 col-lg-8 from-group mt-1">
                                            <label htmlFor="Titel">Titel</label>
                                            <input type="text" onChange={this.handleChange} style={error.Titel ? inputError : null} name="Titel" defaultValue={Titel} id="Titel" className="form-control" required autoComplete="off" />
                                            {error.Titel && (<small>{error.Titel}</small>)}
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 form-group mt-1">
                                            <label htmlFor="Utropspris">Utropspris</label>
                                            <input type="number" onChange={this.handleChange} defaultValue={Utropspris} name="Utropspris" id="Utropspris" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1">
                                            <label htmlFor="beskrivning">Beskrivning</label>
                                            <textarea onChange={this.handleChange} style={error.Beskrivning ? inputError : null} className="form-control" name="Beskrivning" defaultValue={Beskrivning} id={this.props.auction.Beskrivning} rows="10" required ></textarea>
                                            {error.Beskrivning && (<small>{error.Beskrivning}</small>)}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn-sm btn-custom">Uppdatera</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            {error.HarBud && (<small>{error.HarBud}</small>)}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <span>Laddar auktionen...</span>
        }

    }
}

const inputError = {
    border: "2px solid red"
}



const mapStateToProps = (state) => {
    return {
        auction: state.auctions.auction
    }
}
export default connect(mapStateToProps)(UpdateAuction);