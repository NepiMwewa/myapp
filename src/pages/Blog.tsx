import React, {useState, useEffect } from 'react';
import { Card, Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';

type PostObj = {
  userId: number,
  id: number,
  title: string,
  body: string
}
type CommentObj = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}
type PhotoObj = {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

export function Blog (){
  const [resourceType, setResourceType] = useState<string>('posts');
  const [postItems, setPostItems] = useState<Array<PostObj>>([]);
  const [commentItems, setCommentItems] = useState<Array<CommentObj>>([]);
  const [photoItems, setPhotoItems] = useState<Array<PhotoObj>>([]);
  const [items, setItems] = useState<Array<any>>([]);

  useEffect( () => {

    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then(response => response.json())
        .then(json => setItems(json));

    /*
    if(resourceType === "posts"){
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then(response => response.json())
        .then(json => setPostItems(json));
    }else if(resourceType === "comments"){
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then(response => response.json())
        .then(json => setCommentItems(json));
    }else{
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then(response => response.json())
        .then(json => setPhotoItems(json));
    }
    */
  }, [resourceType]);
  
  function displayCards(){
    
    if(resourceType === "posts") {
      return (items.map(item => {
        return displayPost(item);
      }))
    }else if(resourceType === "comments"){
      return (items.map(item => {
        return displayComment(item);
      }))
    }else {
      return (items.map(item => {
        return displayPhoto(item);
      }))
    }

    /*
    if(resourceType === "posts") {
      return (postItems.map(item => {
        return displayPost(item);
      }))
    }else if(resourceType === "comments"){
      return (commentItems.map(item => {
        return displayComment(item);
      }))
    }else {
      return (photoItems.map(item => {
        return displayPhoto(item);
      }))
    }
    */
  }

  return (
    <Container className="container-fluid">
      <div>
      
        <Button className='m-2' onClick={() => setResourceType('posts')}>Posts</Button>
        <Button className='m-2' onClick={() => setResourceType('photos')}>Photos</Button>
        <Button className='m-2' onClick={() => setResourceType('comments')}>Comments</Button>
      </div>
      <h2>{resourceType}</h2>
      <Container>
        { displayCards() }
      </Container>
    </Container>
  );
}


function displayPost(item: PostObj){
    return(
      <Card key={item.id.toString()} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.userId}</Card.Subtitle>
          <Card.Text>
            {item.body}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{item.id}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
}

function displayComment(item: CommentObj){
  return(
    <Card key={item.id.toString()} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.email}</Card.Subtitle>
        <Card.Text>
          {item.body}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">{item.id}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

function displayPhoto(item: PhotoObj){
  return(
    <Card key={item.id.toString()} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={item.url} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.albumId}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{item.id}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}