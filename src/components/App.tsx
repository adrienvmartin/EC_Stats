import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { fetchStats } from '../actions';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CsvObject } from '../parser';

interface AppProps {
  fetchStats: Function;
}

interface AppState {
  stats?: CsvObject[];
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        {/* HEADER SECTION */}
        {/******************/}
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col md={8}>
            <h1>Environment Canada CSV File Parser</h1>
          </Col>
          <Col></Col>
        </Row>
        <br />
        {/* CSV SELECTION */}
        {/*******************/}
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col>
            <Card>
              <Card.Body>
                <form>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      this.props.fetchStats(e);
                      console.log('this.state: ', this.state);
                    }}
                  >
                    DROP HERE
                  </div>
                </form>
              </Card.Body>
            </Card>
            <Card>
              <div>
                {this.state.stats ? 'State was found!' : 'State was NOT found!'}
              </div>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <br />
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState): { stats: CsvObject[] } => {
  return { stats: state.stats };
};

export const App = connect(mapStateToProps, { fetchStats })(_App);
