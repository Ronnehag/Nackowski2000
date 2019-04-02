export const FETCH_ALL_AUCTIONS = "FETCH_ALL_AUCTIONS";
export const CREATE_NEW_AUCTION = "CREATE_NEW_AUCTION";
export const FILTERED_AUCTIONS = "FILTERED_AUCTIONS"

const auctionURL = "http://nackowskis.azurewebsites.net/api/Auktion/2000";

export function fetchAuctions() {
    return async dispatch => {
        try {
            const res = await fetch(auctionURL);
            const json = await res.json();
            dispatch({ type: FETCH_ALL_AUCTIONS, payload: json });

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

export function searchAuction(searchValue)
{
    return async dispatch => {
        try {
            const res = await fetch(auctionURL);
            const json = await res.json();
            const filteredJson = json.filter(function(auction){
                return auction.includes(searchValue)
            })
            dispatch({ type: FILTERED_AUCTIONS, payload: filteredJson });

        } catch (err) {
            console.log(err);
        }
    }

}