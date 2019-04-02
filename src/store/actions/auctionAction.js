export const FETCH_ALL_AUCTIONS = "FETCH_ALL_AUCTIONS";
export const CREATE_NEW_AUCTION = "CREATE_NEW_AUCTION";
export const DELETE_AUCTION = "DELETE_AUCTION";
export const FILTERED_AUCTIONS = "FILTERED_AUCTIONS"
export const FETCH_BETS = "FETCH_BETS";
export const PLACE_BET = "PLACE_BET";


const auctionURL = "http://nackowskis.azurewebsites.net/api/Auktion/2000/";
const bidURL = "http://nackowskis.azurewebsites.net/api/bud/2000/";

export function fetchAuctions() {
    return async dispatch => {
        try {
            const res = await fetch(auctionURL);
            const auctions = await res.json();
            auctions.forEach(async (obj) => {
                const res = await fetch(bidURL + obj["AuktionID"]);
                const bids = await res.json();
                if (bids.length) {
                    obj.Bud = bids;
                }
            },);
            dispatch({ type: FETCH_ALL_AUCTIONS, payload: auctions });
        } catch (err) {
            console.log(err);
        }
    }
}

export function createAuction(auction) {
    return async dispatch => {
        try {
            const res = await fetch(auctionURL, {
                method: 'POST',
                body: JSON.stringify(auction),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            dispatch({ type: CREATE_NEW_AUCTION, payload: json });
        } catch (err) {
            console.log(err);
        }
    }
}

export function deleteAuction(id) {
    console.log(id);
    return async dispatch => {
        try {
            const res = await fetch(auctionURL + id, {
                method: 'DELETE'
            });
            dispatch({ type: DELETE_AUCTION, AuktionID: id });
        }
        catch (err) {
            console.log(err);
        }

    }
}
export function searchAuction(searchValue) {
    return async dispatch => {

        dispatch({ type: FILTERED_AUCTIONS, payload: searchValue });

    }

}