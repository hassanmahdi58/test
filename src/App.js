

import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Navbar from './Navbar';
import List from './List';

const ENDPOINT = 'https://itunes.apple.com/search',
      ENTITY = ['musicArtist', 'album', 'musicTrack'],
      COUNTRY = 'GB',
      LIMIT = 10,
      URL = `${ENDPOINT}?country=${COUNTRY}&entity=${ENTITY.join()}&limit=${LIMIT}`;

class App extends Component {

  searchField = { value: 'U2' };
  noFetching = true;
  state = {    
    offset: 0,
    list: [], 
    toggles: {},
    msg: 'Welcome , Search your favourite songs here',
  };

  async fetch( forceFetch = false ) {    
    if (this.noFetching && !forceFetch) return;
    this.noFetching = true;
    this.setState({ msg: 'Loading, please wait ...' }); 
    try {
      const req = `${URL}&term=${this.state.terms}&offset=${this.state.offset}`,
            response = await fetchJsonp(req),
            data = await response.json();
      this.setState({
        list: [...this.state.list, ...data.results],  
        offset: this.state.offset + data.resultCount,       
        msg: data.resultCount<LIMIT?`
          There are no${this.state.list.length||data.resultCount?' more ':' '}results
          `:'',
      }, () => { this.noFetching = data.resultCount<LIMIT } );
    } catch(err) {
      this.setState({ msg: `Houston, we have a problem: ${err.message}` });
    } 

  }   

  handleSubmit = () => this.setState({ 
    list: [], 
    toggles: {}, 
    offset: 0,    
    terms: encodeURIComponent(this.searchField.value)
  }, () => this.fetch(true) ); 
  
  handleToggle = (index) => {
    return () => 
      this.setState({ toggles: { ...this.state.toggles, [index]: !this.state.toggles[index] } });
  };

  handleScroll = ev => {
    if (window.pageYOffset > document.body.clientHeight - window.innerHeight) 
      this.fetch();
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }  

  render() {    
    return (
      <div>
        <Navbar 
          onSubmit={this.handleSubmit} 
          query={this.searchField.value}
          saveRef={ ref => {this.searchField = ref} }
        />
       
            <div className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 main">    
              <div className="row">
                <List 
                  data={this.state.list} 
                  toggles={this.state.toggles} 
                  onToggle={this.handleToggle} 
                />          
              </div>
              { !this.state.list.length?void 0:
                <div className="row">
                  <button onClick={ () => this.fetch() } type="button" className="btn btn-secondary">Load More</button>
                </div>              
              }
              <div className="row">{this.state.msg}</div>
            </div>
          </div>
           
    );
  }
}

export default App;
