import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import ConnectWithGoogle from './ConnectWithGoogle';

class LoginInWithGoogle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Menu vertical>
                <Menu.Item>
                    <ConnectWithGoogle />
                </Menu.Item>
            </Menu>
                );
    }
}

export default LoginInWithGoogle;
