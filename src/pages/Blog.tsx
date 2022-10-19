import React, {useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button } from "react-bootstrap";

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

  const [postsData, setPostsData] = useState<Array<PostObj>>([]);
  const [commentsData, setCommentsData] = useState<Array<CommentObj>>([]);
  const [photosData, setPhotosData] = useState<Array<PhotoObj>>([]);

  const [postItems, setPostItems] = useState<Array<PostObj>>([]);
  const [commentItems, setCommentItems] = useState<Array<CommentObj>>([]);
  const [photoItems, setPhotoItems] = useState<Array<PhotoObj>>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const[maximumPages, setMaximumPages] = useState<number>(0);
  let cardMaximum: number = 10;

  useEffect( () => {
    setCurrentPage(0);
    switch(resourceType){
      case "posts": {
        if(postItems.length === 0)
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not OK: ' + response.status);
            }
            return response.json();
          })
          .then((json) => {
            setPostsData(json);
            setMaximumPages(Math.floor(json.length / cardMaximum)  - 1);
            setPostItems(json.slice(0, cardMaximum));
          })
          .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
          });
        
        
        break;
      }

      case "comments": {
        if(commentItems.length === 0)
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not OK: ' + response.status);
            }
            return response.json();
          })
          .then((json) => {
            setCommentsData(json);
            setMaximumPages(Math.floor(json.length / cardMaximum) - 1);
            setCommentItems(json.slice(0, cardMaximum));
          })
          .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
          });
        break;
      }

      case "photos": {
        if(photoItems.length === 0)
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not OK: ' + response.status);
            }
            return response.json();
          })
          .then((json) => {
            setPhotosData(json);
            setMaximumPages(Math.floor(json.length / cardMaximum)  - 1);
            setPhotoItems(json.slice(0 , cardMaximum));
          })
          .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
          });
        
        break;
      }

      default: {
        throw 'Error: trying to load wrong resourceType. resourceType: ' + resourceType;
        break;
      }
    }

  }, [resourceType]);

  useEffect( () => {
    switch(resourceType){
      case "posts": {
        setPostItems(postsData.slice(currentPage * 10, (currentPage * 10) + cardMaximum));
        break;
      }

      case "comments": {

        setCommentItems(commentsData.slice(currentPage * 10, (currentPage * 10) + cardMaximum));
        break;
      }

      case "photos": {

        setPhotoItems(photosData.slice(currentPage * 10, (currentPage * 10) + cardMaximum));
        break;
      }

      default: {
        throw 'Error: trying to load wrong resourceType. resourceType: ' + resourceType;
        break;
      }
    }
  }, [currentPage, resourceType]);
  
  function displayCards(){
    
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
    
  }

  function firstPage(){
    return (
      <Button className='m-2' disabled={currentPage <= 0 ? true : false} onClick={() => setCurrentPage(prevCurrentPage => 0)}>First Page</Button>
    )
  }
  function lastPage(){
    return (
      <Button className='m-2' disabled={currentPage >= maximumPages ? true : false} onClick={() => setCurrentPage(prevCurrentPage => maximumPages)}>Last Page</Button>
    )
  }


  //return previous page button. if the current page is less than or equal to 0, disable it.
  function previousPage(){

    return (
      <Button className='m-2' disabled={currentPage <= 0 ? true : false} onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage - 1)}>Previous Page</Button>
    )
    
  }
  //return next page button. if the current page is within the last 10 pages of posts, disable it.
  function nextPage(){
  
    return (
      <Button className='m-2' disabled={currentPage >= maximumPages ? true : false} onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage + 1)}>Next Page</Button>
    )
    
  }

  return (
    <Container className="container-fluid text-center">
      <div>
      
        <Button className='m-2' onClick={() => setResourceType('posts')}>Posts</Button>
        <Button className='m-2' onClick={() => setResourceType('photos')}>Photos</Button>
        <Button className='m-2' onClick={() => setResourceType('comments')}>Comments</Button>
      </div>
      <h2>{resourceType}</h2>
      <Container>
        <Row>
          <Col>
            { firstPage() }
          </Col>
          <Col>
            { previousPage() }
          </Col>
          <Col>
            <h3>{currentPage + 1}</h3>
          </Col>
          <Col>
            { nextPage() }
          </Col>
          <Col>
            { lastPage() }
          </Col>
        </Row>
      </Container>
      <Container>
        { displayCards() }
      </Container>
      <Container>
        <Row>
          <Col>
            {firstPage()}
          </Col>
          <Col>
            { previousPage() }
          </Col>
          <Col>
            <h3>{currentPage + 1}</h3>
          </Col>
          <Col>
            { nextPage() }
          </Col>
          <Col>
            { lastPage() }
          </Col>
        </Row>
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