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
  //state to check what resource type is selected
  const [resourceType, setResourceType] = useState<string>("posts");

  //import fetched data stored to prevent having to refetch new data
  const [postsData, setPostsData] = useState<Array<PostObj>>([]);
  const [commentsData, setCommentsData] = useState<Array<CommentObj>>([]);
  const [photosData, setPhotosData] = useState<Array<PhotoObj>>([]);

  //items sliced based off from current page, maximum amount of card items
  const [postItems, setPostItems] = useState<Array<PostObj>>([]);
  const [commentItems, setCommentItems] = useState<Array<CommentObj>>([]);
  const [photoItems, setPhotoItems] = useState<Array<PhotoObj>>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maximumPages, setMaximumPages] = useState<number>(1);
  const cardMaximum: number = 20;

  //if screensize is less than or equal to 768 set isMobile to true
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;

  //When resourceType is changed, change the displaycards, maximum pages and currently displayed card items.
  useEffect( () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setCurrentPage(0);
    switch(resourceType){
      case "posts": {
        if(postItems.length === 0){
          fetch(`https://jsonplaceholder.typicode.com/${resourceType}`, {signal})
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not OK: ' + response.status);
              }
              return response.json();
            })
            .then((json) => {
              setMaximumPages((Math.floor(json.length / cardMaximum)  - 1));
              setPostsData(json);
              setPostItems(json.slice(0, cardMaximum));
            })
            .catch((error) => {
              if(error.name ==="AbortError"){
                console.error("User cancelled connection request");
              }else{
                console.error('There has been a problem with your fetch operation:', error.name);
                setMaximumPages(0);
              }
            });
        } else{
            setMaximumPages((Math.floor(postsData.length / cardMaximum)  - 1));
        }
        break;
      }
      case "comments": {
        if(commentItems.length === 0){
          fetch(`https://jsonplaceholder.typicode.com/${resourceType}`, {signal})
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not OK: ' + response.status);
              }
              return response.json();
            })
            .then((json) => {
              setMaximumPages((Math.floor(json.length / cardMaximum)  - 1));
              setCommentsData(json);
              setCommentItems(json.slice(0, cardMaximum));
            })
            .catch((error) => {
              if(error.name ==="AbortError"){
                console.error("User cancelled connection request");
              }else{
                console.error('There has been a problem with your fetch operation:', error.name);
                setMaximumPages(0);
              }
            });
        } else{
          setMaximumPages((Math.floor(commentsData.length / cardMaximum)  - 1));
        }
        break;
      }
      case "photos": {
        if(photoItems.length === 0){
          fetch(`https://jsonplaceholder.typicode.com/${resourceType}`, {signal})
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not OK: ' + response.status);
              }
              return response.json();
            })
            .then((json) => {
              setMaximumPages((Math.floor(json.length / cardMaximum)  - 1));
              setPhotosData(json);
              setPhotoItems(json.slice(0 , cardMaximum));
            })
            .catch((error) => {
              if(error.name ==="AbortError"){
                console.error("User cancelled connection request");
              }else{
              console.error('There has been a problem with your fetch operation:', error.name);
              setMaximumPages(0);
              }
            });
        } else{
            setMaximumPages((Math.floor(photosData.length / cardMaximum)  - 1));
        }
        break;
      }
    }
    
    return ()=>{
      controller.abort();
    }
  }, [resourceType, maximumPages]); // eslint-disable-line react-hooks/exhaustive-deps

  //When current page is changed, change currently displayed item cards to reflect the current page.
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
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  //check if screen size is for mobile.
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  //return first page button. if the current page is less than or equal to 0, disable it.
  function firstPage(){
    return (
      <Button
        variant='secondary'
        disabled={currentPage <= 0 ? true : false} 
        onClick={() => setCurrentPage(prevCurrentPage => 0)}>
          {isMobile? '<<' : 'First Page'}
      </Button>
    )
  }
  //return the last page button.  if the current page is within the last 10 pages of posts, disable it.
  function lastPage(){
    return (
      <Button 
        variant='secondary'
        disabled={currentPage >= maximumPages ? true : false} 
        onClick={() => setCurrentPage(prevCurrentPage => maximumPages)}>
          {isMobile? '>>' : 'Last Page'}
      </Button>
    )
  }
  //return previous page button. if the current page is less than or equal to 0, disable it.
  function previousPage(){
    return (
      <Button
        variant='secondary'
        disabled={currentPage <= 0 ? true : false} 
        onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage - 1)}>
          {isMobile? '<' : 'Prev Page'}
      </Button>
    )
    
  }
  //return next page button. if the current page is within the last 10 pages of posts, disable it.
  function nextPage(){
    return (
      <Button
        variant='secondary'
        disabled={currentPage >= maximumPages ? true : false} 
        onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage + 1)}>
          {isMobile? '>' : 'Next Page'}
      </Button>
    )
    
  }

  //return the blog page navigation
  function pageNav(){
    return (
      <Container fluid>
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
    )
  }

   //return the item cards to display
  function displayCards(){
    switch(resourceType){
      case "posts": {
        return (postItems.map(item => {
          return displayPost(item);
        }))
      }
      case "comments": {
        return (commentItems.map(item => {
          return displayComment(item);
        }))
      }
      case "photos": {
        return (photoItems.map(item => {
          return displayPhoto(item);
        }))
      }
    } 
  } 

  return (
    <Container className="container-fluid text-center">
      <div>
        <Button className='m-2' onClick={() => setResourceType('posts')}>Posts</Button>
        <Button className='m-2' onClick={() => setResourceType('photos')}>Photos</Button>
        <Button className='m-2' onClick={() => setResourceType('comments')}>Comments</Button>
      </div>
      <h2>{resourceType}</h2>
      { pageNav() }
      <Container fluid="sm">
        <Row xs={1} sm={1} md={2} lg={3} xl={4} >
        { displayCards() }
        </Row>
      </Container>
       { pageNav() }
    </Container>
  );
}




function displayPost(item: PostObj){
    return(
      <Col className='my-2' key={item.id.toString()}>
        <Card className='m-auto h-100' style={{ width: 'auto' }}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{item.userId}</Card.Subtitle>
            <Card.Text>
              {item.body}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">{item.id}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    );
}

function displayComment(item: CommentObj){
  return(
    <Col className='my-2' key={item.id.toString()}>
      <Card className='m-auto h-100' style={{ width: 'auto' }} >
        <Card.Body >
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.email}</Card.Subtitle>
          <Card.Text>
            {item.body}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{item.id}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}

function displayPhoto(item: PhotoObj){
  return(
    <Col className='my-2' key={item.id.toString()}>
      <Card className='m-auto h-100' style={{ width: 'auto' }}>
        <Card.Img variant="top" src={item.thumbnailUrl} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.albumId}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{item.id}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}