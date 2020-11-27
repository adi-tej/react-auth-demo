import React from 'react';
import {
    Grid
} from 'semantic-ui-react';
import SignUp from "./SignUp";
import Login from "./Login";

function Home() {
    return (
        <div>
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <SignUp/>
                    </Grid.Column>
                    <Grid.Column>
                        <Login/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default Home;
