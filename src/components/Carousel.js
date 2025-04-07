import React from 'react';
import './Carousel.css';

const Carousel = () => {
  return (
    <div className="w-75 mx-auto">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src="images/image10.jpg"
              className="d-block w-100 carousel-img"
              alt="The Provost"
            />
            <div className="carousel-caption">
              <h5>Leadership per Excellence</h5>
              <p>The Provost</p>
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="images/image9.jpg"
              className="d-block w-100 carousel-img"
              alt="The Provost"
            />
            <div className="carousel-caption">
              <h5>Leadership per Excellence</h5>
              <p>The Provost</p>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="images/image10.jpg"
              className="d-block w-100 carousel-img"
              alt="The Provost"
            />
            <div className="carousel-caption">
            <h5>Leadership per Excellence</h5>
            <p>The Provost</p>
              
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src="images/image1.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>The College's Sign Board</h5>
              <p>The Sign of Greatness</p>
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="images/image9.jpg"
              className="d-block w-100 carousel-img"
              alt="The Provost"
            />
            <div className="carousel-caption">
              <h5>Leadership per Excellence</h5>
              <p>The Provost</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/image17.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Staff Offices</h5>
              <p>Offices for Efficient Services Delivery</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/image5.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Administrative Block</h5>
              <p>Administration for Excellence</p>
            </div>
          </div>
  


          <div className="carousel-item">
            <img
              src="images/image18.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Staff Offices</h5>
              <p>Offices for Efficient Services Delivery</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/image19.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Staff Office</h5>
              <p>Offices for Efficient Services Delivery</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/image17.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Staff Offices</h5>
              <p>Lectures Offices</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/image25.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
            <h5>The Administratrative Block</h5>
              <p>The Administration Center</p>

            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/image24.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Administratrative Block</h5>
              <p>Centre of Administration</p>
            </div>
          </div>


          <div className="carousel-item">
            <img
              src="images/image10.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>The Provost</h5>
              <p>Meet Our Dynamic Provost</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/image22.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Staff Office</h5>
              <p>Office in the College</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/image23.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
              <h5>Administrative Block</h5>
              <p>Offices for Efficient Services Delivery</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/image9.jpg"
              className="d-block w-100 carousel-img"
              alt="Sign Board"
            />
            <div className="carousel-caption">
            <h5>Leadership per Excellence</h5>
              <p>The Provost</p>

            </div>
          </div>


          {/* Additional Slides */}
          {/* Slide 3 to Slide 11 go here... */}
          {/* Copy the structure of Slide 1 and Slide 2 for the remaining slides */}

        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;