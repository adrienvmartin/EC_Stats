import React from 'react';
import { parse, ParseResult } from 'papaparse';
import { Calculator } from './analyzers/Calculator';
import { StatsObject, YearStats, CsvObject } from './datatypes';
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
        Warmest high: {warmest.high.value}°C (
        {dayjs(warmest.high.date).format('MMMM D')})
        <br />
        Warmest low: {warmest.low.value}°C (
        {dayjs(warmest.low.date).format('MMMM D')})
        <br />
        <br />
        Coldest high: {coldest.high.value}°C (
        {dayjs(coldest.high.date).format('MMMM D')})
        <br />
        Coldest low: {coldest.low.value}°C (
        {dayjs(coldest.low.date).format('MMMM D')})
        <br />
        <br />
        Highest precipitation: {precip.value}mm (
        {dayjs(precip.date).format('MMMM D')})
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
        <Paper
          style={{
            padding: 30,
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 50,
            width: 400,
          }}
        >
          {this.renderSummary(s)}
          {''}
          {this.renderExtremes(s)}
        </Paper>
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
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          {this.state.stats ? this.renderStats(this.state.stats) : null}
        </Grid>
      </React.Fragment>
    );
  }
}
