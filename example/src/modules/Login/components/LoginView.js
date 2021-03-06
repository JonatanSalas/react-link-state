import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import TextField from 'material-ui/TextField/TextField';
import SendIcon from 'material-ui/svg-icons/content/send';

import createSubmitHandler from '../../../helpers/createSubmitHandler';

import LoginDialog from '../components/LoginDialog';

import LoginContainer from './styled/CenterContainer';
import RightContainer from './styled/RightContainer';
import LoginForm from './styled/Form';


class LoginView extends Component {
    static propTypes = {
        getState: PropTypes.func.isRequired,
        linkState: PropTypes.func.isRequired,
        getValue: PropTypes.func.isRequired,
        updateState: PropTypes.func.isRequired
    };

    render() {
        const { linkState, getValue, getState, updateState } = this.props;

        const handleClose = e => updateState({ 'openDialog': false });

        const emailLink = linkState('email');
        const passwordLink = linkState('password');

        return (
            <LoginContainer
                width='500px'
                height='600px'
                paddingTop='100px'
            >
                <LoginDialog
                    open={getValue('openDialog') || false}
                    email={getValue('email')}
                    password={getValue('password')}
                    onRequestClose={handleClose}
                />
                <Card containerStyle={{padding: '20px'}}>
                    <CardTitle
                        title='Login'
                        subtitle='Please, log in with your credentials'
                    />
                    <CardText>
                        <LoginForm onSubmit={createSubmitHandler({ getState, updateState })}>
                            <TextField
                                type='email'
                                name='username-input'
                                floatingLabelText='Email'
                                value={emailLink.value}
                                onChange={emailLink.onChange}
                                errorText={getValue('emailError')}
                                floatingLabelFixed
                                fullWidth
                            />
                            <TextField
                                type='password'
                                name='password-input'
                                floatingLabelText='Password'
                                value={passwordLink.value}
                                onChange={passwordLink.onChange}
                                errorText={getValue('passwordError')}
                                floatingLabelFixed
                                fullWidth
                            />
                            <RightContainer>
                                <RaisedButton
                                    icon={<SendIcon/>}
                                    labelPosition='before'
                                    type='submit'
                                    label='login'
                                    primary
                                />
                            </RightContainer>
                        </LoginForm>
                    </CardText>
                </Card>
            </LoginContainer>
        );
    }
}

export default LoginView;
