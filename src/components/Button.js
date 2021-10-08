const Button = (props) => {
  return <button onClick={ props.onShow } style={{backgroundColor: props.color, color: 'white'}}  className='btn'> {props.text} </button>
}

export default Button