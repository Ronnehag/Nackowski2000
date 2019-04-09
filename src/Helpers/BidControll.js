import moment from 'moment';


// Hämtar bud för auktionen med passat ID, returnar en callback som är true/false beroende på
// om auktionen har fått ett bud.
export const controlIfBids = (AuktionID, callback) => {
    let url = `http://nackowskis.azurewebsites.net/api/bud/2000/${AuktionID}`;
    fetch(url)
        .then(res => res.json()
            .then(data => {
                callback(data.length === 0);
            }));
}

export const controlIfHighestBid = (AuktionID, bid, callback) => {
    let url = `http://nackowskis.azurewebsites.net/api/bud/2000/${AuktionID}`;
    fetch(url)
        .then(res => res.json()
            .then(bids => {
                const valid = bids.every(b => b.Summa < bid);
                callback(valid);
            }))
}

export const controlIfAuctionIsValid = (AuktionID, callback) => {
    let url = `http://nackowskis.azurewebsites.net/api/Auktion/2000/${AuktionID}`;
    fetch(url)
        .then(res => res.json()
            .then(auction => {
                const active = auction.SlutDatum > moment().format()
                callback(active);
            }));
}

export const getHighestBid = async (AuktionID) => {
    let url = `http://nackowskis.azurewebsites.net/api/bud/2000/${AuktionID}`;
    const res = await fetch(url);
    const bids = await res.json();
    if (bids.length > 0) {
        return Math.max.apply(Math, bids.map(b => b.Summa))
    }
}