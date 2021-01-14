import "./App.css";
import Header from "./containers/Header";
import Interface from "./containers/Interface";
import Table from "./containers/Table";

const App = () => {
  return (
    <div className="root">
      <Header/>
      <Table/>
      <Interface/>
    </div>
  );
};

export default App;
