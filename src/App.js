import "./App.css";
import { useState } from "react";

function App() {
  const [word, setWord] = useState("");
  const [dict, setDict] = useState([]);
  const [vbl,setVbl]=useState(false)
  const [err,setErr]=useState(false)
  const findData = () => {
   if(word!==' ' && word){
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.title !== "No Definitions Found") {
        setDict([data]);
        setVbl(true)
        setErr(false)
      } else {
        setErr(true)
        setVbl(false)
      }
    })
    .catch((error) => {
      alert('No Data Found')
    })
   }
   else{
     alert('Please Enter Any Word')
   }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form className="my-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Any Word"
              onChange={(evt) => {
                setWord(evt.target.value);
              }}
            />
            <button
              type="button"
              className="btn btn-warning mt-3"
              onClick={findData}
            >
              Find
            </button>
          </form>
          {
            vbl ? <div className="data ">
            {dict.map((data, i) => {
              return <div key={i} className='p-4 rounded-3 border'>
                <h4>You Searched for: {data[0].word}</h4>
                <p>Meaning: {data[0].meanings[0].definitions[0].definition}</p>
                <p>Example: {data[0].meanings[0].definitions[0].example}</p>
                <audio src={data[0].phonetics[0].audio} controls></audio>
              </div>
            })}
          </div>:err? <div className='p-4 rounded-3 border'>
            <h1>No Data Found</h1>
          </div> :''
          }
        </div>
      </div>
    </div>
  );
}

export default App;
