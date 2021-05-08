import React, { Fragment } from 'react';
import { CsvObject } from './parser';
import { parse, ParseResult } from 'papaparse';
import { Calculator } from './analyzers/Calculator';
import { MonthSummary, MonthExtremeSum } from './datatypes';
import { Grid, Paper } from '@material-ui/core';
import dayjs from 'dayjs';

const style = {
  fileDropper: {
    padding: 12,
    alignItems: 'center',
    borderStyle: 'solid',
  },
  highlighted: {
    backgroundColor: 'blue',
  },
  dataCard: {
    padding: 12,
  },
};

interface AppState {
  year?: CsvObject[];
  loaded: boolean;
  summary?: any;
  extremes?: any;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    loaded: false,
    summary: [],
    year: [],
    extremes: [],
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
      const extremes = calc.monthlyExtremes(this.state.year);
      this.setState({ summary, extremes }, () => {
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

  renderExtremes = (): JSX.Element => {
    return this.state.extremes.map((s: MonthExtremeSum) => {
      return (
        <div key={Math.random()}>
          <Grid container>
            <Grid item lg={12}>
              <Paper elevation={3} style={{ padding: 20 }}>
                <div>{s.name}</div>
                <br />
                The warmest high was {s.warmest.high.value}°C on{' '}
                {dayjs(s.warmest.high.date).format('MMMM D')}.
                <br />
                The warmest low was {s.warmest.low.value}°C on{' '}
                {dayjs(s.warmest.low.date).format('MMMM D')}.
                <br />
                <br />
                The coldest high was {s.coldest.high.value}°C on{' '}
                {dayjs(s.coldest.high.date).format('MMMM D')}.
                <br />
                The coldest low was {s.coldest.low.value}°C on{' '}
                {dayjs(s.coldest.low.date).format('MMMM D')}.
                <br />
                <br />
                The highest precipitation amount was {s.precip.value}mm on{' '}
                {dayjs(s.precip.date).format('MMMM D')}
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    });
  };

  renderSummary = (): JSX.Element => {
    return this.state.summary.map((s: MonthSummary) => {
      return (
        <div key={Math.random()}>
          <Grid container>
            <Grid item lg={12}>
              <Paper elevation={3} style={{ padding: 20 }}>
                <div>
                  <h1>{s.name}</h1>
                  This is your summary for the month of {s.name}.
                </div>
                <br />
                Average high: {s.avgHigh}
                <br />
                Average low: {s.avgLow}
                <br />
                Mean temp: {s.mean}
                <br />
                Precipitation (mm): {s.precipTotal} <br />
                Precipitation days: {s.precipDays}
                <br />
              </Paper>
            </Grid>
          </Grid>
          <br />
        </div>
      );
    });
  };

  renderStats = (): any => {
    console.log('stats rendered');
    return (
      <Fragment>
        <div>{this.renderExtremes()}</div>
      </Fragment>
    );
  };

  render() {
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
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          {this.state.extremes ? this.renderExtremes() : null}
        </Grid>
      </React.Fragment>
    );
  }
}
