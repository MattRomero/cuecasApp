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
            if (this.props.search) {
                let cuecasFiltered = this.props.posts.filter(cueca => cueca.title._text.includes(this.props.search));
                return (
                    <div>
                        {cuecasFiltered.map(post => (
                            <Post title={post.title} />
                        ))}
                    </div>
                );        
            }
            else {
                return (
                    <div>
                        {this.props.posts.map(post => (
                            <Post title={post.title} />
                        ))}
                    </div>
                );
            }

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