import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { Section } from 'react-fullpage';

class Intro extends Component {
    render() {
        return (
            <Section color="#682666" verticalAlign="true">
                <div>
                    <Grid>
                        <Row>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <h1 class="intro-title">Capital One <br />Webapp Challenge</h1><br />
                                <p class="intro-name">Harshil Shah :)</p><br />
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <div>

                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </Section>
        );
    }
}

export default Intro