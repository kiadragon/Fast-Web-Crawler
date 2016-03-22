(function(){
    var previousColor = '';
    var path, target, event;

    var jsonData = {
        url: "",
        data: {
            type: ""
        }    
    }

    var DocumentMouseOver = (e) => {
    previousColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor ='#9dc2e5';
    };

    var DocumentMouseOut = (e) => {
        e.target.style.backgroundColor = previousColor;
    };

    var DocumentClick = (e) => {
        console.log(e);
        target = e.target, path = e.path;
        event = e;

        jsonData.url = target.baseURI;

        if(haveId(target)) {
            console.log("selected Element Have ID");
            jsonData.data.type = 'id';
            jsonData.data.id = target.id;
        }
        else if (haveClassName(target)) {
            console.log("selected Element have CLASS");
            jsonData.data.type = 'class';
            jsonData.data.className = target.className;
            jsonData.data.index = getIndex(
                document.getElementsByClassName(target.className), target);

        } else if(haveName(target)) {
            console.log("selected Element have Name");
            jsonData.data.type = 'name';
            jsonData.data.name = target.name;
            jsonData.data.index = getIndex(
                document.getElementsByName(target.name), target);
        } else {
            console.log("Have no identity");
            return;
        }
        console.log(jsonData);
        xhrGet((data) => {
        console.log(data); 
        });
        document.removeEventListener('mouseover', DocumentMouseOver);
        document.removeEventListener('mouseout', DocumentMouseOut);
        document.removeEventListener('click', DocumentClick);

    };


    var haveId = (e) => {
        if (e.id === undefined || e.id === "") {
            return false;
        } else {
            return true;
        }
    }

    var haveClassName = (e) => {
        if (e.className === undefined || e.className === "") {
            return false;
        } else {
            return true;
        }
    }

    var haveName = (e) => {
        if (e.name === undefined || e.name === "") {
            return false;
        } else {
            return true;
        }
    }

    var getIndex = (array, target) => {
        for (var i in array) {
            if (array[i] == target) {
            return i;
            }
        }
    }

    var xhrGet = (callback) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (callback) => {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        }

        xhr.open("GET", "http://www.wenyuantang.com/resource/moxa");
        xhr.send();
    }



    document.addEventListener('mouseover', DocumentMouseOver);

    document.addEventListener('mouseout', DocumentMouseOut);

    document.addEventListener('click', DocumentClick);

})();

