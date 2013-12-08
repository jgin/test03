/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestPendingApproval.ListWorkRequestPendingApproval', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listPendingApproval',
   
   options: {},
   
   usedInPAndP: true,
   entityName: '',
   
   listTitle: 'Work Requests Pending Approval',
   messages: {
       headers: {
           idWorkRequest: 'ID',
           lotName: 'Lot',
           workRequestSourceName: 'Work Request Source',
           workCategoryName:'Work Category',
           workCategoryDetailName:'Work Type',
           dependencyName: 'Dependency',
           applicantFullName: 'Applicant',
           recipientFullName: 'Recipient',
           locationName: 'Location',
           equipmentName: 'Equipment',
           workRequestFullNumber: 'Request Number',
           requestDate: 'Date',
           attentionMaximumDate: 'Max. Attention Date',
           workRequestStatusName: 'Status'
           
       },
       approve: 'Approve',
       notapprove: 'Not Approve'
   },
   
    gridOptions: {
        region: 'center'
    },
    showCheckInactive: false,
   
    initComponent: function(){
       var me = this;

       var storeName = sisprod.getApplication().getStoreName('WorkRequestBySender');
       var modelName = sisprod.getApplication().getModelName('WorkRequest');
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
                    'workRequestSource.workRequestSourceName': {header: me.messages.headers.workRequestSourceName, flex: 2},
                    'workCategoryDetail.workCategory.idWorkCategory': {hideable: false},
                    'workCategoryDetail.workCategory.workCategoryName': {header: me.messages.headers.workCategoryName, flex: 1.5},
                    'workCategoryDetail.idWorkCategoryDetail': {hideable: false},
                    'workCategoryDetail.workCategoryDetailName': {header: me.messages.headers.workCategoryDetailName, flex: 1.5},
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
                    idWorkRequestStatusReason: {hideable: false},
                    'workRequestStatusReason.workRequestStatusReasonName': {hideable: false, align: 'center'},
                    description: {header: me.messages.headers.description, hideable: false},
                    reportLink: {hidden: true, hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: false,
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.approve,
                    iconCls: 'approve',
                    action: 'approve'
                },
                {
                    xtype: 'button',
                    text: me.messages.notapprove,
                    iconCls: 'notapprove',
                    action: 'notapprove'
                }
            ]
        };
        me.callParent(arguments);
   }
   
});