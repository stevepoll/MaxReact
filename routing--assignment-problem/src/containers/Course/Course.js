import React, { Component } from 'react';

class Course extends Component {
  state = {
    courseTitle: ''
  }

  componentDidMount() {
    this.parseQueryParams()
  }

  componentDidUpdate() {
    this.parseQueryParams()
  }

  parseQueryParams() {
    const query = new URLSearchParams(this.props.location.search)
    const courseTitle = query.get('title')

    if (courseTitle !== this.state.courseTitle) {
      this.setState({ courseTitle: courseTitle })
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.courseTitle}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;