import './App.css';
import React,{ useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [spaceBarEnter, setSpaceBarEnter] = React.useState(0);

  const getTransliteration =(val)=>{
    let arr = val.split(' ')
    val = arr[arr.length-1]
    if(val ==='.'){
      return;
    }
    const url = `https://inputtools.google.com/request?text=${val}&itc=hi-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
    fetch(url).then((response) => response.json())
              .then(function(data) {
                let arr = inputValue.split(' ');
                console.log(data)
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

  const handleKeyPress = (e) => {
    console.log(e.key)
    if (e.key === " " ||
      e.code === "Space" ||      
      e.keyCode === 32   ||
      e.code === "Enter"
    ){
      setSpaceBarEnter(1);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <textarea
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className = "textbox"
          />
      </header>
    </div>
  );
}

export default App;
