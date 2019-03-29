import React from 'react';
import AuctionList from '../Auctions/AuctionList';
export default class Home extends React.Component
{
    render()
    {
        return(
            <div>
                <AuctionList/>
            </div>
        );
    }
}