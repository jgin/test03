Ext.define('login.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit'        
    ],

    layout: {
        type: 'border'        
    },
//    layout: {
//        type: 'hbox',
//        align: 'middle',
//        pack: 'center'
//    },

    items: [
        {
            xtype: 'panel',
            region: 'center',
            bodyCls: 'loginBackground',
            items: [
                Ext.create('login.view.Login')
            ]
        },
        {
            xtype: 'panel',
            region: 'south',
            items: [
                {
                    xtype: 'label',
                    html: Ext.String.format('<div class="browserCompatibility">{0}<img style="padding-left: 5px;" src="{1}"/></div>',
                        'Para un mejor funcionamiento de la aplicación se recomienda el uso de Google Chrome',
                        global.resources.baseUrl+'/resources/images/chrome_16_16.png')
                        
                }
            ]
        }
    ]
});
