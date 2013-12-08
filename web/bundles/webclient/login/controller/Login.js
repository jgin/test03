Ext.define('login.controller.Login', {
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.app.Controller'
	],

	init: function(){
		this.control({
			'login button': {
				signIn: this.signInUser
			}
		});
	},

	signInUser: function(username, password){
		window.location = 'index.html';
		/*Ext.create('Ext.container.Viewport', {
		    requires:[
		        'Ext.layout.container.Fit',
		        'sisprod.view.Main'		        
		    ],

			layout: {
		        type: 'fit'
		    },
			items: {
				xtype: 'app-main'
			}
		});*/
	}
});