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
            numOfPosts: "",
            blogTitle: "",
            blogSubtitle: "",
        }
    }
    async componentDidMount() {
        let data;
        data = await this.getAllPosts(blogID,APIKey);
        this.setState({ blogTitle: data.title, blogSubtitle: data.subtitle, numOfPosts: data.numOfPosts  });
        this.setState({ posts: data.posts });
    }

    // Get's all info of a blog

    getAllPosts = async (id,apikey, maxResults = 100, from = 1, to = null) => {
        let blog = {};
        blog.posts = [];
        let targetUrl = `https://cors-anywhere.herokuapp.com/https://www.blogger.com/feeds/${id}/posts/default/?key=${apikey}&max-results=1&start-index=1`;

        let blob = await fetch(targetUrl);
        let xmlCuecas = await blob.text();
        
        let jsonCuecas = convert.xml2json(xmlCuecas, {compact: true});
        jsonCuecas = JSON.parse(jsonCuecas);
        
        // Relevant info: json.title, json.subtitle, json['opensearch:totalResults']
        jsonCuecas = jsonCuecas.feed;
        blog.title = jsonCuecas.title._text;
        blog.subtitle = jsonCuecas.subtitle._text;
        blog.numOfPosts = jsonCuecas['openSearch:totalResults']._text;

        for (let item of jsonCuecas.entry) {
            blog.posts.push(item)
        }
        
        return blog;
    }

    getPosts = async (id,apikey, maxResults = 100, from = 1, to = null) => {
        let targetUrl = `https://cors-anywhere.herokuapp.com/https://www.blogger.com/feeds/${id}/posts/default/?key=${apikey}&max-results=${maxResults}&start-index=${from}`;
        let blob = await fetch(targetUrl);
        let xmlCuecas = await blob.text();
        
        let jsonCuecas = convert.xml2json(xmlCuecas, {compact: true});
        jsonCuecas = JSON.parse(jsonCuecas);
        
        jsonCuecas = jsonCuecas.feed.entry;

        
    }


    render() {
        if (this.state.posts) {
            return (
            <div>
                <h1>{this.state.title}</h1>
                <h2>{this.state.subtitle}</h2>
                <PostList posts={this.state.posts} />
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

export default Blog;
