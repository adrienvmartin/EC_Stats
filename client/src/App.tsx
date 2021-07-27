import React from 'react';
import { parse, ParseResult } from 'papaparse';
// import parse from 'csv-parse';
import fs from 'fs';
import { Calculator } from './Calculator';
import { StatsObject, YearStats, CsvObject } from './datatypes';
import { Grid, Paper } from '@material-ui/core';
import dayjs from 'dayjs';
import axios from 'axios';

const style = {
  fileDropper: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  selectedFile?: any;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    loaded: false,
    year: [],
    stats: [],
    selectedFile: null,
  };

  // Create POST route that will send the result of this function to an API call
  // on the Express server that will then be put into a MySQL database
  // Separate columns in here
  createStatsArray = (e: React.DragEvent<HTMLDivElement>) => {
    Array.from(e.dataTransfer.files)
      .filter((file) => file.type === 'text/csv')
      .forEach(async (file) => {
        const text = await file.text();
        const result: ParseResult<CsvObject> = await parse(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => {
            let regex = /\s/g;
            return h.replace(regex, '');
          },
        });
        // const newres = result.data.forEach(d => )
        // axios.post('/takestats', result);

        this.setState({ year: result.data, loaded: true });
      });
  };

  // Create GET route that will retrieve the data from MySQL
  generateStats = (e: React.MouseEvent): void => {
    e.preventDefault();
    const calc = new Calculator();
    if (this.state.year !== undefined) {
      const stats = calc.getYearStats(this.state.year);
      this.setState({ stats });
    }
  };

  clearCsv = (): void => {
    this.setState({
      loaded: false,
      year: [],
      stats: [],
    });
    axios.post('http://localhost:3001/takestats');
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
    const {
      summary: { name, avgHigh, mean, avgLow, precipTotal, precipDays },
    } = stats;
    return (
      <div key={Math.random()}>
        <div>
          <h1>{name}</h1>
        </div>
        <br />
        Average high: {avgHigh}°C
        <br />
        Mean temp: {mean}°C
        <br />
        Average low: {avgLow}°C
        <br />
        <br />
        Precipitation (mm): {precipTotal}mm <br />
        Precipitation days: {precipDays}
        <br />
        <br />
      </div>
    );
  };

  renderStats = (summary: YearStats): any => {
    return summary.map((s: StatsObject) => {
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

  fileHandler = (e: any) => {
    console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] }, () => {
      // console.log(this.state);
    });
  };

  fileClick = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios.post('http://localhost:3001/upload', data, {}).then((res) => {
      console.log(res.statusText);
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
          <form>
            <input
              type="file"
              name="file"
              onChange={(e) => this.fileHandler(e)}
            />
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={this.fileClick}
            >
              Upload
            </button>
          </form>
          <Paper>
            <button
              onClick={(e) => this.generateStats(e)}
              disabled={
                this.state.year !== undefined && this.state.year.length < 1
              }
            >
              Generate Stats
            </button>
            {'   '}
            <button onClick={() => this.clearCsv()}>Clear CSV</button>
          </Paper>
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
          {this.state.stats.length > 0 ? (
            <div>
              <h1>
                Stats for{' '}
                {dayjs(this.state.stats[0].extremes.precip.date).format('YYYY')}
                {'  '}in {this.state.stats[0].stationName}
              </h1>
            </div>
          ) : null}
        </Grid>
        <br />
        <br />
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          {this.state.stats.length > 0
            ? this.renderStats(this.state.stats)
            : null}
        </Grid>
      </React.Fragment>
    );
  }
}
