import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { fetchStats } from '../actions';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CsvObject } from '../parser';
import { parse, ParseResult } from 'papaparse';

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

  createStatsArray = (e: React.DragEvent<HTMLDivElement>) => {
    Array.from(e.dataTransfer.files)
      .filter((file) => file.type === 'text/csv')
      .forEach(async (file) => {
        const text = await file.text();
        const result: ParseResult<CsvObject> = await parse(text, {
          header: true,
          skipEmptyLines: false,
          transformHeader: (h) => {
            let regex = /\s/g;
            return h.replace(regex, '');
          },
          complete: (results) => {
            console.log('Parsing complete: \n', results);
          },
        });
        this.setState({ stats: result.data });
        console.log('this.state: ', this.state);
      });
  };

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
                      this.createStatsArray(e);
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
