define(['SocialNetView', 'text!templates/assumption.html'], function(SocialNetView, assumptionTemplate) {
  var assumptionView = SocialNetView.extend({
    tagName: 'li',

    render: function() {
      $(this.el).html(_.template(assumptionTemplate,this.model.toJSON()));
      return this;
    }
  });

  return assumptionView;
});
