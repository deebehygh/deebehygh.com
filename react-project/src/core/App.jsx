import "./css/App.css";
import Main from "./Main";

import { MyBanner } from "./components/DeeProfile";

export default function App() {
  const reg = () => {
    return (
      <>
        <div className="bg">
          <MyBanner />
          <Main />
        </div>
      </>
    );
  };
  return (
      reg()
  );
}
