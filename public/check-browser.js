function openBrowser() {
    var href = "intent:" + window.location.href + "#Intent;end";
    window.parent.location.assign(href);
}

function isFacebookApp2() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1 || ua.toLowerCase().indexOf("zalo") > -1);
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function openForm() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSePPWSX_dxkkVZpEfX6PoI1UqjmpflWDHyt_vfZg_Xghm_NtA/viewform?entry.1947617938=" + window.location.href);

}

function isNativeApp() {
    return isZalo();
}

function isZalo() {
    var userAgent = window.navigator.userAgent.toLowerCase(),
        isZalo = /zalo/.test(userAgent),
        ios = /iphone|ipod|ipad/.test(userAgent);

    if (isZalo) {
        return true;
    } else {
        return false;
    };
}


// this issue only happen on android, facebook or messager in-app browser
if (isFacebookApp2() || isNativeApp()) {
    if (getMobileOperatingSystem().toLowerCase() == 'android') {
        document.getElementById("my-fb-div").style.display = "flex";
    }
}
