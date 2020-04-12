import React from 'react';
import { Cards, Charts, CountrySelector } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImg from './images/covid.webp';

class App extends React.Component {

  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImg} alt="covid-19" />
        <Cards data={data} />
        <CountrySelector handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;