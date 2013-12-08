Ext.define('sisprod.view.base.HomePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'homepanel',
    //title: 'Inicio',

    layout: {
        type: 'border'
    },
    frame: false,
    border: 0,
    defaults: {
        border: 0
    },
    
    initComponent: function(){
        var me = this;
        me.items = [
//            {
//                xtype: 'panel',
//                region: 'north',
//                html: ['<div class="divInfoPanel">',
//                    Ext.String.format('<h1>{0}</h1>', sisprod.getApplication().getApplicationTitle()),
//                    Ext.String.format('<img src="{0}"/>', sisprod.getApplication().getImagePath('logo_gmp.png')),
//                    '</div>'].join('')
//            },
            {
                xtype: 'image',
                src: sisprod.getApplication().getImagePath('background.jpg'),
                region: 'center',
                border: 5,
                margin: '10 10 10 10',
                imgCls: 'homeImage'
//                style: {
//                    borderColor: '#04408C',
//                    borderStyle: 'solid'
//                }
            }
        ];
        me.callParent(arguments);
    }
});