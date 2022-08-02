import './App.css';
import React,{ useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [spaceBarEnter, setSpaceBarEnter] = React.useState(0);
  const [suggestions, setSuggestions] = React.useState([]);

  const getTransliteration =(val)=>{
    let arr = val.split(' ')
    val = arr[arr.length-1]
    if(val ==='.'){
      arr[arr.length-1]='|'
      return;
    }
    const url = `https://inputtools.google.com/request?text=${val}&itc=hi-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
    fetch(url).then((response) => response.json())
              .then(function(data) {
                let arr = inputValue.split(' ');
                //console.log(data)
                setSuggestions(data[1][0][1]);
                arr[arr.length-1] = data[1][0][1][0];
                setInputValue(arr.join(' ')+' ');
              })
              .catch((error) => console.log(error));
  };

  useEffect(()=> {
    if(spaceBarEnter===1){
      getTransliteration(inputValue);
      setSpaceBarEnter(0);
    }
  }, [spaceBarEnter,getTransliteration,inputValue])

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(()=>{
    document.getElementById("textbox").addEventListener("input",handleKeyPress);
  },[])

  const handleKeyPress = (e) => {
    var keyCode = e.keyCode || e.which;
     if (keyCode === 0 || keyCode === 229) { 
         keyCode = e.target.value.charAt(e.target.selectionStart - 1).charCodeAt();             
     }
    //console.log(keyCode)
    if (keyCode === " "
    ){
      setSpaceBarEnter(1);
    }
  }

  const clickHandler = (event, val) =>{
    let arr = inputValue.split(' ');
    //console.log(arr)
    //console.log(arr.length-2)
    arr[arr.length-2] = suggestions[val];
    setInputValue(arr.join(' '));
  }

  return (
    <div className="App">
      <header className="App-header">
          <div className='buttonGroup'>
            <button className='button' onClick={event => clickHandler(event,0)}>{suggestions[0]}</button>
            <button className='button' onClick={event => clickHandler(event,1)}>{suggestions[1]}</button>
            <button className='button' onClick={event => clickHandler(event,2)}>{suggestions[2]}</button>
            <button className='button' onClick={event => clickHandler(event,3)}>{suggestions[3]}</button>
            <button className='button' onClick={event => clickHandler(event,4)}>{suggestions[4]}</button>
          </div>
          <textarea
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            //onKeyDown={handleKeyPress}
            id = "textbox"
          />
      </header>
    </div>
  );
}

export default App;
