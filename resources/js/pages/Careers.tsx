
import PageTitle from "@/components/sections/pageTitle"

const Careers = () => {
    return (
        <>
            <PageTitle currentPage="Jobs" title="Jobs" />
             
        <section className="job-search-section section-padding">
            <div className="container">
                <div className="job-search-wrapper">

                    {/* Search Inputs */}
                    <div className="job-search-box mb-3">
                        <div className="row g-3">
                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Keywords"
                                />
                            </div>

                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Location"
                                />
                            </div>
                        </div>

                        {/* Remote checkbox */}
                        <div className="form-check mt-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remoteOnly"
                            />
                            <label className="form-check-label" htmlFor="remoteOnly">
                                Remote positions only
                            </label>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="job-search-button mb-3">
                        <button className="theme-btn w-100">
                            Search Jobs
                        </button>
                    </div>

                    {/* Job Type Filters */}
                    <div className="job-type-filters mb-3">
                        <label className="me-3">
                            <input type="checkbox" defaultChecked /> Freelance
                        </label>
                        <label className="me-3">
                            <input type="checkbox" defaultChecked /> Full Time
                        </label>
                        <label className="me-3">
                            <input type="checkbox" defaultChecked /> Internship
                        </label>
                        <label className="me-3">
                            <input type="checkbox" defaultChecked /> Part Time
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked /> Temporary
                        </label>
                    </div>

                    {/* Results */}
                    <div className="job-results">
                        <p className="text-muted">
                            There are no listings matching your search.
                        </p>
                    </div>

                </div>
            </div>
        </section>
            
        </>
    )
}

export default Careers