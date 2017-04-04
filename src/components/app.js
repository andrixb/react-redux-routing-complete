import React, {Component} from 'react';

export default class App extends Component {
	render() {
		return (
			<div>
				{this.props.children} 
			</div>
		);
	}
}
// this.props.children is used to render subroutes