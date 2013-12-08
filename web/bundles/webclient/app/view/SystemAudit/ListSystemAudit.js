Ext.define('sisprod.view.SystemAudit.ListSystemAudit', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listSystemAudit',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        headers: {
            systemAuditId: 'SystemAudit ID',
            entityCaption: 'Entity',
            instanceId: 'Instance Id',
            systemUserName: 'Username',
            actionName: 'Action',
            eventDate: 'Event date',
            url: 'Url',
            remoteIpAddress: 'Ip address'
       }
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'SystemAudit List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
//       me.gridOptions = {};
       
       //
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            baseGridOptions: {
                allowAdd: false,
                allowUpdate: false,
                allowDelete: false,
                allowPrint: true  
            },
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    systemAuditId: {
                        header:me.messages.headers.systemAuditId,
                        flex:1
                    },
                    'systemEntity.entityCaption': {
                        header:me.messages.headers.entityCaption,
                        flex:3
                    },
                    instanceId: {
                        header:me.messages.headers.instanceId,
                        flex:1
                    },
                    'systemUser.username': {
                        header:me.messages.headers.systemUserName,
                        flex:1
                    },
                    actionName: {
                        header:me.messages.headers.actionName,
                        flex:1
                    },
                    eventDate: {
                        header:me.messages.headers.eventDate,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            return Ext.util.Format.date(new Date(value), "d-m-Y H:i:s");
                        },
                        flex:2
                    },
                    url: {
                        header:me.messages.headers.url,
                        flex:5
                    },
                    remoteIpAddress: {
                        header:me.messages.headers.remoteIpAddress,
                        flex:2
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
});