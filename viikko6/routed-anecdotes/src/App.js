import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { 
  ListGroup, ListGroupItem, Alert, Grid, Row, Col, Image, 
  FormGroup, FormControl, ControlLabel, Button,
  Nav, Navbar, NavItem
} from 'react-bootstrap'

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} vote{anecdote.votes === 1 ? '' : 's'}</p>
    {anecdote.url ?
      <p>for more info see <a href="{anecdote.url}">{anecdote.url}</a></p> : null}
  </div>    
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id}>
          <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
        </ListGroupItem>
      )}
    </ListGroup>  
  </div>
)

const About = () => (
  <Grid>
    <Row className="show-grid">
      <Col xs={6} md={6}>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col xs={4} md={4}>
        <Image src="https://pbs.twimg.com/profile_images/1152859879/kuva_400x400.jpg" responsive circle />
      </Col>
    </Row>
  </Grid>
)

const Notification = ({ notification }) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '16',
    padding: '5px',
    borderRadius: '10px',
    border: '2px solid green',
    display: notification ? '' : 'none'
  }

  return notification ? (
    <Alert color="success">
      {notification}
    </Alert>
  ) : null
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content</ControlLabel> 
            <FormControl 
              type='text'
              name='content' 
              value={this.state.content} 
              onChange={this.handleChange} 
            />
            <ControlLabel>author</ControlLabel>
            <FormControl
              type='text' 
              name='author' 
              value={this.state.author} 
              onChange={this.handleChange} 
            />
            <ControlLabel>url for more info</ControlLabel>
            <FormControl
              type='text' 
              name='info' 
              value={this.state.info} 
              onChange={this.handleChange} 
            />
            <Button bsStyle='success' type='submit'>create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} added` 
    })
    setTimeout(() => this.setState({ notification: null }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  
  render() {
    const menuStyle = {
      background: 'lightBlue',
      padding: '10px'
    }

    const activeLinkStyle = {
      background: 'grey',
      padding: '5px'
    }
    const linkStyle = {

    }

    return (
      <div className='container'>
        <Router>
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header> 
                <Navbar.Brand>
                  Software anecdotes
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>

              <Navbar.Collapse>
                <Nav>
                  <NavItem href="#">
                    <NavLink to="/">anecdotes</NavLink>
                  </NavItem>
                  <NavItem href="#">
                    <NavLink to="/create">create new</NavLink>
                  </NavItem>
                  <NavItem href="#">
                    <NavLink to="/about">about</NavLink>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>

            </Navbar>

            <Route exact path="/" render={() => 
              <AnecdoteList anecdotes={this.state.anecdotes} />} 
            />
            <Route exact path="/anecdotes/:id" render={({match}) => 
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />} 
            />
            <Route path="/create" render={({history}) => 
              <CreateNew history={history} addNew={this.addNew} />} 
            />
            <Route path="/about" render={() => <About />} />

            <Notification notification={this.state.notification} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}


export default App;
