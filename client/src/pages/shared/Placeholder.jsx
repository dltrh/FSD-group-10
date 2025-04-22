import boredCat from "../../assets/error/bored-cat.gif";
import "../../css/placeholder-error.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
export default function Placeholder() {
    return (
        <div>
            <Header />
            <div className="placeholder-page">
                <img className="bored-cat" src={boredCat} alt="Error icon" />
                <div className="placeholder-page-message">
                    <h1>Whoops! Our Developer Is Still Coding... 🧑‍💻</h1>
                    <p>
                        It looks like this page is still under construction. Our
                        developer is hard at work, probably fueled by coffee and
                        sheer determination, to bring you this page. In the
                        meantime:{" "}
                    </p>
                    <ul>
                        <li>
                            <p>
                                Return to the <Link to="/">homepage</Link> and
                                check out what’s already ready.
                            </p>
                        </li>
                        <li>
                            <p>
                                Check back later — we promise, it’ll be worth
                                the wait!
                            </p>
                        </li>
                    </ul>
                    <p>
                        Thanks for your patience, and sorry for the
                        inconvenience! We’ll get there... eventually.
                    </p>
                </div>
            </div>
        </div>
    );
}
