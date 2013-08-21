define(function(require) {
  var Assumption = Backbone.Model.extend({
    urlRoot: '/accounts/' + this.accountId + '/assumption'
  });

  return Assumption;
});
