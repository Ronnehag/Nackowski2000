// Kommer hålla i länkar som syns vid inloggning

import React from 'react'

export default function SignedInLinks() {
    return (
        <div>
            <li className="nav-item">
                <Link className="nav-link" to="/newauction">Skapa auktion</Link>
            </li>
        </div>
    )
}
