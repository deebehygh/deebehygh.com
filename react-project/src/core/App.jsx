import "./css/App.css";
import Main from "./Main";

import { MyBanner } from "./components/Admin/DeeProfile";

export default function App() {
  const reg = () => {
    return (
      <>
        <div class="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <Main />
        </div>
        
      </>
    );
  };
  return (
    reg()
  );
}
