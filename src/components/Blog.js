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
        data = await this.getAllPosts(blogID, APIKey);
        this.setState({ blogTitle: data.title, blogSubtitle: data.subtitle, numOfPosts: data.numOfPosts });
        this.setState({ posts: data.posts });
    }

    // Get's all info of a blog

    getAllPosts = async (id, apikey, maxResults = 100, from = 1, to = null) => {
        let blog = {};
        blog.posts = [];
        let targetUrl = `https://cors-anywhere.herokuapp.com/https://www.blogger.com/feeds/${id}/posts/default/?key=${apikey}&max-results=1&start-index=1`;

        let blob = await fetch(targetUrl);
        let xmlBlog = await blob.text();

        let jsonBlog = convert.xml2json(xmlBlog, { compact: true });
        jsonBlog = JSON.parse(jsonBlog);

        // Relevant info: json.title, json.subtitle, json['opensearch:totalResults']
        jsonBlog = jsonBlog.feed;
        blog.title = jsonBlog.title._text;
        blog.subtitle = jsonBlog.subtitle._text;
        blog.numOfPosts = parseInt(jsonBlog['openSearch:totalResults']._text);

        if (!to) { to = blog.numOfPosts }

        blog.posts = await this.getPosts(id,apikey,maxResults,from, to);

        return blog;
    }

    getPosts = async (id, apikey, maxResults, from, to) => {
        let posts = [];
        let numOfPages = Math.ceil(to/maxResults);
        for (let i = 1; i <= numOfPages; i++) {
            let targetUrl = `https://cors-anywhere.herokuapp.com/https://www.blogger.com/feeds/${id}/posts/default/?key=${apikey}&max-results=${maxResults}&start-index=${from}`;
            let blob = await fetch(targetUrl);
            let xmlPosts = await blob.text();
    
            let jsonPosts = JSON.parse(convert.xml2json(xmlPosts, { compact: true }));
            jsonPosts = jsonPosts.feed.entry;
   
            for (let item of jsonPosts) {
                posts.push(item)
            }
            from = from + maxResults;
        }
        return posts;

    }


    render() {
        if (this.state.posts) {
            return (
                <div>
                    <h1>{this.state.title}</h1>
                    <h2>{this.state.subtitle}</h2>
                    <PostList posts={this.state.posts} search={this.props.search} />
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
