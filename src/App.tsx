import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { parse } from 'papaparse';

interface AppState {
  filename: string;
  data?: any;
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
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();

                      Array.from(e.dataTransfer.files)
                        .filter((file) => file.type === 'text/csv')
                        .forEach(async (file) => {
                          const text = await file.text();
                          const result = parse(text, {
                            header: true,
                            skipEmptyLines: true,
                            transformHeader: (h) => {
                              return h.replace(/\s/g, '');
                            },
                          });
                          this.setState({ data: result.data });
                          console.log(this.state.data[1]['MaxTemp(°C)']);
                        });
                    }}
                  >
                    DROP HERE
                  </div>
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
