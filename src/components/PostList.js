import React from 'react';
import Post from './Post';
import * as convert from 'xml-js';

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
        
        let targetUrl = `https://cors-anywhere.herokuapp.com/https://www.blogger.com/feeds/${id}/posts/default/?key=${apikey}&max-results=5`;
        let blob = await fetch(targetUrl);
        let xmlCuecas = await blob.text();
        let jsonCuecas = convert.xml2json(xmlCuecas, {compact: true});
        jsonCuecas = JSON.parse(jsonCuecas);
        jsonCuecas = jsonCuecas.feed;
        
        for (let item of jsonCuecas.entry) {
            data.push(item)
        }

        return data;
    }

    render() {
        if (this.state.data) {
        
            return (
                <div> 
                    {this.state.data.map(post => (
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