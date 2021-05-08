import React from 'react';
import { CsvObject } from './parser';
import { parse, ParseResult } from 'papaparse';
import { Calculator } from './analyzers/Calculator';
import { StatsObject, YearStats } from './datatypes';
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
  stats: any;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    loaded: false,
    year: [],
    stats: [],
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
      const stats = calc.getYearStats(this.state.year);
      this.setState({ stats }, () => {
        console.log('Stats generated!');
        console.log(this.state.stats);
      });
    }
  };

  clearCsv = (): void => {
    this.setState({
      loaded: false,
      year: undefined,
      stats: undefined,
    });
    console.clear();
  };

  renderExtremes = (summary: StatsObject): any => {
    const { warmest, coldest, precip } = summary.extremes;
    return (
      <div key={Math.random()}>
        The warmest high was {warmest.high.value}°C on{' '}
        {dayjs(warmest.high.date).format('MMMM D')}.
        <br />
        The warmest low was {warmest.low.value}°C on{' '}
        {dayjs(warmest.low.date).format('MMMM D')}.
        <br />
        <br />
        The coldest high was {coldest.high.value}°C on{' '}
        {dayjs(coldest.high.date).format('MMMM D')}.
        <br />
        The coldest low was {coldest.low.value}°C on{' '}
        {dayjs(coldest.low.date).format('MMMM D')}.
        <br />
        <br />
        The highest precipitation amount was {precip.value}mm on{' '}
        {dayjs(precip.date).format('MMMM D')}
      </div>
    );
  };

  renderSummary = (stats: StatsObject): any => {
    const { summary } = stats;
    return (
      <div key={Math.random()}>
        <div>
          <h1>{summary.name}</h1>
        </div>
        <br />
        Average high: {summary.avgHigh}°C
        <br />
        Average low: {summary.avgLow}°C
        <br />
        Mean temp: {summary.mean}°C
        <br />
        Precipitation (mm): {summary.precipTotal}mm <br />
        Precipitation days: {summary.precipDays}
        <br />
        <br />
      </div>
    );
  };

  renderStats = (summary: YearStats): any => {
    return summary.map((s: StatsObject) => {
      console.log(s);
      return (
        <div>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <Paper style={{ padding: 20 }}>
              <Grid item xs={12}>
                {this.renderSummary(s)}
              </Grid>
              <Grid item xs={12}>
                {this.renderExtremes(s)}
              </Grid>
            </Paper>
            <br />
            <br />
          </Grid>
        </div>
      );
    });
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
          {this.state.stats ? this.renderStats(this.state.stats) : null}
        </Grid>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        ></Grid>
      </React.Fragment>
    );
  }
}
