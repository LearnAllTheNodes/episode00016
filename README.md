# Learn All The Nodes Episode 16

## Testing route handlers

[View the episode](http://www.learnallthenodes.com/episodes/16-testing-route-handlers)

I’m going to go out on a limb here and assume that the apps you want to write will respond to incoming HTTP requests.  As such, you’ll likely want to make sure that those requests trigger the correct changes in your application state.

Last week we wrote tests that made sure our data layer did it was supposed to, but wouldn’t it be nice to know that we had wired up our route handler the way we ought to have?  Well, that’s exactly what we get into with today’s episode.

### Notes

    var res = {
      status: function(val) {
        this._status = val
        return this
      }
    , send: function(val) {
        assert.equal(this._status, 200)
        assert.equal(val, 'Welcome to the game.')

        User.count({}, function(err,count) {
          assert.ifError(err)
          assert.equal(1,count)

          User.find({}, function(err,records) {
            assert.ifError(err)
            assert.equal(records[0].email, 'test@example.com')
            done()
          })
        })
      }
    }

[Episode code](https://github.com/LearnAllTheNodes/episode00016)
