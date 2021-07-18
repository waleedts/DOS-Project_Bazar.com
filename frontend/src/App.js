import './App.css';
import CardUI from "./components/CardUI"
import data from "./services/test-service"

function App() {
  return (
    <div>
      <div className="navbar justify-content-center">
        <input
            type="text"
            id="header-search"
            placeholder="   SEARCH BOOKS"
            name="s"
            className="input"
        />
        <button type="submit" className="btn btn1 btn-outline-success" >Search</button>
      </div>
      <div className="container-fluid d-flex justify-content-between">
          <div className="row">
              {data.cardData.map((item, index) => {
                  return(
                      <div className="col-md-3">
                          <CardUI key={index} title={item.title} index={index}/>
                      </div>
                  )
              })}

          </div>
      </div>
    </div>
  );
}

export default App;
