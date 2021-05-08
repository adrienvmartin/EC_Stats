import React from 'react';
import { CsvObject } from './parser';
import { parse, ParseResult } from 'papaparse';
import { Calculator } from './analyzers/Calculator';
import { MonthSummary } from './datatypes';
import { Container, Grid, Paper } from '@material-ui/core';

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
        // console.log('this.state: ', this.state);
        // this.renderStats();
        console.log('Stats generated!');
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
        <div>
          <div key={Math.random()}>
            <h1>{s.name}</h1>
          </div>
          Average high: {s.avgHigh}
          <br />
          Mean temp: {s.mean}
          <br />
          Average low: {s.avgLow}
          <br />
          Precipitation (mm): {s.precipTotal}
          <br />
          Precipitation days: {s.precipDays}
          <br />
        </div>
      );
    });
  };

  render() {
    const style = {
      fileDropper: {
        padding: 12,
        alignItems: 'center',
        borderStyle: 'solid',
      },
      highlighted: {
        backgroundColor: 'blue',
      },
    };
    return (
      <React.Fragment>
        <Grid container direction="column" justify="center" alignItems="center">
          {/* HEADER SECTION */}
          {/******************/}

          <h1>Environment Canada CSV File Parser</h1>

          <br />
          {/* CSV SELECTION */}
          {/*******************/}
          <Paper>
            <form>
              <div
                style={style.fileDropper}
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
          </Paper>
          <br />
          <Paper>
            <button onClick={(e) => this.generateStats(e)}>
              Generate Stats
            </button>
            {'   '}
            <button onClick={this.clearCsv}>Clear CSV</button>
          </Paper>
          <br />
          <br />
          <br />
        </Grid>
        <Grid>{this.state.summary ? this.renderStats() : null}</Grid>
      </React.Fragment>
    );
  }
}
