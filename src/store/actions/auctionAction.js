export const FETCH_ALL_AUCTIONS = "FETCH_ALL_AUCTIONS";


export function fetchAuctions() {
    console.log("fetch action called!")
    return async dispatch => {
        try {
            const res = await fetch("http://nackowskis.azurewebsites.net/api/Auktion/2000");
            const json = await res.json();
            dispatch({ type: FETCH_ALL_AUCTIONS, payload: json });

        } catch (err) {
            console.log(err);
        }
    }
}