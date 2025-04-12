import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import ManageEvent from './pages/ManageEvent';
import EventDetailsModal from './pages/EventDetailsModal.jsx';
// import RespondEvent from './pages/RespondEvent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/manage" element={<ManageEvent />} />
      <Route path="/manage/details/:id" element={<EventDetailsModal />} />

      {/* <Route path="/manage/details/:eventId" element={<EventDetailsModal />} /> */}

    </Routes>
  );
}

export default App;
