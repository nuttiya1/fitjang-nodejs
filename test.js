var webdriver = require('selenium-webdriver'),
    By = webdriver.By, until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://127.0.0.1:3000/');
driver.wait(check_title,1000);

function check_title(){
    var promise = driver.getTitle().then( function(title) {
        if (title === 'Fit Jang')
        {
            console.log('success');
            return true;
        }
        else
        {
            console.log('fail --- ' + title);
        }
    });
    return promise;
}