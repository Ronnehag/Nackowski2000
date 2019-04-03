import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateAuction, fetchSingleAuction } from '../../store/actions/auctionAction';

class UpdateAuction extends React.Component {
    state = {
        Titel: "",
        Beskrivning: "",
        StartDatum: "",
        SlutDatum: "",
        Gruppkod: 2000,
        Utropspris: 0,
    };
    handleChange = (event) => {
        console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Validering så man inte kan submitta en tom form
        this.setState({
        }, () => {
            this.props.dispatch(updateAuction(this.state))
            this.props.history.push({ pathname: "/" });
        });
    }

    componentDidMount() {
        const { match } = this.props;
        console.log(match.params.id);
            this.props.dispatch(fetchSingleAuction(match.params.id));
            this.setState = ({
                Titel: this.props.auction.Titel,
                Beskrivning: this.props.auction.Beskrivning,
                StartDatum: this.props.auction.StartDatum,
                SlutDatum: this.props.auction.SlutDatum,
                Gruppkod: 2000,
                Utropspris: this.props.auction.Utropspris,
                
            });
        
        // ??? error

    }

    render() {
        console.log(this.props.auction)
        console.log('hello');
        console.log(this.state)
        return (
            <div className="createAuctionContainer">
                <div className="col-12 col-sm-12 col-md-8 offset-md-2 offset-lg-2 col-lg-8 createAuctionForm">
                    <h1 className="text-center">Skapa ny auktion</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titel">Titel</label>
                            <input type="text" onChange={this.handleChange} name="Titel" defaultValue={this.state.Titel} id="Titel" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="beskrivning">Beskrivning</label>
                            <textarea onChange={this.handleChange} className="form-control" name="Beskrivning" value={this.props.auction.Beskrivning} id={this.props.auction.Beskrivning} rows="5" required ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="slutdatum" className="col-form-label">Slutdatum</label>
                            <input onChange={this.handleChange} className="form-control" value={this.props.auction.SlutDatum} name="SlutDatum" id={this.props.auction.SlutDatum}type="datetime-local" value={this.props.auction.SlutDatum} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="utropspris">Utropspris</label>
                            <input type="number" onChange={this.handleChange} value={this.props.auction.Utropspris} name="Utropspris" id={this.props.auction.Utropspris} className="form-control" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn-sm btn-custom">Uppdatera</button>
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
export default connect(mapStateToProps)(UpdateAuction);