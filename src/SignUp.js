import React, {useState} from 'react';
import {Container, Form, Grid, Message, Segment} from "semantic-ui-react";
import api, {setClientToken} from './axios';
const SignUp = () => {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        username: '',
        password: ''
    })
    const [success, setSuccess] = useState(false)
    const handleSubmit = () => {
        api.post('/auth/register', {
            email: user.email,
            password: user.password,
            full_name: user.fullName,
            username: user.username,
            type: "public",
            accepted_terms: "true"
        }).then((res) => {
            if (res.status === 201) {
                setClientToken(res.data.auth_token)
                setSuccess(true)
            } else {
                console.log("Unable to SignUp")
            }
        }).catch(() => {
            console.log("Server Error")
        })
    }
    return (
        <Container>
            <Segment basic>
                <h1>Sign Up</h1>
            </Segment>
            <Grid padded className='form-container'>
                <Grid.Column>
                    <Form size='large' onSubmit={handleSubmit} success={success}>
                        <Message
                            success
                            header='Registration Success. Please Login.'
                        />
                        <Form.Input fluid placeholder='Full Name' name='fullName'
                                    value={user.fullName}
                                    onChange={(e, {value}) => setUser({...user,fullName: value})}
                        />
                        <Form.Input placeholder='Email' name='email'
                                    value={user.email}
                                    onChange={(e, {value}) => setUser({...user,email: value})}
                        />
                        <Form.Input fluid placeholder='Username' name='username'
                                    value={user.username}
                                    onChange={(e, {value}) => setUser({...user, username: value})}
                        />
                        <Form.Input placeholder='Password' type='password' name='password'
                                    value={user.password}
                                    onChange={(e, {value}) => setUser({...user, password: value})}
                        />
                        <Form.Button fluid size='large' color='violet'>Register</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    )
}
export default SignUp
