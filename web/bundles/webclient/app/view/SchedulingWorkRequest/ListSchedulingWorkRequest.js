/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SchedulingWorkRequest.ListSchedulingWorkRequest', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listSchedulingWorkRequest',
   
   options: {},
   
   usedInPAndP: true,
   entityName: '',
   
   title: 'Work Requests For Scheduling',
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
           changeMultiOrder: 'Generate More WO?',
           schedule: 'Schedule',
           viewOrders: 'View Orders'
       },
       attachFilesButtonText: 'Attach Files'
   },
   
    gridOptions: {
        region: 'center'
    },
    showCheckInactive: false,
   
    initComponent: function(){
       var me = this;

       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName('WorkRequestSchedule');
        me.gridOptions = {
            title: me.title,
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
                    'workCategoryDetail.workCategory.workCategoryName': {header: me.messages.headers.workCategoryName, flex: 1.5},
                    'workCategoryDetail.workCategoryDetailName': {header: me.messages.headers.workCategoryDetailName, flex: 1.5},
                    idDependency: {hideable: false},
                    'dependency.dependencyName': {header: me.messages.headers.dependencyName, hideable: false},
                    idEmployee: {hideable: false},
                    applicantFullName: { header: me.messages.headers.applicantFullName, flex: 2},
//                    recipientFullName: { header: me.messages.headers.recipientFullName, flex: 2},
                    senderFullName: { header: me.messages.headers.senderFullName, flex: 2 },
                    idLocation: {hideable: false},
                    'location.locationName': {header: me.messages.headers.locationName},
                    idEquipment: {hideable: false},
                    'equipment.equipmentName': {header: me.messages.headers.equipmentName},
                    workRequestYear: {hideable: false},
                    workRequestNumber: {hideable: false},
                    workRequestFullNumber: {header: me.messages.headers.workRequestFullNumber, flex: 1.5},
                    requestDate: {header: me.messages.headers.requestDate, hidden: true},
                    attentionMaximumDate: {header: me.messages.headers.attentionMaximumDate},
                    idWorkRequestStatus: {hideable: false},
                    'workRequestStatus.workRequestStatusName': {
                        header: me.messages.headers.workRequestStatusName,
                        hidden: true,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            metaData.style = Ext.String.format("background-color: {0};background-image: none;",
                                record.raw['workRequestStatus']['workRequestStatusColor']);
                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                        }
                    },
                    idWorkRequestStatusReason: {hideable: false},
                    'workRequestStatusReason.workRequestStatusReasonName': {hideable: false, align: 'center'},
                    description: {header: me.messages.headers.description, hideable: false},
                    changeMultiOrder: {
                        header: me.messages.headers.changeMultiOrder,
                        hideable: false,
                        align: 'center',
                        xtype: 'actioncolumn',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        items: [
                            {
                                icon: sisprod.getApplication().getImagePath('generate_more_orders.png'),
                                handler: function(grid, rowIndex, colIndex){
                                    var record = grid.getStore().getAt(rowIndex);
                                    if(record) me.controller.showChangeMultiOrderWindow(grid, rowIndex, colIndex, record);
                                }
                            }
                        ]
                    },
                    schedule: {
                        header: me.messages.headers.schedule,
                        hideable: false,
                        align: 'center',
                        xtype: 'actioncolumn',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        items: [
                            {
                                icon: sisprod.getApplication().getImagePath('schedule_link.png'),
//                                tooltip: 'Schedule Selected Work Request...',
                                isDisabled: function(view, rowIndex, colIndex, item, record){
                                    var attentionMaximumDate = record.data['attentionMaximumDate'];
                                    var today = new Date(); today.setHours(0, 0, 0, 0);
                                    if(attentionMaximumDate < today || !record.data['multiOrder'])
                                        return true;
                                    return false;
                                },
                                handler: function(grid, rowIndex, colIndex){
                                    var record = grid.getStore().getAt(rowIndex);
                                    if(record) me.controller.showGenerateWorkOrderWindow(grid, rowIndex, colIndex, record);
                                }
                            }
                        ]
                    },
                    multiOrder: { hideable: false },
                    numberOfOrders: { hideable: false },
                    viewWorkOrders: {
                        header: me.messages.headers.viewOrders,
                        hideable: false,
                        align: 'center',
                        xtype: 'actioncolumn',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        items: [
                            {
                                icon: sisprod.getApplication().getImagePath('work_orders.png'),
//                                tooltip: 'View All Generated Work Orders...',
                                handler: function(grid, rowIndex, colIndex){
                                    var record = grid.getStore().getAt(rowIndex);
                                    if(record){
                                        me.controller.showWorkOrders(grid, rowIndex, colIndex, record);
                                    }
                                    
                                }
                            }
                        ]
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: false,
            topBarButtons: [
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