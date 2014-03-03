require('../testHelper')

var User = App.model('user')

describe(__filename, function() {
  it("should create the new users", function(done) {
    var req = {
      body: {
        email: 'test@example.com'
      , password: 'override'
      }
    }

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

    var usersRoutes = App.route('usersRoutes')

    usersRoutes.create(req,res)
  })
})
