import React, { Component } from "react";
import HeaderWeb from "../components/HeaderWeb";
import Footer from "../components/Footer";
import { authHeader } from '../helpers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RenameGroupButton from "../components/RenameGroupButton";
import SearchBar from "../components/SearchBar"
import WordContent from "../components/WordContent"

class WordItem extends Component {

  constructor(props) {
    super(props);
    if (!authenticationService.currentUserValue) {
      window.alert("You must login");
      window.location.href = '/'
    }
    this.childContent = React.createRef();
  }

  updateContent = (newContent) => {
    this.childContent.current.updateContent(newContent);
  };

  state = {
    show: false,
  }

  setShow(boolean) {
    this.setState({
      show: boolean
    })
  }

  componentDidUpdate() {
    this.childContent.current.updateContent(this.props.wordName);
  }


  handleClose = () => this.setShow(false);
  handleShow = () => this.setShow(true);

  render() {
    return (
      <>
        <ListItem button onClick={this.handleShow}>
          <ListItemText primary={this.props.wordName} />
        </ListItem>

        <Modal show={this.state.show} onHide={this.handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.wordName}</Modal.Title>
          </Modal.Header>
          <Modal.Body scrollable={true}>
            <WordContent ref={this.childContent} style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'scroll'}}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Delete from Group
          </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  }

}

class WordGroupPage extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    name: "",
    wordIds: [],
    words: [],
  }

  getData = async () => {
    try {
      const result = await fetch(`http://localhost:3001/api/wordGroups/${this.props.match.params.wordGroupId}`, {
        method: 'GET',
        headers: authHeader(),
        credentials: 'include',
      }).then((res) => { return res.json(); })
      if (result.wGroup) {
        this.setState({
          name: result.wGroup.name,
          wordIds: result.wGroup.wordIds,
          words: result.words,
        });
        console.log(result.words);
      }
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  addNewWord = async (wordToAdd) => {
    try {
      const result = await fetch(`http://localhost:3001/api/wordByName/${wordToAdd}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((res) => {
        return res.json();
      });
      console.log(result);
      if (result.success) {
        try {
          const addResult = await fetch(`http://localhost:3001/api/wordGroups/${this.props.match.params.wordGroupId}/words/${result.data._id}`, {
            method: 'PUT',
            headers: authHeader(),
            credentials: 'include',
          }).then((res) => { return res.json; });
          this.getData();
        }
        catch (error) {
          window.alert(error.message);
        }
      }
      else {
        window.alert(result.message);
      }

    }
    catch (error) {
      window.alert(error.message);
    }
  }

  handleDelete = async () => {
    try {
      const result = await fetch(`http://localhost:3001/api/wordGroups/${this.props.match.params.wordGroupId}`, {
        method: 'DELETE',
        headers: authHeader(),
        credentials: 'include',
      }).then((res) => { return res.json(); })
      console.log(result);
      if (!result) {
        console.log("Word Group has been deleted");
        window.location.href('/learning')
      }
      else {
        console.log("Can't delete");
      }
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div>

        <HeaderWeb></HeaderWeb>
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <List component="nav">
                <ListItem>
                  <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <Divider />
                <ListItem>
                  <Button variant="primary" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </ListItem>
                <ListItem>
                  <RenameGroupButton id={this.props.match.params.wordGroupId} resetData={this.getData} oldTitle={this.state.name}></RenameGroupButton>
                </ListItem>
                <ListItem>
                  <Button variant="primary" onClick={()=>{window.location.href = `/learnGroup/${this.props.match.params.wordGroupId}`}}>
                    Learn this Group
                  </Button>
                </ListItem>

              </List>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col-10 offset-2 offset-md-0">
                  <h1 style={{ textAlign: "left" }}>{this.state.name}</h1>
                </div>
              </div>
              <div className="row">
                <SearchBar parentCallBack={this.addNewWord}></SearchBar>
              </div>
              <div className="row">
                <h3 style={{ textAlign: "left" }}>Word List</h3>
              </div>
              <div className="row d-flex flex-row justify-content-start" >
                <List style={{ maxHeight: "500px" }, { overflow: "scroll" }, {WebkitOverflowScrolling: "touch"}}>
                  {this.state.words.map((value, index) => {
                    return (
                      <WordItem wordName={value.word}></WordItem>
                    )
                  })}
                </List>
              </div>
            </div>
          </div>

        </div>
        <Footer></Footer>

      </div>);
  }
}

export default WordGroupPage;