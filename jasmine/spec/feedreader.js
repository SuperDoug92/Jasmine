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

    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        function testForUrl(feed){
          it('has defined url', function(){
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
          });
        }
        function testForName(feed){
          it('has defined url', function(){
            expect(feed.name).toBeDefined();
            expect(feed.name).not.toBe('');
          });
        }
        allFeeds.forEach(function(feed){
          testForUrl(feed);
          testForName(feed);
        });
    });

    describe('The menu',function(){
      it('is hidden by default', function(){
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });

      it('changes visibility when clicked', function(){
        $(".menu-icon-link").trigger('click');
        expect($("body").hasClass("menu-hidden")).toEqual(false);

        $(".menu-icon-link").trigger('click');
        expect($("body").hasClass("menu-hidden")).toEqual(true);
      });

    });

    describe('Initial Entries',function(){

      beforeEach(function(done){
        loadFeed(0,done);
      });

      it('contains at least one entry',function(done){
        expect($(".feed").find(".entry").length).toBeGreaterThan(0);
        done();
      });
    });

    describe('New Feed Selection',function(){

      var feed, feed1;

      beforeEach(function(done){
        loadFeed(0, function() {
            feed = $('feed').html();
            loadFeed(1, function() {
                feed1 = $('feed').html();
                done();
            });
        });
      });

      it('new feed has different content', function(done) {
          expect($(feed)).not.toEqual(feed1);
          done();
      });
     });

});
