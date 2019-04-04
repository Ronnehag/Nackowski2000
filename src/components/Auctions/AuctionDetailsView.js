import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAuction } from '../../store/actions/auctionAction';
import { formatDate } from '../../Helpers/DateFunctions';

class AuctionDetailsView extends React.Component {
    handleClick = () => {
        const id = this.props.item.AuktionID;
        this.props.dispatch(deleteAuction(id));
        this.props.history.push({ pathname: "/" });
    }

    validateUser = () => {

    }
    render() {
        const user = sessionStorage.getItem("user");

        return (
            <div>
                <h2>Produkt</h2>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                    {console.log(this.props.item)}
                                <div className="text-left">{this.props.item.Titel}</div>
                            </div>
                            <div className="col-6">
                                <div className="text-right">Startade {formatDate(this.props.item.StartDatum)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {this.props.item.Beskrivning}
                    </div>
                    <div className="card-footer">
                    {user === this.props.item.SkapadAv ?  <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary btn-md" onClick={this.handleClick}>Ta bort</button>
                            <Link to={`/Update/${this.props.item.AuktionID}`}>
                                <button type="button" className="btn btn-primary btn-md">Uppdatera</button>
                            </Link>
                        </div> : <p></p> 
                        
                     }
                    
                    </div>
                </div>
            </div>
        )
    }
   
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(AuctionDetailsView);