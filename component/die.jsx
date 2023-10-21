import "../src/App.css"
function Die(props) {
    const styles = {
        backgroundColor: props.isHeld?"#59E391":"white"
    }
  return (
    <>
      <div className="dice-face" style={styles} onClick={props.holdDice}>
        <h2 className="dice-value">{props.value}</h2>
      </div>
    </>
  )
}

export default Die
