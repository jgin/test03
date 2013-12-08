/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequest.ListWorkRequest', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkRequest',
   
   options: {},
   
   usedInPAndP: true,
   
   entityName: '',
   
   listTitle: 'Work Requests List',
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
           senderFullName: 'Sender',
           locationName: 'Location',
           equipmentName: 'Equipment',
           workRequestFullNumber: 'Request Number',
           requestDate: 'Date',
           attentionMaximumDate: 'Max. Attention Date',
           workRequestStatusName: 'Status',
           description: 'Description',
           reportLink: 'Print'
       },
       nullifyButtonText: 'Nullify',
       attachFilesButtonText: 'Attach Files'
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
                columnOptions: {
                    idWorkRequest: {header: me.messages.headers.idWorkRequest},
                    idLot: {hideable: false},
                    'lot.lotName': {header: me.messages.headers.lotName},
                    idWorkRequestSource: {hideable: false},
                    'workRequestSource.workRequestSourceName': {header: me.messages.headers.workRequestSourceName, flex: 2},
                    idDependency: {hideable: false},
                    'dependency.dependencyName': {header: me.messages.headers.dependencyName, hideable: false},
                    idEmployee: {hideable: false},
                    applicantFullName: { header: me.messages.headers.applicantFullName, flex: 2},
//                    recipientFullName: { header: me.messages.headers.recipientFullName, flex: 2},
                    senderFullName: { header: me.messages.headers.senderFullName, flex: 2},
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
                    'workRequestStatusReason.workRequestStatusReasonName': {hideable: false},
                    'workCategoryDetail.workCategory.idWorkCategory': {hideable: false},
                    'workCategoryDetail.workCategory.workCategoryName': {header: me.messages.headers.workCategoryName, flex: 1.5},
                    'workCategoryDetail.idWorkCategoryDetail': {hideable: false},
                    'workCategoryDetail.workCategoryDetailName': {header: me.messages.headers.workCategoryDetailName, flex: 1.5},
                    description: {header: me.messages.headers.description, hideable: false},
                    reportLink: {
                        header: me.messages.headers.reportLink,
                        hideable: false,
                        align: 'center',
                        xtype: 'actioncolumn',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        items: [
                            {
                                icon: sisprod.getApplication().getImagePath('print.png'),
//                                tooltip: 'Print',
                                handler: function(grid, rowIndex, colIndex){
                                    var record = grid.getStore().getAt(rowIndex);
                                    if(record){
                                        var reportLink = Ext.String.format("reports.htm?reportName=pedido_de_trabajo_pdf.rptdesign&rp_InWorkRequest={0}",
                                            record.raw['idWorkRequest']);
                                        var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                            controller: me.controller,
                                            forPrintingList: false,
                                            formData: {
                                                url: reportLink,
                                                defaultFormat: sisprod.BasePrintWindow.PDF,
                                                selectableFormat: false,
                                                hiddenTitle: true
                                            }
                                        });
                                        printWindow.show();
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: { allowDelete: false },
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.nullifyButtonText,
                    iconCls: 'remove',
                    action: 'nullify'
                },
                {
                    xtype: 'button',
                    text: me.messages.attachFilesButtonText,
                    iconCls: 'attach',
                    action: 'attachFiles'
                }
            ]
        };
        me.callParent(arguments);
   }
   
});