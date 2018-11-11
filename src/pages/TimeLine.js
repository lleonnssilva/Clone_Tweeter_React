import React, { Component } from 'react';
import twitterLogo from '../twitter.svg';
import './Timeline.css';
import api from '../services/Api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

export default class Timeline extends Component {

  state = {
    tweets:[],
    newTwiter:'',
  };
  async componentDidMount(){
    this.subscribeToEvents();
      const response = await api.get('tweets');
      this.setState({tweets : response.data});
  
  }
  subscribeToEvents =() =>{
    const io = socket('http://localhost:3000');

    io.on('tweet', data =>{
      this.setState({tweets : [data, ...this.state.tweets] })
    });
    io.on('like', data =>{
      this.setState({tweets : this.state.tweets.map( tweet =>
        tweet._id === data._id ? data : tweet
      ) })
    });
  }

  handleInputchange= e=>{
    this.setState({newTwiter:e.target.value});
  }
  handleNewTwiter = async e =>{
    if(e.keyCode !== 13) return ;
    const content = this.state.newTwiter;
    const author = localStorage.getItem('@goTwiter:username');
    
    await api.post('tweets',{content , author});
    this.setState({newTwiter:''});
  }
  render() {
    return (
          <div className={"timeline-wrapper"}>
          <img alt="GoTwitter" height={24} src={twitterLogo}/>

          <form>
            <textarea
            value={this.state.newTwiter}
            onChange={this.handleInputchange}
            onKeyDown={this.handleNewTwiter}
            placeholder="O que está acontecendo?"
            />
          </form>
          <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id}  tweet={tweet} />
            ))}
          </ul>
          </div>
    );
  }
}
