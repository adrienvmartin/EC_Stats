import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CsvObject } from './parser';
import { parse, ParseResult } from 'papaparse';
import { Calculator } from './analyzers/Calculator';
import { MonthSummary } from './datatypes';

interface AppState {
  year?: CsvObject[];
  loaded: boolean;
  highlighted: boolean;
  summary?: any;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    loaded: false,
    highlighted: false,
    summary: [],
    year: [],
  };

  componentDidMount() {
    console.clear();
  }

  componentWillUnmount() {
    console.clear();
    this.setState({});
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
        this.setState({ year: result.data, loaded: true });
        console.log('this.state.year: ', this.state.year);
      });
  };

  generateStats = (e: React.MouseEvent): void => {
    e.preventDefault();
    const calc = new Calculator();
    if (this.state.year !== undefined) {
      const summary = calc.monthlySummary(this.state.year);
      this.setState({ summary }, () => {
        console.log('this.state: ', this.state);
        this.renderStats();
      });
    }
  };

  clearCsv = (): void => {
    this.setState({
      loaded: false,
      year: undefined,
      summary: undefined,
    });
    console.clear();
  };

  renderStats = (): any => {
    console.log('stats rendered');
    return this.state.summary.map((s: MonthSummary) => {
      return (
        <Container>
          <Card>
            <div>
              <h1>{s.name}</h1>
            </div>
            <Col xs={3}>
              Average high: {s.avgHigh}
              <br />
              Mean temp: {s.mean}
              <br />
              Average low: {s.avgLow}
              <br />
            </Col>
            <Col md={7}>
              Precipitation (mm): {s.precipTotal}
              <br />
              Precipitation days: {s.precipDays}
            </Col>
          </Card>
          <br />
        </Container>
      );
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
          <Col md="auto">
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
                    {this.state.loaded
                      ? 'Click below to generate'
                      : 'Drag & Drop CSV File Here'}
                  </div>
                </form>
              </Card.Body>
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
          </Col>
          <Col></Col>
        </Row>
        <Row>{this.state.summary ? this.renderStats() : null}</Row>
        <br />
      </Container>
    );
  }
}
