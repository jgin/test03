/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DuplicatedWorkRequest.ListDuplicatedWorkRequest', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listDuplicatedWorkRequest',
   
   options: {},
   
   entityName: '',
   
   usedInPAndP: true,
   
   listTitle: 'Duplicated Work Requests List',
   messages: {
       headers: {
           idWorkRequest: 'ID',
           workRequestSourceName: 'Work Request Source',
           locationName: 'Location',
           equipmentName: 'Equipment',
           workRequestFullNumber: 'Request Number',
           workCategoryDetailName: 'Work Type',
           requestDate: 'Date'
       },
       labels: {
           nullify: 'Nullify',
           taskDescriptionDetail: 'Task Detail'
       }
   },
   showCheckInactive: false,
   
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
                autoCreateFilters: false,
                columnOptions: {
                    idWorkRequest: {header: me.messages.headers.idWorkRequest},
                    idWorkRequestSource: {hideable: false},
                    'workRequestSource.workRequestSourceName': {
                        header: me.messages.headers.workRequestSourceName,        
                        flex: 2
                    },
                    idLocation: {hideable: false},
                    'location.locationName': {header: me.messages.headers.locationName},
                    idEquipment: {hideable: false},
                    'equipment.equipmentName': {header: me.messages.headers.equipmentName},
                    workRequestYear: {hideable: false},
                    workRequestNumber: {hideable: false},
                    workRequestFullNumber: {header: me.messages.headers.workRequestFullNumber, flex: 1.5},
                    'workCategoryDetail.idWorkCategoryDetail':{hideable: false},
                    'workCategoryDetail.workCategoryDetailName':{header: me.messages.headers.workCategoryDetailName},
                    requestDate: {header: me.messages.headers.requestDate},
                    description: {visible: false, hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: false,
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.labels.nullify,
                    iconCls: 'remove',
                    action: 'nullify'
                },
                {
                    xtype: 'button',
                    text: me.messages.labels.taskDescriptionDetail,
                    iconCls: 'viewDetail',
                    action: 'viewDetail'
                }
            ]
        };
        me.callParent(arguments);
   }
   
});