import React from 'react';

import Header from './components/Header/Header';
import Game from './components/Game/Game';

import './assets/css/shared.scss';
import Bored from './assets/img/bored.svg'

class App extends React.Component {
	constructor() {
        super();
        this.state = {
        	score: null,
        }
	}

	handleScore = (score) => {
		this.setState({ score });
	}

	render() {
		return(
			<div className="main">
				<div className="rps-container">
					<form>
						<input src="" name="name" required />
						<button type="submit">submit</button>
					</form>
					<Header score={this.state.score} />
					<Game handleScore={this.handleScore} 	/>
					<small className="made-by"><img src={Bored} alt="bored" /> By Malik Turk</small>
				</div>
			</div>
		)
	};
}

export default App;
