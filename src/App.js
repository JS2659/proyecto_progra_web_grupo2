import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-sm-12 col-lg-8 mx-auto">
          <h1>TO DO LIST</h1>
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <button>agregar</button>
              </div>
              <div className="col-6">
                <button>filtro</button>
              </div>
              <div className="row cuerpoTabla">
                <div className="col-8">
                  <div className="container">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      ></input>
                      <label class="form-check-label" for="flexCheckChecked">
                        Checked checkbox
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
