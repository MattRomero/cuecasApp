import React from 'react';
import Table from 'react-bootstrap/Table';



function Post(props) {
    let title = props.title._text.substr(props.title._text.indexOf(" ") + 1);
    return <tbody><tr><td>{title}</td></tr></tbody>
}

export default Post;