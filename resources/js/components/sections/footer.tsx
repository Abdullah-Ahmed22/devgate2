import { SuCallMessage, SuEmail } from "@/lib/icons";
import { Link } from "react-router-dom";

const contactInfo = [
    {
        icon: <SuCallMessage />,
        label: "Call Us 7/24",
        value: "+2 01066684916",
        link: "tel:+201066684916",
    },
    {
        icon: <SuEmail />,
        label: "Gmail",
        value: "info@devgate.co.uk",
        link: "mailto:info@devgate.co.uk",
    },
];

const Footer = () => {
    return (
        <footer className="footer-section footer-bg">
            <div className="container">
                <div className="contact-info-area">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="contact-info-items wow slideUp"
                            data-delay={`${0.3 + index * 0.2}`}
                        >
                            <div className="icon">{info.icon}</div>
                            <div className="content">
                                <p>{info.label}</p>
                                <h3>
                                    {info.link ? (
                                        <a href={info.link}>{info.value}</a>
                                    ) : (
                                        info.value
                                    )}
                                </h3>
                            </div>
                        </div>
                    ))}
                    <div className="w-[50px]">
                        <a
                            href="https://www.facebook.com/share/1KTXVJurgT/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook-f" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom style-2">
                <div className="container">
                    <div className="footer-wrapper d-flex align-items-center justify-content-between">
                        <p className="wow slideLeft color-2" data-delay=".3">
                            <Link to="contact">© All right reserved,</Link>{" "}
                            <Link to="/" target="_blank">
                                Dev Gate 2019
                            </Link>
                        </p>

                        <div className="d-flex align-items-center gap-4">
                            <ul
                                className="footer-menu wow slideRight d-flex align-items-center gap-3 mb-0"
                                data-delay=".5"
                            >
                                <li>
                                    <Link to="contact">
                                        Terms &amp; Condition
                                    </Link>
                                </li>
                                <li>
                                    <Link to="contact">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <a href="#" id="scrollUp" className="scroll-icon">
                    <i className="fa fa-arrow-up" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
