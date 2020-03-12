import React from 'react';
import Post from './Post';
import Table from 'react-bootstrap/Table';


class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        }
    }
    render() {
        if (this.props.search.length > 3) {
            let cuecasFiltered = this.props.posts.filter(cueca => cueca.title._text.toLowerCase().includes(this.props.search.toLowerCase()));
            if (cuecasFiltered.length > 0) {
                return (
                    <Table bordered hover>
                        {cuecasFiltered.map(post => (
                            <Post title={post.title} />
                        ))}
                    </Table>
                );
            }
            else { return <p>Tu búsqueda no dió ningún resultado</p> }
        }
        else {
            return (
                <p>Hay {this.props.numOfPosts} cuecas</p>
            );
        }
    }
}

export default PostList; 