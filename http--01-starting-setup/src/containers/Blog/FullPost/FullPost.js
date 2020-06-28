import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {
    state = {
        selectedPost: null
    }

    componentDidMount() {
        // console.log("[FullPost]:")
        // console.log(this.props)
        this.loadData()
    }

    // Need to use did update if compoent is already loaded thru routing
    componentDidUpdate() {
        this.loadData()
    }

    loadData = () => {
        // this.props.id does not work since we used Router (see props in log output)
        console.log(this.props)
        let propsPostId = this.props.match.params.id
        if (this.props.match.params.id) {
            const selectedPost = this.state.selectedPost
            // Convert the id to number by adding + in front of it
            if (!selectedPost || (selectedPost && selectedPost.id !== +propsPostId)) {
                axios.get('/posts/' + propsPostId)
                    .then(response => {
                        // console.log(response.data)
                        this.setState({ selectedPost: response.data })
                    })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>
        }
        if (this.state.selectedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.selectedPost.title}</h1>
                    <p>{this.state.selectedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;