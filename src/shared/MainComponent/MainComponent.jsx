import Navbar from "../../components/NavBar/Navbar"
import Footer from "../../components/Footer/Footer"
import Intro from "../../components/Intro/Intro";

const MainComponent = ({ children }) => {
    return (
        <>
            <Intro />
            <Navbar />
            { children }
            <Footer />
        </>
    );
}

export default MainComponent;