import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAuction } from '../../store/actions/auctionAction';
import moment from 'moment';

class CreateNewAuction extends Component {

    state = {
        Titel: "",
        Beskrivning: "",
        StartDatum: "",
        SlutDatum: "",
        Gruppkod: 2000,
        Utropspris: 0,
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Validering så man inte kan submitta en tom form

        this.setState({
            Utropspris: parseInt(this.state.Utropspris),
            StartDatum: moment().format("YYYY-MM-DDTHH:mm:ss"),
            SkapadAv: sessionStorage.getItem("user")
        }, () => {
            this.props.dispatch(createAuction(this.state))
            this.props.history.push({ pathname: "/" });
        });



    }

    componentDidMount() {
        const date = moment().format("YYYY-MM-DDTHH:mm:ss")
        this.setState({ SlutDatum: date });
    }

    render() {


        return (
            <div className="createAuctionContainer">
                <div className="col-6 createAuctionForm">
                    <h1>Skapa ny auktion</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titel">Titel</label>
                            <input type="text" onChange={this.handleChange} name="Titel" id="titel" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="beskrivning">Beskrivning</label>
                            <textarea onChange={this.handleChange} className="form-control" name="Beskrivning" id="beskrivning" rows="5"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="slutdatum" className="col-2 col-form-label">Slutdatum</label>
                            <input onChange={this.handleChange} className="form-control" name="SlutDatum" id="slutdatum" type="datetime-local" value={this.state.SlutDatum} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="utropspris">Utropspris</label>
                            <input type="number" onChange={this.handleChange} name="Utropspris" id="utropspris" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Spara</button>
                    </form>
                </div>
            </div>);
    }
}

export default connect()(CreateNewAuction)
