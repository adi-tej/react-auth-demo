import React, {useState} from 'react';
import {Button, Container, Form, Grid, Message, Segment} from "semantic-ui-react";
import api, {setClientToken} from "./axios";
import {useHistory} from 'react-router-dom';
const Login = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        username:'',
        password:''
    })
    const [success, setSuccess] = useState(false)
    const handleSubmit = () => {
        api.post('/auth', {
            username: user.username,
            password: user.password,
            type: "normal"
        }).then((res) => {
            if (res.status === 200) {
                setClientToken(res.data.auth_token)
                setTimeout(function () {
                    setSuccess(true)
                    history.push('/dashboard')
                }, 500);
            } else {
                console.log("Unable to SignUp")
            }
        }).catch(() => {
            console.log("Server Error")
        })
    }
    return(
        <Container>
            <Segment basic>
                <h1>Login</h1>
            </Segment>
            <Grid padded className='form-container'>
                <Grid.Column>
                    <Form size='large'
                          onSubmit={handleSubmit}
                          success={success}
                    >
                        <Message
                            success
                            header='Login Success'
                        />
                        <Form.Input fluid icon='user' iconPosition='left'
                                    placeholder='Username'
                                    value={user.username}
                                    onChange={(e, {value}) => setUser({...user,username: value})}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={user.password}
                            onChange={(e, {value}) => setUser({...user,password: value})}
                        />
                        <Button fluid size='large' color='violet'>
                            Login
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    )
}
export default Login
