// YourComponent.js
import React from 'react';

const CheckInApp = () => {
    const openBrowser = () => {
        // Your logic to open the browser
        var href = "intent:" + window.location.href + "#Intent;end";
        window.parent.location.assign(href);
    };

    return (
        <div className="open-facebook-browser" id="my-fb-div">
            <p className="open-fb-message">Trang web không hỗ trợ trình duyệt này, vui lòng bấm vào nút dưới để mở trình duyệt khác.</p>
            <button onClick={openBrowser} className="open-fb-button">Mở bằng trình duyệt</button>
        </div>
    );
};

export default CheckInApp;