import * as React from "react";
import TopNavBar from "./components/Navigation/topNavBar";
import SideNavBar from "./components/Navigation/sideNavBar";

function App() {
  return (
      <div className={"h-screen flex flex-col"}>
        <TopNavBar/>
        <SideNavBar/>
      </div>
  )
}

export default App;
