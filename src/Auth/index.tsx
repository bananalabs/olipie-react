/* global gapi */

import * as React from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import { addAccount } from './actions';

export interface Props {
    dispatch: (action: any) => void;
    history: any;
}

export class Auth extends React.Component<Props, {}> {

    componentDidMount() {
        gapi.signin2.render('g-signin2', {
          'scope': 'https://www.googleapis.com/auth/plus.login',
          'onsuccess': this.onSignIn
        });  
      }

    onSignIn = (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        localStorage.setItem('olipie-token', id_token);
        // Get/Create account
        this.props.dispatch(addAccount({
            name: profile.getName(),
            email: profile.getEmail(),
            history: this.props.history
        }));
    }
    
    render() {
        return (
            <div className="auth-container">
                <h2 className="auth-title">Sign in with Google</h2>
                <div 
                    id="g-signin2"
                    style={{marginLeft: '46%'}}
                    data-onsuccess={this.onSignIn}
                />
            </div>
        );
    }
}

export default connect()(Auth);