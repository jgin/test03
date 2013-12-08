/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestAll.ListWorkRequestAll', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkRequestAll',
   
   options: {},
   
   usedInPAndP: true,
   entityName: '',
   
   listTitle: 'Work Requests List All',
   messages: {
       headers: {
           idWorkRequest: 'ID',
           lotName: 'Lot',
           workRequestSourceName: 'Work Request Source',
           workCategoryName: 'Work Category',
           workCategoryDetailName: 'Work Type',
           dependencyName: 'Dependency',
           applicantFullName: 'Applicant',
           recipientFullName: 'Recipient',
           locationName: 'Location',
           equipmentName: 'Equipment',
           workRequestFullNumber: 'Request Number',
           requestDate: 'Date',
           attentionMaximumDate: 'Max. Attention Date',
           workRequestStatusName: 'Status',
           description: 'Description',
           workRequestStatusReasonName: 'Motivo de Estado',
           reportLink: 'Print'
       }
   },
   showCheckInactive: false,
   
   initComponent: function(){
       var me = this;

       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = 'sisprod.model.WorkRequestAllModel';
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWorkRequest: {header: me.messages.headers.idWorkRequest},
                    idLot: {hideable: false},
                    'lot.lotName': {header: me.messages.headers.lotName},
                    idWorkRequestSource: {hideable: false},
                    'workRequestSourceName': {header: me.messages.headers.workRequestSourceName, flex: 2},
                    idDependency: {hideable: false},
                    'dependency.dependencyName': {header: me.messages.headers.dependencyName, hideable: false},
                    idEmployee: {hideable: false},
                    applicantFullName: { header: me.messages.headers.applicantFullName, flex: 2},
                    recipientFullName: { header: me.messages.headers.recipientFullName, flex: 2},
                    idLocation: {hideable: false},
                    'location.locationName': {header: me.messages.headers.locationName},
                    idEquipment: {hideable: false},
                    'equipment.equipmentName': {header: me.messages.headers.equipmentName},
                    workRequestYear: {hideable: false},
                    workRequestNumber: {hideable: false},
                    workRequestFullNumber: {header: me.messages.headers.workRequestFullNumber, flex: 1.5},
                    requestDate: {header: me.messages.headers.requestDate},
                    attentionMaximumDate: {header: me.messages.headers.attentionMaximumDate},
                    idWorkRequestStatus: {hideable: false},
                    'workRequestStatus.workRequestStatusName': {
                        header: me.messages.headers.workRequestStatusName,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            metaData.style = Ext.String.format("background-color: {0};background-image: none;",
                                record.raw['workRequestStatus']['workRequestStatusColor']);
                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                        }
                    },
                    'workRequestStatusReason.workRequestStatusReasonName': {header: me.messages.headers.workRequestStatusReasonName, hideable: true, hidden: false},
                    idWorkRequestStatusReason: {hideable: false},
                    'workRequestStatusReasonName': {hideable: false},
                    'idWorkCategory': {hideable: false},
                    'workCategoryName': {header: me.messages.headers.workCategoryName, flex: 1.5},
                    'idWorkCategoryDetail': {hideable: false},
                    'workCategoryDetailName': {header: me.messages.headers.workCategoryDetailName, flex: 1.5},
                    'idSector': {hideable: false},
                    description: {header: me.messages.headers.description, hideable: false},
                    reportLink: {hidden: true, hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowAdd: false,
                allowUpdate: false,
                allowDelete: false
            }
        };
        me.callParent(arguments);
   }
   
});