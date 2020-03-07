import React from 'react';
import * as convert from 'xml-js';
import PostList from './PostList';

let APIKey = 'AIzaSyATJGT2-yS4h35iV9akdb4ycNvMNBALafM';

// ID cuecasfilete
let blogID = '3008791971595361793';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: "",
        }
    }
    async componentDidMount() {
        let data;
        data = await this.getAllPosts(blogID,APIKey);
        this.setState({ posts: data.posts });
    }

    getAllPosts = async (id,apikey, maxResults = 100, from = 1, to = null) => {
        let blog = {};
        blog.posts = [];
        let targetUrl = `https://cors-anywhere.herokuapp.com/https://www.blogger.com/feeds/${id}/posts/default/?key=${apikey}&max-results=5`;
        let blob = await fetch(targetUrl);
        let xmlCuecas = await blob.text();
        let jsonCuecas = convert.xml2json(xmlCuecas, {compact: true});
        jsonCuecas = JSON.parse(jsonCuecas);
        jsonCuecas = jsonCuecas.feed;
        for (let item of jsonCuecas.entry) {
            blog.posts.push(item)
        }
        return blog;
    }

    render() {
        if (this.state.posts) {
            return <PostList posts={this.state.posts} />
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

export default Blog;
