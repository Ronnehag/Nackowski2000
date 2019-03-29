import React, {Component} from 'react';

export default class CreateNewAuction extends Component{

    state = {        
        Titel: "",
        Beskrivning: "",
        StartDatum: "",
        SlutDatum: "",
        Gruppkod: 2000,
        Utropspris: null,
        SkapadAv: ""
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })

        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({StartDatum: this.getCurrentDate()},     
        )
    }

    getCurrentDate = () => {
        return new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
    }

    render()
    {
        
        
        return(<div>
            <h1>Skapa ny auktion</h1>
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="titel">Titel</label>
                    <input type="text" onChange={this.handleChange} name="Titel" id="titel" class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="beskrivning">Beskrivning</label>
                    <textarea onChange={this.handleChange} class="form-control" name="Beskrivning" id="beskrivning" rows="5"></textarea>
                </div>            
                <div class="form-group row">
                    <label for="slutdatum" class="col-2 col-form-label">Slutdatum</label>
                    <div class="col-10">
                        <input onChange={this.handleChange} class="form-control" name="SlutDatum" id="slutdatum" type="datetime-local" value={this.getCurrentDate()}/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="utropspris">Utropspris</label>
                    <input type="text" onChange={this.handleChange} name="Utropspris" id="utropspris" class="form-control"/>
                </div>
                <button type="submit" class="btn btn-primary">Spara</button>
            </form>
        </div>);
    }
}
