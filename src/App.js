import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfiniteScroll from './Main';
import DetailPage from "./pages/DetailPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfiniteScroll />} />
        <Route path="/posts/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );

};

export default App;
