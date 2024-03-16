const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;

function TextInput({ label, app, value, style }) {
  return (
    <label className="form-label">
      {label}:
      <input
        className="form-control"
        style={style}
        value={app.state[value]}
        onChange={(ev) => {
          var s = {};
          s[value] = ev.target.value;
          app.setState(s);
        }}
      ></input>
    </label>
  );
}

function EditButton({ std, app }) {
  return <button onClick={() => app.edit(std)}>แก้ไข</button>;
}

function DeleteButton({ std, app }) {
  return <button onClick={() => app.delete(std)}>ลบ</button>;
}


function StudentTable({ data, app }) {
  return (
    <table className="table">
      <tr>
        <td>รหัส</td>
        <td>คำนำหน้า</td>
        <td>ชื่อ</td>
        <td>สกุล</td>
        <td>email</td>
      </tr>
      {data.map((s) => (
        <tr key={s.id}>
          <td>{s.id}</td>
          <td>{s.title}</td>
          <td>{s.fname}</td>
          <td>{s.lname}</td>
          <td>{s.email}</td>
          <td>
            <EditButton std={s} app={app} />
          </td>
          <td>
            <DeleteButton std={s} app={app} />
          </td>
        </tr>
      ))}
    </table>
  );
}

class App extends React.Component {
  
  title = (
    <Alert variant="info">
      <b>Work6 :</b> Firebase
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
  };

  readData() {
    db.collection("students")
      .get()
      .then((querySnapshot) => {
        var stdlist = [];
        querySnapshot.forEach((doc) => {
          stdlist.push({ id: doc.id, ...doc.data() });
        });
        console.log(stdlist);
        this.setState({ students: stdlist });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  insertData() {
    db.collection("students").doc(this.state.stdid).set({
      title: this.state.stdtitle,
      fname: this.state.stdfname,
      lname: this.state.stdlname,
      phone: this.state.stdphone,
      email: this.state.stdemail,
    });
  }

  edit(std) {
    this.setState({
      stdid: std.id,
      stdtitle: std.title,
      stdfname: std.fname,
      stdlname: std.lname,
      stdemail: std.email,
      stdphone: std.phone,
    });
  }

  delete(std) {
    if (window.confirm("ต้องการลบข้อมูล")) {
      db.collection("students").doc(std.id).delete();
    }
  }

  render() {
    return (
      <Card>
        <Card.Header>{this.title}</Card.Header>
        <Card.Body>
          <Button onClick={() => this.readData()}>Read Data</Button>
          <Button onClick={() => this.autoRead()}>Auto Read</Button>
          <Button onClick={() => this.google_login()}>Login</Button>
          <Button onClick={() => this.google_logout()}>LogOut</Button>
          <div>
            <StudentTable data={this.state.students} app={this} />
          </div>
        </Card.Body>
        <Card.Footer>
          <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b>
          <br />
          <TextInput
            label="ID"
            app={this}
            value="stdid"
            style={{ width: 120 }}
          />
          <TextInput
            label="คำนำหน้า"
            app={this}
            value="stdtitle"
            style={{ width: 100 }}
          />
          <TextInput
            label="ชื่อ"
            app={this}
            value="stdfname"
            style={{ width: 120 }}
          />
          <TextInput
            label="สกุล"
            app={this}
            value="stdlname"
            style={{ width: 120 }}
          />
          <TextInput
            label="Email"
            app={this}
            value="stdemail"
            style={{ width: 150 }}
          />
          <TextInput
            label="Phone"
            app={this}
            value="stdphone"
            style={{ width: 120 }}
          />
          <Button onClick={() => this.insertData()}>Save</Button>
        </Card.Footer>
        <Card.Footer>{this.footer}</Card.Footer>
      </Card>
    );
  }

  google_login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Handle successful login, you may want to redirect or update UI accordingly
        console.log("User logged in successfully:", result.user);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error logging in:", error);
      });
  }
  google_logout() {
    if (confirm("Are you sure?")) {
      firebase.auth().signOut();
    }
  }
  google_logout = () => {
    if (window.confirm("Are you sure?")) {
      firebase.auth().signOut()
        .then(() => {
          // Handle successful logout, you may want to redirect or update UI accordingly
          console.log("User logged out successfully");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error logging out:", error);
        });
    }
  }
  
}

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
const db = firebase.firestore();


const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
