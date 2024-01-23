import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/profil";
import Chat from "../../pages/Chat";
import NotesPage from "../../pages/NotesPage";
import Main from "../../pages/Main";
import Emails from "../emails/Emails";
import ViewEmail from "../emails/ViewEmail";
import Notes from "../note/Notes";
import Landing from "../../pages/Landing";


const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/email/*" element={<Main />}>
        <Route
                index // This makes this route the default child route
                element={<Navigate to="inbox" replace />} // Redirect to /email/inbox
              />
          <Route
            path="bin"
            element={
              <Emails
                openDrawer={true}
                mailboxEndpoint="api/email/bin"
              />
            }
          />
          <Route
            path="inbox"
            element={
              <Emails openDrawer={true} mailboxEndpoint="api/email/inbox" />
            }
          />
          <Route
            path="sent"
            element={
              <Emails
                openDrawer={true}
                mailboxEndpoint="api/email/sent"
              />
            }
          />

          <Route
            path="starred"
            element={
              <Emails
                openDrawer={true}
                mailboxEndpoint="api/email/starred"
              />
            }
          />
          <Route path="view" element={<ViewEmail openDrawer={true} />} />
        </Route>
        <Route path="/profil" element={<Profil />} />
        <Route path="/chat" element={<Chat />} />
        
        <Route path="/contact" element={<Chat />} />
        <Route path="/note/*" element={<NotesPage/>}>
        <Route
                index // This makes this route the default child route
                element={<Navigate to="notes" replace />} // Redirect to /email/inbox
              />
          <Route
            path="notes"
            element={
              <Notes
                openDrawer={true}
                notesEndpoint="api/note/notes"
              />
            }
          />
          <Route
            path="archived"
            element={
              <Notes openDrawer={true} notesEndpoint="api/note/archived" />
            }
          />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default index;
