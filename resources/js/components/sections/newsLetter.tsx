import { Link } from "react-router-dom"

const NewsLetter = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-wrapper">
                    <div className="mask-shape">
                        <img src="/img/cta-mask.png" alt="shape-img" />
                    </div>
                    <div className="circle-shape">
                        <img src="/img/circle.png" alt="shape-img" />
                    </div>
                    <div className="cta-image wow slideUp" data-delay=".3">
                        
                    </div>
                    <div className="cta-items">
                        <h3 className="wow slideUp" data-delay=".5">Get contact</h3>
                        <Link to="/contact" className="theme-btn bg-white wow slideUp" data-delay=".7">
                            get contact
                            <i className="fa-solid fa-arrow-right-long" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default NewsLetter