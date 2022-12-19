import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

const calcData = [
  {id: 'clear', value: 'AC'},
  {id: 'divide', value: '/'},
  {id: 'multiply', value: 'x'},
  {id: 'seven', value: 7},
  {id: 'eight', value: 8},
  {id: 'nine', value: 9},
  {id: 'subtract', value: '-'},
  {id: 'four', value: 4},
  {id: 'five', value: 5},
  {id: 'six', value: 6},
  {id: 'add', value: '+'},
  {id: 'one', value: 1},
  {id: 'two', value: 2},
  {id: 'three', value: 3},
  {id: 'equals', value: '='},
  {id: 'zero', value: 0},
  {id: 'decimal', value: '.'},
] 

const operators = ['AC', '/', 'x', '+', '-', '='] ;

const numbers = [0,1,2,3,4,5,6,7,8,9,10]

const Display = ({input, output}) => { 
return (
<div className='output'>
<span className='result'>{output}</span>
<span id='display' className='input'>{input}</span>
 </div>
)}

const Key = ({ keyData: {id, value}, handleInput}) => { 
return (
<button id={id} onClick={() => handleInput(value)}>
  {value}
</button>
  )}

const Keyboard = ({handleInput}) => {
  return (
  <div className='keys'>
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput}/>))}
      </div>)
}


const App = () =>  {
   
  const [input, setInput] = React.useState('0') ; 
  const [output, setOutput] = React.useState('') ; 
  const [calculator, setCalculator] = React.useState('') ; 
  
  const handleSubmit = () => {
    const total = eval(calculator) 
    setInput(total)
    setOutput(`${total} = ${total}`) ;
    setCalculator(`${total}`)
  } 
  
  const handleClear = () => {
    setInput('0') ; 
    setCalculator('')
  } 
  
  const handleNum = (value) => {
    if (!calculator.length) {
      setInput(`${value}`) ; 
      setCalculator(`${value}`) ; 
    } else { 
    if (value === 0 && (calculator === '0' || input === '0')) {
      setCalculator(`${calculator}`)
    } else {
      const lastChat = calculator.charAt(calculator.length -1) ; 
      const isLast = lastChat === '*' || operators.includes(lastChat) ; 
      
      setInput(isLast ? `${value}` : `${input}${value}`)
      setCalculator (`${calculator}${value}`)
    }}
  } 
  
  const dotOperator = () => {
    const lastChat = calculator.charAt(calculator.length -1) ; 
    if (!calculator.length) { 
    setInput('0.') ; 
    setCalculator('0.') ; 
    }
    else {
      if (lastChat === '*' || operators.includes(lastChat)) { 
      setInput('0.') ; 
      setCalculator(`${calculator} 0.`) ; 
      } else { 
      setInput(
      lastChat === '.' || input.includes('.') ? `${input}` : `${input}.`)
      
      const formattedValue = lastChat === '.' || input.includes('.') ? `${calculator}` : `${calculator}.` ; 
      setCalculator(formattedValue)
      }
    }
  } 
  
  const handleOp = (value) => {
    if (calculator.length) { 
    setInput(`${value}`) ; 
    const beforeLastChat = calculator.charAt(calculator.length -2) ; 
    
    const beforeLastChatOp = operators.includes(beforeLastChat) || beforeLastChat === '*' ; 
      
     const lastChat = calculator.charAt(calculator.length -1) ;
      
      const lastChatIsOp = operators.includes(lastChat) || lastChat === '*' ; 
      
     const validOp = value === 'x' ? '*' : value ; 
     if (
     (lastChatIsOp && value !== '-') || beforeLastChatOp && lastChatIsOp )
    {
      if (beforeLastChatOp) {
        const updateValue = `${calculator.substring(0,
        calculator.length -2 )}${value}` ; 
        setCalculator(updateValue) ; } else { 
        setCalculator(`${calculator.substring(0, calculator.length -1)}${validOp}`) }
      } else {
        setCalculator(`${calculator}${validOp}`)
      }
    }}
  
     
  
  const handleInput = (value) => {
    const number = numbers.find((num) => num === value ) ; 
    const operator = operators.find((op) => op === value)
    
    switch(value) {
      case '=' : 
        handleSubmit() ; 
        break;
      case 'AC': 
        handleClear() ; 
        break ; 
      case number : 
        handleNum(value) ;
        break ; 
      case '.' : 
        dotOperator() ; 
        break ; 
      case operator : 
        handleOp (value) ; 
        break ; 
      default: 
        break ; 
        
        
    }
  }
   const handleOutput = () => {
     setOutput(calculator)
  }
   
 React.useEffect(() => {
   handleOutput() }, [calculator]
 )
  
  return ( 
  <div className='container'>
  <div className='calculator'>
    <Display input={input} output={output} />
     <Keyboard handleInput={handleInput}/>
  </div>
  </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'))