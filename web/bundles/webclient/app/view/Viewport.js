Ext.define('sisprod.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'sisprod.view.Main'        
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'app-main'
        }
    ],

    listeners: {
        afterrender: function(){
            Ext.getCmp('menu').setRootNode(sisprod.getApplication().menuStore.getRootNode());
        }
    }
});
