Ext.define('sisprod.view.SystemUser.ListSystemUser', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listSystemUser',
    options: {},
    entityName: '',
    
    title: '',
//    
//    messages : {
//        columnHeaders : {
//            
//        }
//    },
    baseView: 'BaseList',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    initComponent: function(){
        var me = this;
        
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    id: { header: me.messages.columnHeaders.id },
                    username: { header: me.messages.columnHeaders.username , flex : 1},
                    'entity.entityName' : {header: me.messages.columnHeaders.name, flex: 3},
                    enabled: { header: me.messages.columnHeaders.enabled, flex: 1 },
                    groupsString: { header: me.messages.columnHeaders.groupsString, flex: 3},
                    password :{hideable: false},
                    'entity.entityId' : {hideable: false},                    
                    resetPasswordAndSendToMailButton: {
                        header: me.messages.columnHeaders.resetPasswordAndSendToMailButton,
                        flex: 1,
                        hideable: false,
                        align: 'center',
                        xtype: 'actioncolumn',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        items: [
                            {
                                icon: sisprod.getApplication().getImagePath('login.png'),
                                tooltip: me.messages.tooltips.resetPasswordAndSendToMailButton,
                                scope: me.controller,
                                handler: me.controller.resetPasswordAndSendToMailButton_click
                            }
                        ]
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});
