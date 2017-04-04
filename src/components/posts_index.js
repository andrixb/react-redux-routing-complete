import React, {Component} from 'react';
import {connect} from 'react-redux';
// short-hand is used. the next is commented
// import {bindActionCreators} from 'redux';
import {fetchPosts} from '../actions/index';
import {Link} from 'react-router';

// export default () => {
//     return <div>List of blog post.</div>;
// };

// this is actually a container

class PostIndex extends Component {
	// activate lifecycle method -> it is loaded when the component is about to be mounted
	componentWillMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return this.props.posts.map((post) => {
			return (
				<li className="list-group-item" key={post.id}>
					<Link to={"posts/" + post.id}>
						<span className="pull-xs-right">{post.categories}</span>
						<strong>{post.title}</strong>
					</Link>
				</li>
			);
		});
	}

	render() {
		return(
			<div>
				<div className="text-xs-right">
					<Link to="posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return { posts: state.posts.all }
}

// this is a short-hand to avoid
// function mapDispatchToProps(dispatch){
	// return bindActionCreators({ fetchPost: fetchPost }, dispatch);
// }
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
