require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',
    
    Bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.0.0-rc1/js/bootstrap.min',

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
