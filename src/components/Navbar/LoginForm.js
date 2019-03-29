import React, { Component } from 'react'

export class LoginForm extends Component {
    render() {
        return (
            <div>
                <form className="form-inline" action="/action_page.php">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">@</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Användarnamn" />
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn btn-primary ml-2">Logga in</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm
