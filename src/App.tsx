import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CsvObject } from './parser';
import { parse, ParseResult } from 'papaparse';
import { Calculator } from './analyzers/Calculator';

interface AppState {
  year?: CsvObject[];
  loaded: boolean;
  stats?: any;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    loaded: false,
    stats: [],
    year: [],
  };

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
        this.setState({ year: result.data, loaded: true });
        console.log('this.state.year: ', this.state.year);
      });
  };

  generateStats = (e: React.MouseEvent): void => {
    e.preventDefault();
    const calc = new Calculator();
    if (this.state.year !== undefined) {
      const Jan = this.state.year.filter((d) => d.Month === '01');
      const warmest = calc.warmest(Jan, 'MaxTemp(°C)');
      console.log('warmest: ', warmest);
      this.setState({ stats: warmest }, () => {
        console.log('this.state: ', this.state);
      });
    }
  };

  clearCsv = (): void => {
    this.setState({
      loaded: false,
      year: undefined,
      stats: undefined,
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
                    Drop CSV File Here
                  </div>
                </form>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <div>
                {this.state.loaded
                  ? 'Click below to generate'
                  : 'Please load CSV file'}
              </div>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <button onClick={(e) => this.generateStats(e)}>
                  Generate Stats
                </button>
                {'   '}
                <button onClick={this.clearCsv}>Clear CSV</button>
              </Card.Body>
            </Card>
            <br />
            <br />
            <Card>
              <Card.Body>
                {this.state.stats ? (
                  <div>
                    The warmest high in January was {this.state.stats}°C
                  </div>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <br />
      </Container>
    );
  }
}
