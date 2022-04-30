import React, { useState } from 'react'

function App() {
  return (
    <Table />
  );
}

function Table() {
  const [headlines, setHeadlines] = useState([])
  const [values, setValues] = useState(new Map())

  function replaceElement(arr, i, el) {
    let newArr = [...arr];
    newArr[i] = el;
    return newArr;
  }

  return <>
    <InputHeadline setHeadlines={setHeadlines} headlines={headlines} />
    <table border="1">
      <tr><th></th>{headlines.map((element) =>
        (<th>{element}</th>)
      )}</tr>
      {headlines.map((element, y) => (<tr>
        <th>{element}</th>{
          replaceElement([...headlines.keys()].map(x => <th>{<InputValue x={x} y={y} values={values} setValues={setValues} />}</th>), y, <th>-</th>)
        }
      </tr>))}
    </table>
    <PathFinder headlines={headlines} values={values} />
  </>
}

function InputHeadline(props) {
    return <form onSubmit={(e) => {
      var val = e.target[0].value;
      alert(val)
      e.preventDefault()
      e.target.reset()
      props.setHeadlines([...props.headlines, val])
    }}>
      <label>
        Headline:
        <input />
      </label>
      <input type="submit" value="Send" />
    </form>
    
}

function InputValue(props) {
  const key = [props.x, props.y].sort((a, b) => a - b).reduce((a, b) => a + b, '')
    return <form onSubmit={(e) => {
      var val = parseInt(e.target[0].value)
      e.preventDefault()
      e.target.reset()
      if (isNaN(val)) {
        alert("You didn't enter a number")
        return
      }
      alert(key)
      alert(val)
      const newValues = new Map(props.values)
      newValues.set(key, val)
      props.setValues(newValues)
    }}>
      <label>
        <input type="text" placeholder={props.values?.get(key)} />
      </label>
    </form>
}

function PathFinder(props) { 
  const [distation, setDistation] = useState(0)
  function shortestDistation(point1, point2) {
    if(point1 === point2) return 0
    function getMin(path, prevPoint, alreadyVisited, ultimate, dist) {
      if(path.includes(ultimate)) return dist      
      else {
        var nextPoint = path.replace(prevPoint, '')
        var results = [...props.values].filter(([k, _]) => k.includes(nextPoint) && !alreadyVisited.includes(k))
                      .map(([path, dist1]) => getMin(path, nextPoint, [...alreadyVisited, path], ultimate, dist + dist1))
        return results === [] ? 0 : Math.min(...results)
      } 
    }
    var results = [...props.values].filter(([path, _]) => path.includes(point1)).map(([path, dist]) => getMin(path, point1, [path], point2, dist))
    return results === [] ? 0 : Math.min(...results)
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDistation(shortestDistation(e.target[0].value, e.target[1].value + ""));
        }}
      >
        <p>Shortest distance from</p>
        <select size={props.headlines.size} name="headline1">
          <option disabled>Choose headline</option>
          {props.headlines.map((element, i) => (
            <option value={i}>{element}</option>
          ))}
        </select>
        <p>until</p>
        <select size={props.headlines.size} name="headline2">
          <option disabled>Choose headline</option>
          {props.headlines.map((element, i) => (
            <option value={i}>{element}</option>
          ))}
        </select>
        <input type="submit" value="Find" />
      </form>
      <h3>{distation}</h3>
    </>
  );
}

export default App;
