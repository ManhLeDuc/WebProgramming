import React, { Component } from "react";
import HeaderWeb from "../components/HeaderWeb";
import Footer from "../components/Footer";
import { authHeader } from '../helpers';
import { authenticationService } from '../services/authentication.service'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import RenameGroupButton from "../components/RenameGroupButton"



function AddGroupButton(props) {
  const [show, setShow] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => { setInput(event.target.value) }
  const handleSubmit = async () => {
    if (input === "") {
      return;
    }
    try {
      const result = await fetch(`http://localhost:3001/api/wordGroups`, {
        method: 'PUT',
        headers: authHeader(),
        credentials: 'include',
        body: JSON.stringify({
          name: input
        }),
      }).then((res) => { return res.json(); })
      if (result._id) {
        props.resetData();
        handleClose();
      }
      else {
        window.alert("Error Creating Word Group");
      }
      console.log(result);

    }
    catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <>
      <ListItem button onClick={handleShow}>
        <ListItemText primary="Add new Group" />
      </ListItem>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder="Group Word Name"
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


class WordGroup extends Component {

  handleOnClick = () => {
    window.location.href = `/wordGroups/${this.props.id}`
  }

  render() {
    return (
      <div className="col-lg-6 col-md-11">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title " style={{ textAlign: "left" }}>{this.props.title}</h5>
            <div className="d-flex justify-content-around">
              <RenameGroupButton id={this.props.id} resetData={this.props.resetData} oldTitle={this.props.title}></RenameGroupButton>
              <ListItem button onClick={this.handleOnClick}>
                <ListItemText primary="Show Detail" />
              </ListItem>
            </div>
          </div>
        </div>
      </div>

    );
  };
}

class LearningPage extends Component {

  constructor(props) {
    super(props);
    if (!authenticationService.currentUserValue) {
      window.alert("You must login");
      window.location.href = '/'
    }
    this.state = {
      wordGroups: [],
    }
  }

  getData = async () => {
    try {
      const result = await fetch(`http://localhost:3001/api/wordGroups`, {
        method: 'GET',
        headers: authHeader(),
        credentials: 'include',
      }).then((res) => {
        return res.json();
      })
      this.setState({
        wordGroups: result
      });
      console.log(this.state.wordGroups);
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

                <AddGroupButton resetData={this.getData}></AddGroupButton>

              </List>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col-10 offset-2 offset-md-0">
                  <h1 style={{ textAlign: "left" }}>All Word Groups</h1>
                </div>
              </div>
              <div className="row  justify-content-start" style={{ maxHeight: "500px", overflowY: "scroll" }}>
                {this.state.wordGroups.map((value, index) => {
                  return (
                    <WordGroup id={value._id} title={value.name} resetData={this.getData}></WordGroup>
                  )
                })}

              </div>
            </div>
          </div>

        </div>
        <Footer></Footer>

      </div>);
  }
}

export default LearningPage;
