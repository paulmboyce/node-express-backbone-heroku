define(['SocialNetView', 'text!templates/canvas.html',
        'text!templates/status.html', 'models/Status',
        'views/Status'],
function(SocialNetView,  canvasTemplate,
         statusTemplate, Status, StatusView)
{
  var canvasView = SocialNetView.extend({
    el: $('#content'),

    events: {
      "submit form": "postStatus"
    },

    initialize: function () {
      this.model.bind('change', this.render, this);
    },

    postStatus: function() {
      var that = this;
      var statusText = $('input[name=assumption]').val();
      var statusCollection = this.collection;
      $.post('/accounts/' + this.model.get('_id') + '/assumption', {
        assumption: statusText
      }, function(data) {
        that.prependStatus(new Status({status:statusText}));
      });
      return false;
    },

    prependStatus: function(statusModel) {
      var statusHtml = (new StatusView({ model: statusModel })).render().el;
      $(statusHtml).prependTo('.status_list').hide().fadeIn('slow');
    },

    render: function() {
      var that = this;
      this.$el.html(
        _.template(canvasTemplate,this.model.toJSON())
      );

      var statusCollection = this.model.get('status');
      if ( null != statusCollection ) {
        _.each(statusCollection, function (statusJson) {
          var statusModel = new Status(statusJson);
          that.prependStatus(statusModel);
        });
      }
    }
  });

  return canvasView;
});
