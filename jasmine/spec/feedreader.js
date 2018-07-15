/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
        #08 Write a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
        */
        it('URL defined and not empty', function() {
            allFeeds.forEach(function (entry) {
                expect(entry.url).toBeDefined();
                expect(entry.url.length).not.toBe(0);
            });
        });
        
        /*
        #09 Write a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        */
        it('name defined and not empty', function () {
            allFeeds.forEach(function (entry) {
                expect(entry.name).toBeDefined();
                expect(entry.name.length).not.toBe(0);
            });
        });
    });
});    

/*
#10 Write a new test suite named "The menu".
*/
describe('The menu', function () {

    /*
    #11 Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
    */
    it('is hidden by default', function () {
        expect(document.body.className).toContain('menu-hidden');
    });

    /*
    #12 A test that ensures the menu changes visibility when the menu icon is clicked. 
    */
    it('changes visibility when the menu icon is clicked', function () {
        const menuIcon = document.querySelector(".menu-icon-link");
        menuIcon.click();
        expect(document.body.className).not.toContain('menu-hidden');    //does the menu display when clicked?
        menuIcon.click();
        expect(document.body.className).toContain('menu-hidden')         //does it hide when clicked again.
    });
});

/* 
#13 A new test suite named "Initial Entries" 
*/
describe('Initial Entries', function () {
    
    /* 
    #14 A test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
    */
    beforeEach(function (done) {    //Jasmine's beforeEach
        loadFeed(0, function () {   //loadFeed() is asynchronous
            done();                 //asynchronous done() function
        });
    });

    it("there is one or more .entry in the .feed after executing loadFeed()", ((done) => {
        const numberEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
        expect(numberEntries).toBeGreaterThan(0);
        done();
    }));
});        

/* 
#15 A test suite named "New Feed Selection" 
*/
describe('New Feed Selection', function () {

    let initFeedSelection;
    beforeEach(function (done) {
        loadFeed(0, function () {
            initFeedSelection = document.querySelector(".feed").innerHTML;

            loadFeed(1, function () {
                done();
            });
        });
    });

    /* 
    #16 A test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        loadFeed() is asynchronous.
    */
    it("content changes when a new feed is loaded by the loadFeed", (function(done) {
        const newFeedSelection = document.querySelector(".feed").innerHTML;
        expect(initFeedSelection).not.toBe(newFeedSelection);
        done();
    }));

});        

