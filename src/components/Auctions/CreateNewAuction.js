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
            användare:""    
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        let errors = this.state.errors;

        switch (event.target.name) {
            case "Titel":
                if (event.target.value.length > 50) {
                    errors.Titel = "Titeln får vara max 50 tecken lång"
                }

                else if (event.target.value.length < 5) {
                    errors.Titel = "Titel är obligatoriskt måste innehålla minst 5 tecken";
                }
                else {
                    errors.Titel = "";
                }
                break;
            case "Beskrivning":
                errors.Beskrivning = event.target.value.length > 5 ? "" : "Beskrivning är obligatoriskt och måste innehålla minst 5 tecken"
                break;
            default:
                break;
        };

        this.setState({ errors, [event.target.name]: event.target.value });
        console.log(this.state.errors);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const user = sessionStorage.getItem("user");
        if(user === null)
        {
             this.setState({errorUser :"Du måste vara inloggad för att skapa en auktion"})
        }
        else{
            if (formValid(this.state.errors)) {
                this.setState({
                    Utropspris: parseInt(this.state.Utropspris),
                    StartDatum: moment().format("YYYY-MM-DDTHH:mm:ss"),
                    SkapadAv: sessionStorage.getItem("user")
                }, () => {
                    this.props.dispatch(createAuction(this.state))
                    this.props.history.push({ pathname: "/" });
                });
            }           
            else {
                //EJ korrekt ifyllt formulär
            }
        }
       
      
    
    }

    componentDidMount() {
        const date = moment().format("YYYY-MM-DDTHH:mm:ss")
        this.setState({ SlutDatum: moment(date, "YYYY-MM-DDTHH:mm:ss").add(10, 'days') });
    }

    render() {
        const { errors } = this.state;
        let errorUser = this.state.errors.användare;

        return (

            <div className="row createAuctionContainer">
                <div className="col-12 col-sm-12 offset-lg-2 col-lg-8 createAuctionForm">
                    <h1 className="text-center">Skapa ny auktion</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-12 col-sm-12 offset-md-1 offset-lg-1 col-md-6 col-lg-6">
                                <label htmlFor="titel">Titel</label>
                                <input type="text" onChange={this.handleChange} name="Titel" id="titel" className={errors.Titel.length > 0 ? "form-control error" : "form-control"} required />
                                {errors.Titel.length > 0 && (<span className="errorMessage">{errors.Titel}</span>)}
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                <label htmlFor="utropspris">Utropspris</label>
                                <input type="number" onChange={this.handleChange} name="Utropspris" id="utropspris" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-12 col-sm-12 offset-md-1 offset-lg-1 col-md-10 col-lg-10">
                                <label htmlFor="beskrivning">Beskrivning</label>
                                <textarea onChange={this.handleChange} className={errors.Beskrivning.length > 0 ? "form-control error" : "form-control"} name="Beskrivning" id="beskrivning" rows="5" required ></textarea>
                                {errors.Beskrivning.length > 0 && (<span className="errorMessage">{errors.Beskrivning}</span>)}
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div id="endText text-center">
                                    <p>Din auktion kommer att vara giltig i 10 dagar fr.o.m. att den skapas.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-10 offset-md-1 offset-lg-1 col-lg-10">
                                <div className="form-group">
                                    <button type="submit" className="btn-sm btn-custom">Skapa</button>
                                    <span className="errorMessage">{this.state.errorUser}</span>

                                </div>
                            </div>
                            
                        </div>
                        
                    </form>
                    
                </div>
                
            </div>
        
         
            );
 
    }
}
const mapStateToProps = (state) => {
    return {
        auction: state.auctions.auction
    }
}
export default connect(mapStateToProps)(CreateNewAuction);
