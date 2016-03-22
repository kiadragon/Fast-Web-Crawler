(function(){
    var webUrlButton = document.getElementById("web-url-button");


    var buttonOnclick = (e) => {
        var webUrl = (document.getElementById("web-url").value === null
                        ? "" : document.getElementById("web-url").value);
        var displayIframe = document.getElementById("display-iframe");
        var potocol = webUrl.split("://")[0];
        var src = webUrl.split("://")[1];
        window.location = '/agent?potocol=' + potocol + "&site=" + src;
    }
    webUrlButton.addEventListener('click',buttonOnclick);


})();