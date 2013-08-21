define(['SocialNetView', 'text!templates/canvas.html',
        'text!templates/assumption.html', 'models/Assumption',
        'views/assumption'],
function(SocialNetView,  canvasTemplate,
         assumptionTemplate, Assumption, AssumptionView)
{
  var canvasView = SocialNetView.extend({
    el: $('#content'),

    events: {
      "submit form": "postAssumption"
    },

    initialize: function () {
      this.model.bind('change', this.render, this);
    },

    postAssumption: function() {
      var that = this;
      var assumptionText = $('input[name=assumption]').val();
      var statusCollection = this.collection;
      $.post('/accounts/' + this.model.get('_id') + '/assumption', {
        assumption: assumptionText
      }, function(data) {
        that.prependStatus(new Assumption({description:assumptionText}));
      });
      return false;
    },

    prependStatus: function(assumptionModel) {
      var statusHtml = (new AssumptionView({ model: assumptionModel })).render().el;
      $(statusHtml).prependTo('.status_list').hide().fadeIn('slow');
    },

    render: function() {
      var that = this;
      this.$el.html(
        _.template(canvasTemplate,this.model.toJSON())
      );

      var statusCollection = this.model.get('assumptions');
      if ( null != statusCollection ) {
        _.each(statusCollection, function renderOne (statusJson) {
          var assumptionModel = new Assumption(statusJson);
          that.prependStatus(assumptionModel);
        });
      }
    }
  });

  return canvasView;
});
