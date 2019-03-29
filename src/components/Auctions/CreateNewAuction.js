import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAuction } from '../../store/actions/auctionAction';

class CreateNewAuction extends Component {

    state = {
        Titel: "",
        Beskrivning: "",
        StartDatum: "",
        SlutDatum: "",
        Gruppkod: 2000,
        Utropspris: null,
        SkapadAv: "TestAnvändare"
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ StartDatum: this.getCurrentDate() },
            () => this.props.dispatch(createAuction(this.state))
        )
    }

    getCurrentDate = () => {
        return new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
    }

    componentDidMount()
    {
        this.setState({SlutDatum: this.getCurrentDate()});
    }

    render() {
                
        return (<div className="col-6">
            <h1>Skapa ny auktion</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label for="titel">Titel</label>
                    <input type="text" onChange={this.handleChange} name="Titel" id="titel" className="form-control" />
                </div>
                <div className="form-group">
                    <label for="beskrivning">Beskrivning</label>
                    <textarea onChange={this.handleChange} className="form-control" name="Beskrivning" id="beskrivning" rows="5"></textarea>
                </div>
                <div className="form-group row">
                    <label for="slutdatum" className="col-2 col-form-label">Slutdatum</label>
                    <div className="col-10">
                        <input onChange={this.handleChange} className="form-control" name="SlutDatum" id="slutdatum" type="datetime-local" value={this.state.SlutDatum} />
                    </div>
                </div>
                <div className="form-group">
                    <label for="utropspris">Utropspris</label>
                    <input type="text" onChange={this.handleChange} name="Utropspris" id="utropspris" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Spara</button>
            </form>
        </div>);
    }
}

export default connect()(CreateNewAuction)
