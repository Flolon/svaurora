//Credit to Ben Brooks Scholz for browser detection JS code.
window.onload = function () {
        var versionnum = "1.11.0_STUDIO-VERSO-201910181954";
        document.getElementById("version").innerHTML = 'Web Version: '.concat(versionnum);
        var browser,
        version,
        mobile,
        os,
        osversion,
        bit,
        ua = window.navigator.userAgent,
        platform = window.navigator.platform;

    if (/MSIE/.test(ua)) {

        browser = 'Internet Explorer';

        if (/IEMobile/.test(ua)) {
            mobile = 1;
        }

        version = /MSIE \d+[.]\d+/.exec(ua)[0].split(' ')[1];

    } else if (/Chrome/.test(ua)) {
        if (/CrOS/.test(ua)) {
            platform = 'CrOS';
        }

        browser = 'Chrome';
        version = /Chrome\/[\d\.]+/.exec(ua)[0].split('/')[1];

    } else if (/Opera/.test(ua)) {

        browser = 'Opera';

        if (/mini/.test(ua) || /Mobile/.test(ua)) {
            mobile = 1;
        }

    } else if (/Android/.test(ua)) {

        browser = 'Android Webkit Browser';
        mobile = 1;
        os = /Android\s[\.\d]+/.exec(ua)[0];

    } else if (/Firefox/.test(ua)) {

        browser = 'Firefox';

        if (/Fennec/.test(ua)) {
            mobile = 1;
        }
        version = /Firefox\/[\.\d]+/.exec(ua)[0].split('/')[1];

    } else if (/Safari/.test(ua)) {

        browser = 'Safari';

        if ((/iPhone/.test(ua)) || (/iPad/.test(ua)) || (/iPod/.test(ua))) {
            os = 'iOS';
            mobile = 1;
        }

    } else {
        browser = 'Unable to Detect'
    }

    if (!version) {

        version = /Version\/[\.\d]+/.exec(ua);

        if (version) {
            version = version[0].split('/')[1];
        } else {
            version = /Opera\/[\.\d]+/.exec(ua)[0].split('/')[1];
        }

    }

    if (platform === 'MacIntel' || platform === 'MacPPC') {
        os = 'Mac OS X';
        osversion = /10[\.\_\d]+/.exec(ua)[0];
        if (/[\_]/.test(osversion)) {
            osversion = osversion.split('_').join('.');
        }
    } else if (platform === 'CrOS') {
        os = 'ChromeOS';
    } else if (platform === 'Win32' || platform == 'Win64') {
        os = 'Windows';
        bit = platform.replace(/[^0-9]+/, '');
    } else if (!os && /Android/.test(ua)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    } else if (!os && /Windows/.test(ua)) {
        os = 'Windows';
    } else {
        os = 'Unable to Detect';
    }

    window.ui = {
        browser: browser,
        version: version,
        mobile: mobile,
        os: os,
        osversion: osversion,
        bit: bit
    };
    document.getElementById("browser").innerHTML = 'Browser: '.concat(window.ui.browser) + ' '.concat(window.ui.version);
    document.getElementById("os").innerHTML = 'Operating System: '.concat(window.ui.os);

}