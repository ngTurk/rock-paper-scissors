import React, { Component } from 'react'

import Paper from '../../assets/img/icon-paper.svg';
import Scissors from '../../assets/img/icon-scissors.svg';
import Rock from '../../assets/img/icon-rock.svg';
import loading from '../../assets/img/Xqg8.gif';

import './Game.scss';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            homeSelection: '',
            homeImage: '',
            image: '',
            isSelected: false,
            isWaiting: false,
            selected: '',
            result: '',
            score: 0,
        }
    }

    selectItem(choice) {
        const odds = ['paper', 'scissors', 'rock'];
        const homeSelection = odds[this.randomNumbers(0, 2)];
        const tempScore = this.state.score;

        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });

        this.setState({
            isSelected: true,
            isWaiting: true,
            homeSelection: homeSelection,
            homeImage: homeSelection === 'paper' ? Paper : homeSelection === 'scissors' ? Scissors : Rock,
            selected: choice,
            image: choice === 'paper' ? Paper : choice === 'scissors' ? Scissors : Rock,
        });

        setTimeout(() => {
            this.setState({ isWaiting: false });
        }, 1500);

        if (choice === homeSelection) {
            this.setState({ result: 'IT\'S A TIE!' });
        }

        if (choice === "rock" && !(choice === homeSelection)) {
            if (homeSelection === "scissors") {
                this.setState({ result: 'YOU WIN!', score: tempScore + 1 });
            } else {
                this.setState({ result: 'YOU LOSE!' });
            }
        }

        if (choice === "paper" && !(choice === homeSelection)) {
            if (homeSelection === "rock") {
                this.setState({ result: 'YOU WIN!', score: tempScore + 1 });
            } else {
                this.setState({ result: 'YOU LOSE!' });
            }
        }

        if (choice === "scissors" && !(choice === homeSelection)) {
            if (homeSelection === "rock") {
                this.setState({ result: 'YOU LOSE!' });
            } else {
                this.setState({ result: 'YOU WIN!', score: tempScore + 1 });
            }
        }

        setTimeout(() => {
            this.props.handleScore(this.state.score);
        }, 1700);
    }

    playAgain() {
        this.setState({ isSelected: false });
    }

    randomNumbers(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    componentDidUpdate() {
        if(this.state.score < 0) {
            this.setState({ score: 0 })
        }
    }

    render() {
        return (
            <div className="rps-game-area">
                { !this.state.isSelected ?
                    <div className="choice-area">
                        <div onClick={() => this.selectItem('paper')} className="each-choice paper">
                            <img src={Paper} alt="paper" />
                        </div>

                        <div onClick={() => this.selectItem('scissors')} className="each-choice scissors">
                            <img src={Scissors} alt="scissors" />
                        </div>

                        <div onClick={() => this.selectItem('rock')} className="each-choice rock">
                            <img src={Rock} alt="rock" />
                        </div>
                    </div>
                    : ''
                }

                { this.state.isSelected ?
                    <div className="selected-area">
                        <div className={`each-choice ${this.state.selected}`}>
                            <div className="choice-text">You Picked</div>
                            <img src={this.state.image} alt="user selection" />
                        </div>

                        { this.state.isWaiting ?
                            <div className="results results-icon">
                                <img src={loading} alt="dog" />
                            </div>
                            :
                            <div className="results score">
                                <span>{this.state.result}</span>
                                <button onClick={() => this.playAgain()}>PLAY AGAIN</button>
                            </div>
                        }

                        { this.state.isWaiting ?
                            <div className="each-choice waiting"></div>
                            :
                            <div className={`each-choice ${this.state.homeSelection}`}>
                                <div className="choice-text">The House Picked</div>
                                <img src={this.state.homeImage} alt="home selection" />
                            </div>
                        }
                    </div>
                    : ''
                }
            </div>
        )
    }
}
