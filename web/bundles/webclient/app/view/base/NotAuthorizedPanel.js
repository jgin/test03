Ext.define('sisprod.view.base.NotAuthorizedPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'notauthorizedpanel',
    //title: 'Inicio',

    panelMessages: {
        infoText: 'You have no permission to visualize this UI and perform any operation'
    },

    layout: {
        type: 'fit'
    },
    frame: false,
    border: 0,
    defaults: {
        border: 0
    },
    
    initComponent: function(){
        var me = this;
        me.items = [
            {
                //region: 'center',
                xtype: 'panel',
                html: ['<div class="divInfoPanel">',
                    Ext.String.format('<h1>{0}</h1>', sisprod.getApplication().getApplicationTitle()),
                    Ext.String.format('<img src="{0}"/>', sisprod.getApplication().getImagePath('logo_gmp.png')),
                    Ext.String.format('<div class="divInfoText">{0}</div>', me.panelMessages.infoText),
                    '</div>'].join('')
            }
        ];
        
        me.callParent(arguments);
    }
});