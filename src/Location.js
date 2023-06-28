import './Location.css'

const Location = () => {
    return (
        <div className="location">
            <h1>loca</h1>
            <div id="google-map-box" className="m-2 ">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.0525008520444!2d-84.5607195888844!3d35.79864442340116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885ddf7ba111fec3%3A0x55f0219bebf817e!2s111%20Big%20Tooth%20Rd%2C%20Kingston%2C%20TN%2037763%2C%20USA!5e0!3m2!1sen!2sca!4v1685645939031!5m2!1sen!2sca" 
                title="google-map-title" id="google-map" loading="lazy"></iframe>
            </div>
        </div>
    );
}

export default Location;