import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = () => {
    const carouselStyle = {
        width: '90%',
        marginTop: '0%',
        overflow: 'hidden',
        borderRadius: '8px',
        border: '0px solid black'
    };

    return (
        <center>
            <div style={carouselStyle}>
                <Carousel
                    showThumbs={false}
                    swipeable={true}
                    showArrows={true}
                    autoPlay={true}
                    emulateTouch={true}
                    showStatus={false}
                    swipeScrollTolerance={50}
                    useKeyboardArrows={true}
                    infiniteLoop={true}
                >
                    <div>
                        <img src="../src/assets/images/banner1.jpg" alt="Image 1" />
                    </div>
                    <div>
                        <img src="../src/assets/images/banner2.jpg" alt="Image 2" />
                    </div>
                    <div>
                        <img src="../src/assets/images/banner3.jpg" alt="Image 2" />
                    </div>
                    <div>
                        <img src="../src/assets/images/banner4.jpg" alt="Image 2" />
                    </div>
                </Carousel>
            </div>
        </center>
    );
}

export default ImageSlider;
