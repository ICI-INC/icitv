document.addEventListener("DOMContentLoaded", function () {
fetch("")
    .then(response => response.text())
    .then(data => {
        let country = data.match(/loc=([A-Z]+)/)?.[1] || "XX";

        if (["RU", "UA", "BY"].includes(country)) {
            loadInlineScript(`(function(icjaw){
                var d = document,
                    s = d.createElement('script'),
                    l = d.scripts[d.scripts.length - 1];
                s.settings = icjaw || {};
                s.src = "";
                s.async = true;
                s.referrerPolicy = 'no-referrer-when-downgrade';
                l.parentNode.insertBefore(s, l);
            })({})`);
        }

        // Ð—Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÐ¼ Ñ€ÐµÐºÐ»Ð°Ð¼Ð½Ñ‹Ðµ ÑÐºÑ€Ð¸Ð¿Ñ‚Ñ‹ Ð² Ð»ÑŽÐ±Ð¾Ð¼ ÑÐ»ÑƒÑ‡Ð°Ðµ, ÐµÑÐ»Ð¸ ÑÑ‚Ñ€Ð°Ð½Ð° Ð½Ðµ Ð¸Ð· ÑÐ¿Ð¸ÑÐºÐ°
        if (!["RU", "UA", "BY"].includes(country)) {
            loadScript("");
            loadScript("");
        }
    })
    .catch(() => {
        // Ð•ÑÐ»Ð¸ Ð·Ð°Ð¿Ñ€Ð¾Ñ ÑƒÐ¿Ð°Ð», Ñ‚Ð¾Ð¶Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÐ¼ Ñ€ÐµÐºÐ»Ð°Ð¼Ð½Ñ‹Ðµ ÑÐºÑ€Ð¸Ð¿Ñ‚Ñ‹
        loadScript("");
        loadScript("");
    });

function loadScript(src) {
    let script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";
    document.body.appendChild(script);
}

    function loadInlineScript(code) {
        let script = document.createElement("script");
        script.textContent = code;
        document.body.appendChild(script);
    }

    function fullscreen() {
        let elem = document.documentElement;
        if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                }

            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        } else {
            alert("Fullscreen mode is not supported on this device.");
        }
    }

    let fullscreenButton = document.querySelector(".full-main");
    if (fullscreenButton) {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            fullscreenButton.onclick = function () {
                alert("For a better fullscreen experience, add this site to your Home Screen.");
            };
        } else {
            fullscreenButton.onclick = fullscreen;
        }
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
        window.addEventListener("beforeunload", function (event) {
            event.preventDefault();
            event.returnValue = '';
        });
    }
});