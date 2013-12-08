Ext.define('sisprod.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'sisprod.view.Menu',
        'sisprod.view.base.TabPanelItem',
        'sisprod.view.base.Header',
        'sisprod.view.base.HomePanel',
        'sisprod.view.base.NotAuthorizedPanel'
    ],
    
    xtype: 'app-main',

    messages: {
        labels: {
            username: 'Username',
            lot: 'Lot: {0}',
            date: 'Date: {0}'
        }
    },

    layout: {
        type: 'border'
    },

    initComponent: function(){
        var me = this;
        //
        var userInfoStr = Ext.String.format("{0}: ", me.messages.labels.username);
        var userName = sisprod.getApplication().decodeUTF8(Ext.util.Cookies.get('userName'));
        var entityName = sisprod.getApplication().decodeUTF8(Ext.util.Cookies.get('userLongName'));
        if(Ext.isDefined(userName) && userName !== null) {
            userName = userName.replace(/\+/g, ' ');
            userInfoStr += userName;
        }
        if(Ext.isDefined(entityName) && entityName !== null && !Ext.isEmpty(entityName) && entityName !== '""') {
            entityName = entityName.replace(/\+/g, ' ');
            userInfoStr = Ext.String.format("{0}/{1}", userInfoStr, entityName);
        }
        //
        var serverDate;
        serverDate = Ext.util.Cookies.get('serverDate');
        if(!Ext.isDefined(serverDate) || serverDate === null) serverDate = new Date();
        //
        me.items = [
            {
                region: 'north',
                xtype: 'appHeader'
            },
            {
                region: 'west',
                xtype: 'panel',
                title: 'Menu',
                width: 220,
                layout: 'fit',
                collapsible: true,
                split: true,
                items:[
                    {
                        xtype: 'app-menu',
                        id: 'menu'
                    }
                ]
            },{
                region: 'center',
                id: 'content-panel',
                xtype: 'tabpanel',
                items:[
                {
                    xtype: 'tabPanelItem',
                    title: 'Inicio',
                    id: 'tabhome',
                    iconCls: 'home',
                    layout: {
                        type: 'border'
                    },
                    items: [{
                        xtype:'homepanel',
                        region: 'center'
                    }]
                }
                ]
            },
            {
                region: 'south',
                xtype: 'statusbar',
//                text: 'Application Ready',
                items: [
                    {
                        xtype: 'label',
                        cls: 'statusBarLabel',
                        text: userInfoStr
                    }, '-',
                    {
                        xtype: 'label',
                        cls: 'statusBarLabel',
                        text: Ext.String.format(me.messages.labels.lot, Ext.util.Cookies.get('envLotName'))
                    }, '-',
                    {
                        xtype: 'label',
                        cls: 'statusBarLabel',
                        text: Ext.String.format(me.messages.labels.date, serverDate)
                    }            
                ]
            }
        ];
        //
        me.callParent(arguments);
    }
});