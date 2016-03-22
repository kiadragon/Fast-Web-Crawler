var phantom = require('phantom')
var fs = require('fs');
phantom.create().then(function (ph) {
    ph.createPage().then(function (page) {
        page.open('http://stackoverflow.com/').then(function (status) {
            console.log(status);
            page.property('content').then(function(content) {
                console.log(content)
                fs.writeFile('index.html', content, (err) => {
                    if (err) throw err;
                })
                page.close()
                ph.exit()
            })
        })
    })
})