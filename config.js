module.exports = {
    appUrl: 'http://192.168.1.103:8081/XATTAX0.47/',
    browser: 'chrome', //firefox
    build: function(Builder) {
        return new Builder().forBrowser(this.browser).build();
    }
}