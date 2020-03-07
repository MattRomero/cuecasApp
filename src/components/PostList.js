import React from 'react';
import Post from './Post';


class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        }
    }
    render() {
        if (this.props.posts) {
            return (
                <div> 
                    {this.props.posts.map(post => (
                        <Post title={post.title} />
                    ))}
                </div>
            );

        }
        else {
            return (
            <div>
                <img src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif' width='50px' />
            </div>
            )
        }
    }
}

export default PostList;