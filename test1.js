import React from "react";
import ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";
import firebase from "firebase/app"; // Import Firebase
import "firebase/auth"; // Import Firebase authentication
import "firebase/firestore"; // Import Firestore (if needed)

const { Alert, Card } = ReactBootstrap;

// Initialize Firebase (make sure you've set up your Firebase project)
const firebaseConfig = {
  apiKey: "AIzaSyAn8UuEhjO2sQb_dymmSG4VNLgBYaB3KFg",
  authDomain: "web2566-b9f10.firebaseapp.com",
  projectId: "web2566-b9f10",
  storageBucket: "web2566-b9f10.appspot.com",
  messagingSenderId: "214447153147",
  appId: "1:214447153147:web:da0765cfcebeabc134b55e",
  measurementId: "G-BHJZYR2BLZ",
};
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  title = (
    <Alert variant="info">
      <b>Work6:</b> Firebase
    </Alert>
  );

  footer = (
    <div>
      By 643021216-0 Kanlayani Sonsing <br />
      College of Computing, Khon Kaen University
    </div>
  );

  state = {
    scene: 0,
    students: [],
    stdid: "",
    stdtitle: "",
    stdfname: "",
    stdlname: "",
    stdemail: "",
    stdphone: "",
    email: "", // New state for login
    password: "", // New state for login
  };

  componentDidMount() {
    // Fetch data from Firestore collection 'students'
    const db = firebase.firestore();
    db.collection("students")
      .get()
      .then((querySnapshot) => {
        const stdlist = [];
        querySnapshot.forEach((doc) => {
          stdlist.push({ id: doc.id, ...doc.data() });
        });
        console.log(stdlist);
        this.setState({ students: stdlist });
      });
  }

  handleLogin = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
      // Redirect or handle successful login
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  render() {
    return (
      <div>
        {this.state.scene === 0 ? (
          <div>
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <button onClick={this.handleLogin}>Log In</button>
          </div>
        ) : (
          <Card>
            <Card.Header>{this.title}</Card.Header>
            <Card.Body>
              <Button onClick={() => this.readData()}>Read Data</Button>
              <Button onClick={() => this.autoRead()}>Auto Read</Button>
              <Button onClick={() => this.autoLogin()}>Login</Button>
              <div>
                <StudentTable data={this.state.students} app={this} />
              </div>
            </Card.Body>
            <Card.Footer>{this.footer}</Card.Footer>
          </Card>
        )}
      </div>
    );
  }
}

// Render the App component
const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
