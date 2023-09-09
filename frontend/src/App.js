/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen"; 
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SetReminderScreen from "./screens/setReminderScreen";

import ModifyReminderScreen from "./screens/modifyReminderScreen";
import DisableReminderScreen from "./screens/disableReminderScreen";
import EnableReminderScreen from "./screens/enableReminderScreen";
import DeleteReminderScreen from "./screens/deleteReminderScreen";
import ViewRemindersScreen from "./screens/viewReminderScreen";

function App() {
  return (
    <Router>
      
       <Container>
        <main className="py-3">
          <Route path="/home" component={HomeScreen} />

          <Route path="/login" component={LoginScreen} />
          <Route exact path="/" component={LoginScreen} />

          <Route path="/register" component={RegisterScreen} />
 
          <Route path="/setreminder" component={SetReminderScreen} />
          <Route path="/modifyreminder" component={ModifyReminderScreen} />
          <Route path="/disablereminder" component={DisableReminderScreen} />

          <Route path="/enablereminder" component={EnableReminderScreen} />
          <Route path="/deletereminder" component={DeleteReminderScreen} />
          <Route path="/viewreminder" component={ViewRemindersScreen} />

        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
