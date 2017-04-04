import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
		title: {
			type: 'input',
			label: 'Title for Post'
			// validate: () => {} // for custom vaidation field
		},
		categories: {
			type: 'input',
			label: 'Enter some categories for this post'
		},
		content: {
			type: 'textarea',
			label: 'Post Contents'
		}
 };

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

	renderField(fieldConfig, field) {
		const fieldHelper = this.props.fields[field];

		return (
			<div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
				<label>{fieldConfig.label}</label>
				<fieldConfig.type type="text" className="form-control" {...fieldHelper} />
				<div className="text-help">
					{fieldHelper.touched ? fieldHelper.error : ''}
				</div>
			</div>
		);
	}

  render() {
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>

				{_.map(FILEDS, this.renderField.bind(this))}

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>

			</form>
      );
  }
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if (!values[field]) {
			errors[field] = `Enter a ${field}`;
		}
	});

	return errors;
}

// reduxForm() works as connect().
// connect() : first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm(): 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps (that hosts the name of the action creator)
export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS), // it returns an arrey of strings
	validate
}, null, { createPost })(PostsNew);
