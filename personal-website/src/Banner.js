import React from "react";
const Banner = () => {
    return (
        <header>
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 offset-lg-3 mx-auto">
                            <div className="caption-text text-center">
                                <h3 className="brand">{
                                    " "
                                }
                                <svg xmlns = "http://www.w3.org/2000/svg"
                                width = "25"
                                height = "25"
                                fill = "currentColor"
                                class = "bi bi-bullseye"
                                viewBox = "0 0 16 16">
                                <path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d = "M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                <path d = "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                <path d = "M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>{" "}
                                LEAD CAPTURE PAGE
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Banner;
