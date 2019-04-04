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
            Beskrivning: "",
            Utropspris: ""
        }
    };

    validateInput = (name) => {
        const { Titel, Beskrivning, Utropspris } = this.state;
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

            case "Utropspris":
                {
                    if (Utropspris == 0) {
                        this.setState(prevState => ({
                            error: { ...prevState.error, [name]: `${name} får inte vara 0 kr` }
                        }));
                    } else {
                        this.setState(prevState => ({
                            error: { ...prevState.error, [name]: "" }
                        }));
                    }
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
        for (const key in this.state) {
            this.validateInput(key);
        }
        if (error.Titel || error.Beskrivning || error.Utropspris) return;
        this.props.dispatch(updateAuction(this.state))
        this.props.history.push({ pathname: "/" });
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
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-8 offset-md-2 offset-lg-2 col-lg-8 createAuctionForm">
                        <h1 className="text-center">Uppdatera auktion</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="titel">Titel</label>
                                <input type="text" onChange={this.handleChange} style={error.Titel ? inputError : null} name="Titel" defaultValue={Titel} id="Titel" className="form-control" required autoComplete="off" />
                                {error.Titel && (<small>{error.Titel}</small>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="beskrivning">Beskrivning</label>
                                <textarea onChange={this.handleChange} style={error.Beskrivning ? inputError : null} className="form-control" name="Beskrivning" defaultValue={Beskrivning} id={this.props.auction.Beskrivning} rows="5" required ></textarea>
                                {error.Beskrivning && (<small>{error.Beskrivning}</small>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="utropspris">Utropspris</label>
                                <input type="number" style={error.Utropspris ? inputError : null} onChange={this.handleChange} defaultValue={Utropspris} name="Utropspris" id={this.props.auction.Utropspris} className="form-control" />
                                {error.Utropspris ? (<small>{error.Utropspris}</small>) : null}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn-sm btn-custom">Uppdatera</button>
                            </div>
                        </form>
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