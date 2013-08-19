require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',
    
    Bootstrap: '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min',

    SocialNetView: '/js/SocialNetView'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    'Bootstrap':['jQuery'],
    'SocialNet': ['Backbone', 'Bootstrap']
  }
});

require(['SocialNet'], function(SocialNet) {
  SocialNet.initialize();
});
