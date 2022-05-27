import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Video from "./Videos";
function App() {
  const [data,setData] = useState([])
  const [loading, setloading] = useState(false);
  const getData = async ()=>{
    try{
      setloading(true);
      const {data} = await axios.get('http://localhost:8080/data')
      setData(data)
      setloading(false);
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data])
  

  useEffect(()=>{
  getData();
  },[])

  return (
    <>
    {
      loading ?
      <h4>Loading</h4>
      :
    
      <Router>
        <Routes>
          <Route path="/" element={<Home data={data} setData= {setData}/>}/>
          <Route path="/videos" element={<Video data={data} setData= {setData}/>}/>
        </Routes>
      </Router>
}
    </>
  );
}

export default App;
