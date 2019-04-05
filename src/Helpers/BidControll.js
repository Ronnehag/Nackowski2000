

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