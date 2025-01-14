import { useEffect, useState } from "react";
import "./Intro.css";

const Intro = () => {
    const [showIntro, setShowIntro] = useState(() => {
        return sessionStorage.getItem("introShown") !== "true"; // Check if already shown
    });

    useEffect(() => {
        if (showIntro) {
            sessionStorage.setItem("introShown", "true"); // Mark as shown for this session
        }
    }, [showIntro]);

    if (!showIntro) return null; // Don't render if already shown in this tab

    const introText = "Welcome To The CSE Club Of JUST";
    const varsity = "Jashore University Of Science and Technology";

    return (
        <div id="intro">
            <div className="handshake">
                {introText.split(" ").map((word, index) => (
                    <span className="text" key={index} style={{ animationDelay: `${index * 0.25}s` }}>
                        {word}
                    </span>
                ))}
            </div>
            <div className="varsity">
                {varsity.split("").map((char, index) => (
                    <span className="text" key={index} style={{ animationDelay: `${index * 0.025}s` }}>
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Intro;