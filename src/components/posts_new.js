import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
 // thisi is used to redirect after an anction.
// avoid context in genral. use them just when working with router
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		// it redirects to a path
		this.props.createPost(props)
			.then(() => {
				// blog has been created, navigate the user to the index
				// we navigate by calling this.context.router.push with
				// new path to navigate to
				this.context.router.push('/');
			});
	}

  render() {
		const {fields: { title, categories, content }, handleSubmit} = this.props;
		// const handleSubmit = this.props.handleSubmit
		// const title = this.props.fields.title;

    return (
      		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>

				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories} />
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`} >
					<label>Content</label>
					<textarea className="form-control" {...content} />
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>

			</form>
      );
  }
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a username';
	}

	if (!values.categories) {
		errors.categories = 'Enter a category';
	}

	if (!values.content) {
		errors.content = 'Enter content';
	}

	return errors;
}

// reduxForm() works as connect().
// connect() : first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm(): 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps (that hosts the name of the action creator)
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost })(PostsNew);
