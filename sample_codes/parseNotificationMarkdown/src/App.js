import {
  ParseText
} from "@epnsproject/frontend-sdk-staging";
import RedirectImage from './images/resize.svg'
import {  useState } from "react";
import "./App.css";


function App() {
  // create state components to fetch all the notifications.
  const [text, setText] = useState("");
  const gotoReference = () => {
    const referenceURL = "https://github.com/ethereum-push-notification-service/epns-frontend-sdk-staging";
    window.open(referenceURL,"_blank");
  }
  return (
    <div className="App">
      <h2 className="App__header">
          Interactive Markdown Parser 
        <img
          style={{height: "15px", marginLeft: "15px", cursor:"pointer"}}
          alt="" src={RedirectImage}
          onClick={gotoReference}
        />
      </h2>
      <textarea placeholder="Please Enter in your text in markdown format" className="App_textarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>

      <div className="App__textcontent">
        <h3 style={{color: "#DB1081"}} >Parsed Text</h3>
        <ParseText text={text.replaceAll('\\n', "<br />")}/>
      </div>

    </div>
  );
}

export default App;
