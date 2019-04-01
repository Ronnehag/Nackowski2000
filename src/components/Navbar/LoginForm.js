import React, { Component } from 'react'

export class LoginForm extends Component {
    render() {
        return (
            <div>
                <form className="form-inline" action="/action_page.php">
                    <div className="input-group">
                        <input type="text" className="form-control-sm" placeholder="Användarnamn" />
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn-sm btn-custom ml-2">Logga in</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm
