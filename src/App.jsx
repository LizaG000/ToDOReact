import { Route, Routes } from "react-router-dom";
import Pages from "./pages/task_pages"
function App() {

  return (

    <Routes>
      <Route path="" element={<Pages />} />
    </Routes>

  )

}


export default App