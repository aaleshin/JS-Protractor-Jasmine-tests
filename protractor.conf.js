exports.config = {
    framework: "jasmine2",
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/*.spec.js'],
    directConnect: true,
    capabilities: {
        browserName: "chrome"
    },

    jasmineNodeOpts: {
        print: function () {},
        defaultTimeoutInterval: 80000
    }
};
