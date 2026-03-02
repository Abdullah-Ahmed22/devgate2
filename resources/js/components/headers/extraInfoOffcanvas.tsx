import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenuList from "./mobileNavBar";
import LogoutButton from "@/pages/LogoutButton";

interface Props {
  isInfoOpen: boolean;
  setIsInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExtraInfoOffcanvas = ({
  isInfoOpen,
  setIsInfoOpen,
}: Props) => {
    
const toggleOffcanvas = () => {
  setIsInfoOpen(prev => !prev);
};



      const token = localStorage.getItem("token");

    return (
        <>
            <div className="sidebar__toggle" onClick={toggleOffcanvas}>
                <i className="fas fa-bars" />
            </div>
            <div className="fix-area">
                <div
                    className={`offcanvas__info ${isInfoOpen ? "info-open" : ""}`}
                >
                    <div className="offcanvas__wrapper">
                        <div className="offcanvas__content">
                            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                                <div className="offcanvas__logo">
                                    <Link to="/">
                                        <img
                                            src="/img/hero/cropped-web-1.webp"
                                            alt="logo-img"
                                        />
                                    </Link>
                                </div>
                                <div className=" offcanvas__close">
                                    <button
                                        onClick={toggleOffcanvas}
                                        className="btn btn-outline-secondary  rounded-circle"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                            <MobileMenuList />
                            <p className="text d-none d-lg-block">add info</p>
                            <div className="mobile-menu fix mb-3" />
                            <div className="offcanvas__contact">
                                <h4>Contact Info</h4>
                                <ul>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon">
                                            <i className="fal fa-map-marker-alt" />
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <Link to="#">
                                                address if needed
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="fal fa-envelope" />
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <Link to="mailto:info@devgate.co.uk">
                                                <span className="mailto:info@example.com">
                                                    info@devgate.co.uk
                                                </span>
                                            </Link>
                                        </div>
                                    </li>

                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15"></div>
                                        <div className="offcanvas__contact-icon mr-15">
                                            <Link to="tel:+2 01066684916">
                                                +2 01066684916
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                                <div className="w-72 mt-4">
                                   {token?<Link
                                        to="/dashboard"
                                        className="w-30 theme-btn text-center"
                                    >
                                        <span>
                                            Dashboard
                                            <i className="fa-solid fa-arrow-right-long" />
                                        </span>
                                    </Link> :<Link
                                        to="/login"
                                        className="w-30 theme-btn text-center"
                                    >
                                        <span>
                                            Admin login
                                            <i className="fa-solid fa-arrow-right-long" />
                                        </span>
                                    </Link>}
                                </div>
                              <LogoutButton/>
                                <div className="social-icon d-flex align-items-center">
                                    <Link
                                        to="https://www.facebook.com/share/1KTXVJurgT/"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`offcanvas__overlay ${isInfoOpen ? "overlay-open" : ""}`}
                onClick={toggleOffcanvas}
            />
        </>
    );
};

export default ExtraInfoOffcanvas;
