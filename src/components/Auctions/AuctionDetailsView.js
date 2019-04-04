import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAuction } from '../../store/actions/auctionAction';

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

        var date = new Date(this.props.item.StartDatum.replace('T', ' '));
        const dateOptions = {
            hour12: false,
            timeZone: "UTC",
            //year: "numeric",
            day: "numeric",
            month: "numeric",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit"
        }

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
                                <div className="text-right">{date.toLocaleString("sv-SE", dateOptions)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {this.props.item.Beskrivning}
                    </div>
                    <div className="card-footer">
                    {user !== null ?  <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary btn-md" onClick={this.handleClick}>Ta bort</button>
                            <Link to={`/Update/${this.props.item.AuktionID}`}>
                                <button type="button" className="btn btn-primary btn-md">Uppdatera</button>
                            </Link>
                        </div> : <p>blabla</p> 
                        
                    
                     }
                    
                 

                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(AuctionDetailsView);