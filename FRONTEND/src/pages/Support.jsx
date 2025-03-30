import React, { useEffect } from "react";

const SupportUs = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
    script.async = true;
    script.defer = true;
    script.id = "razorpay-embed-btn-js";
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("razorpay-embed-btn-js");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="support">
      <div className="support-content">
        <h1>Support SkyMist</h1>
        
        <p>
          Your support helps us maintain and improve SkyMist, ensuring we can continue 
          to provide accurate weather updates and new features for users worldwide.
        </p>
        
        <div className="support-options">
          <h2>Why Support Us?</h2>
          <ul>
            <li><strong>Server Costs:</strong> Help us maintain reliable infrastructure</li>
            <li><strong>Data Access:</strong> Support our access to premium weather data</li>
            <li><strong>New Features:</strong> Enable development of enhanced capabilities</li>
            <li><strong>Ad-Free Experience:</strong> Keep SkyMist clean and uncluttered</li>
          </ul>
        </div>
        
        <div className="donation-container">
          <h2>Make a Contribution</h2>
          <p>Every contribution, big or small, makes a difference!</p>
          
          <form className="support-form">
            <div className="razorpay-container">
              <div 
                className="razorpay-embed-btn" 
                data-url="https://rzp.io/rzp/supportskymist" 
                data-text="Support Now" 
                data-color="#528FF0" 
                data-size="large"
              />
            </div>
          </form>
        </div>
        
        <div className="support-message">
          <p>
            Thank you for being part of the SkyMist community. Your support 
            allows us to continue our mission of providing reliable weather information to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
