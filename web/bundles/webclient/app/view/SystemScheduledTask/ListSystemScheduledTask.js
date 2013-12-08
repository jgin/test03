/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.SystemScheduledTask.ListSystemScheduledTask', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listSystemScheduledTask',
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
                    taskDescription: { header: me.messages.columnHeaders.taskDescription, flex:3 },
                    lastExecutionDate: {
                        header:me.messages.columnHeaders.lastExecutionDate,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            if (value!=null)
                                return Ext.util.Format.date(new Date(value), "d-m-Y H:i:s");
                            return "";
                        },
                        flex:1
                    },
                    activeTask: { header: me.messages.columnHeaders.activeTask, flex:1 },
                    cronExpression: { header: me.messages.columnHeaders.cronExpression, flex:2 }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowAdd: false,
                allowUpdate: true,
                allowDelete: false,
                allowPrint: false
            }
        };
        me.callParent(arguments);
    }
});
