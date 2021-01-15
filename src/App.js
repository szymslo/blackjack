import "./App.css";
import Header from "./containers/Header";
import Interface from "./containers/Interface";
import Table from "./containers/Table";
import GlobalStateProvider from "./store/GlobalStateProvider";

const App = () => {
  return (
    <GlobalStateProvider>
      <div className="root">
        <Header/>
        <Table/>
        <Interface/>
      </div>
    </GlobalStateProvider>
  );
};

export default App;
