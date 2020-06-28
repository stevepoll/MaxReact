import React from 'react';

import './Post.css';

const post = (props) => (

        <article className="Post" onClick={props.clicked}>
            <h1>{props.postData.title}</h1>
            <div className="Info">
                <div className="Author">{props.postData.author}</div>
            </div>
        </article>
);

export default post;