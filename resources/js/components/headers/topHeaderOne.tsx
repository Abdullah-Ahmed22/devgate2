import { Link } from "react-router-dom"

const TopHeaderOne = ({ wrapperClass, className }: { wrapperClass?: string, className?: string }) => {
    return (
        <div className={`header-top-section fix ${className}`}>
            <div className="container-fluid">
                <div className={`header-top-wrapper ${wrapperClass}`}>
                    <ul className="contact-list">
                        <li>
                            <i className="far fa-envelope" />
                            <Link to="mailto:info@devgate.co.uk" className="link">info@devgate.co.uk</Link>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone-volume" />
                            <Link to="tel:+2 01066684916">+2 01066684916</Link>
                        </li>
                    </ul>
                    <div className="top-right">
                        <div className="social-icon d-flex align-items-center">
                            <span>Follow Us:</span>
                            <Link to="https://www.facebook.com/share/1KTXVJurgT/"><i className="fab fa-facebook-f" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeaderOne