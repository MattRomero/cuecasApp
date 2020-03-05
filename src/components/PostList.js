import React from 'react';
import Post from './Post';

let APIKey = 'AIzaSyATJGT2-yS4h35iV9akdb4ycNvMNBALafM';

// ID cuecasfilete
let blogID = '3008791971595361793';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        }
    }
    async componentDidMount() {
        let data;
        data = await this.getAllPosts(blogID,APIKey);
        this.setState({ data: data });
    }


    getAllPosts = async (id,apikey) => {
        let data = [];
        let targetUrl = `https://www.googleapis.com/blogger/v3/blogs/${id}/posts?key=${apikey}`;
        let blob = await fetch(targetUrl);
        let data = await blob.json();
        return data;
    }

    render() {
        console.log(this.state.data.items);
        if (this.state.data) {
            return (
                <div>
                    {this.state.data.items.map(post => (
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