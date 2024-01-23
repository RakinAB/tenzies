export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const renderDots = () => {
        const dot = '\u2022'
        const dots = [];

        for (let i = 0; i < props.value; i++) {
            dots.push(<div key={i}>{dot}</div>);
          }
      
          return dots;
    }

    return(
        <button 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <div className="die-num">{renderDots()}</div>
        </button>
    )
}