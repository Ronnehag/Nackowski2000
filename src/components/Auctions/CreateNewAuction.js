import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAuction } from '../../store/actions/auctionAction';
import moment from 'moment';

const formValid = errors => {
    let valid = true;

    Object.values(errors).forEach(val => {
        val.length > 0 && (valid = false)
    })
    return valid;
}

class CreateNewAuction extends Component {

    state = {
        Titel: "",
        Beskrivning: "",
        StartDatum: "",
        SlutDatum: "",
        Gruppkod: 2000,
        Utropspris: 0,
        errors: {
            Titel: "",
            Beskrivning: "",
            SlutDatum: ""
        }
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
        let errors = this.state.errors;

        switch(event.target.name)
        {
            case "Titel":
                errors.Titel = event.target.value.length < 0 && event.target.value.length > 5 ? "" : "Titel är obligatoriskt måste innehålla minst 5 tecken"
                errors.Titel = event.target.value.length < 50 ? "" : "Titeln får vara max 50 tecken lång"
                break;
            case "Beskrivning":
                errors.Beskrivning = event.target.value.length < 0 && event.target.value.length > 5 ? "" : "Beskrivning är obligatoriskt och måste innehålla minst 5 tecken"
                break;
            default:
                break;
        };

        this.setState({errors, [event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Validering så man inte kan submitta en tom form

        if(formValid(this.state.errors))
        {
            this.setState({
                Utropspris: parseInt(this.state.Utropspris),
                StartDatum: moment().format("YYYY-MM-DDTHH:mm:ss"),
                // SlutDatum: moment(this.state.StartDatum, "YYYY-MM-DDTHH:mm:ss").add(10, 'days'),
                SkapadAv: sessionStorage.getItem("user")
            }, () => {
                this.props.dispatch(createAuction(this.state))
                this.props.history.push({ pathname: "/" });
            });
        }
        else{
            //EJ korrekt ifyllt formulär
        }

        

    }

    componentDidMount() {
        const date = moment().format("YYYY-MM-DDTHH:mm:ss")
        this.setState({ SlutDatum: moment(date, "YYYY-MM-DDTHH:mm:ss").add(10, 'days') });
    }

    render() {

        const endDate = moment(this.state.SlutDatum).format("YYYY-MM-DD");
        const endTime = moment(this.state.SlutDatum).format("HH:mm");
        
        return (
            <div className="createAuctionContainer">
                <div className="col-12 col-sm-12 col-md-8 offset-md-2 offset-lg-2 col-lg-8 createAuctionForm">
                    <h1 className="text-center">Skapa ny auktion</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titel">Titel</label>
                            <input type="text" onChange={this.handleChange} name="Titel" id="titel" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="beskrivning">Beskrivning</label>
                            <textarea onChange={this.handleChange} className="form-control" name="Beskrivning" id="beskrivning" rows="5" required ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="utropspris">Utropspris</label>
                            <input type="number" onChange={this.handleChange} name="Utropspris" id="utropspris" className="form-control" />
                        </div>
                        <div>
                            <h6>Din auktion kommer att avslutas den {endDate} kl {endTime}</h6>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn-sm btn-custom">Skapa</button>
                        </div>                        
                    </form>
                </div>
            </div>);
    }
}

export default connect()(CreateNewAuction)
