import React, { Component } from 'react';
import like from '../like.svg';
import api from '../services/Api';
import './Tweet.css';


export default class Tweet extends Component {

handlleLike = async () =>{
    const {_id } = this.props.tweet;

    await api.post(`likes/${_id}`);
};

  render() {
    const { tweet } = this.props;

 return (
        <li className="tweet">
            <strong>{tweet.author}</strong>
            <p>{tweet.content}</p>
            <button 
            type="button"
            onClick={this.handlleLike}
            >
            <img src={like} alt="like" />
             {tweet.likes} 
            </button>
        </li>
    )
  }
}
