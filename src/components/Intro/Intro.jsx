import './Intro.css'

const Intro = () => {
    const introText = "Welcome To The CSE Club Of JUST";
    const varsity = "Jashore University Of Science and Technology";

    return (
      <>
        <div id="intro">
            <div class="handshake">
            {
                introText.split(' ').map((word, index) => (
                <span className="text" 
                    key={index} 
                    style={{
                        animationDelay: `${index*0.25}s`,
                        animationDuration: !index? '3s':'0s',
                    }}>{word}</span>
                ))
            }
            </div>
            
            <div class="varsity">
            {
                varsity.split('').map((char,index) => (
                <span className="text"
                    key={index}
                    style={{
                        animationDelay: `${index*0.025}s`,
                    }}
                >{char}</span>
    
                ))
    
            } 
            </div>
        </div>
    
      </>
    );
}

export default Intro;