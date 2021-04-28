import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface AppState {
  filename: string;
}

interface AppProps {
  stats?: [];
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { filename: '' };
  }

  private onSubmit(filename: string) {
    console.log(`Submitted: ${filename}`);
    // return new CsvReader(filename);
  }

  onHandleClick = (filename: string): void => {
    this.setState({ filename: filename });
    console.log(this.state.filename);
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
                  <input type="file" name="csvFile" />
                  <br />
                  <button
                    type="submit"
                    onClick={() => this.onSubmit('csvFile')}
                  >
                    Generate
                  </button>
                </form>
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
