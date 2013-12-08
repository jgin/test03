/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.DirectWorkOrder.WorkOrderActivityDetailDirect', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.workOrderActivityDetailDirect',
    
    require: [
        'sisprod.view.base.BaseDataWindow',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar'
    ],
    
    title: 'Activity Detail',
    modal: true,
    width: 600,
    height: 360,
    layout: 'fit',
    
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.WorkOrderActivityDetailModel',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),
    record: null,
    editor: null,
    
    messages: {
        activityDate : 'Activity Date',
        manHours : 'Man Hours',
        machineHours : 'Machine Hours',
        msgTitle: 'Detail',
        msgTipAdd: 'Add Detail',
        msgTipEdit: 'Edit Detail',
        alertDateRange: 'La Fecha debe estar en el rango ',
        leyendValid: 'Date within the range of execution of the work order',
        leyendInvalid: 'Date out of range of execution of the work order',
        description: 'Description',
        leyendAlertCurrentDate: 'Date entered greater than the current server date'
    },
    
    initComponent: function(){
        var me = this;
        if(me.editor === null){
            me.editor = Ext.create('Ext.grid.plugin.RowEditing',{
                clicksToEdit: 2
//                listeners: {
//                    'afteredit': function(editor, object, data, rowIndex){
//                        var record = object.record;
//                        Ext.BaseAjax.request({
//                            url:'rest/workOrder/getCurrentDate.htm',
//                            method: 'POST',
//                            success: function(response, options){
//                                var data = Ext.JSON.decode(response.responseText);
//                                me.currentDate = Ext.Date.parse(data.currentDate, 'Y-m-d');
//                                record.data.isValid = me.validActivityDate(record, me.currentDate);
//                            }
//                        });
//                    }
//                }
            });
        }
        me.formOptions = {
            bodyPadding: 5,
            fieldDefaults: {
                labelWidth: 105
            },  
            items: [
                {
                    xtype: 'panel',
                    frame: true,
                    layout: 'fit',
                    title: me.messages.msgTitle,
                    dockedItems:[{
                            dock: 'top',
                            xtype: 'toolbar',
                            items:[
                                {
                                iconCls: 'add',
                                xtype: 'button',
                                tooltip: me.messages.msgTipAdd,
                                action: 'addDetail',
                                handler: function(){
                                    me.editor.cancelEdit();
                                    var lenght = me.store.getCount();
                                    var row = Ext.create('sisprod.model.WorkOrderActivityDetailModel',
                                    {
                                        idWorkOrderActivity: null,
                                        manHours: 0,
                                        machineHours: 0
                                    });
                                    me.store.insert(lenght, row);
                                    me.editor.startEdit(row, 0);
                                }
                            },
                            '-',
                            {
                                iconCls: 'remove',
                                xtype: 'button',
                                tooltip: me.messages.msgTipRemove,
                                action: 'removeDetail',
                                handler: function(){
                                    var grid = Ext.getCmp('gridWorkOrderActivityDetail');
                                    var selModel = grid.getSelectionModel();
                                    me.store.remove(selModel.getSelection());
                                    selModel.select(0);
                                }
                            }
                            ]
                    }],
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'gridWorkOrderActivityDetail',
                            store: me.store,
                            height: 165,
                            plugins: [me.editor],
                            autoScroll: true,
                            columns: [
                                {
                                    text: 'Id Work Order Activity Detail',
                                    dataIndex: 'idWorkOrderActivityDetail',
                                    flex: 1,
                                    hidden:true
                                },
                                {
                                    text: 'Id Work Order Activity',
                                    dataIndex: 'idWorkOrderActivity',
                                    flex: 1,
                                    hidden:true
                                },
                                {
                                    text: me.messages.activityDate,
                                    dataIndex: 'activityDate',
                                    width: 70,
                                    renderer: function(value){
                                        return Ext.util.Format.date(value,'d-m-Y');
                                    },
                                    editor:{
                                        xtype: 'datefield',
                                        format: 'd-m-Y'
                                    }
                                },
                                {
                                    text: me.messages.manHours,
                                    dataIndex: 'manHours',
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield',
                                        minValue: 0
                                    }
                                },
                                {
                                    text: me.messages.machineHours,
                                    dataIndex: 'machineHours',
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield',
                                        minValue: 0
                                    }
                                },
                                {
                                    text: me.messages.description,
                                    dataIndex: 'description',
                                    flex: 4,
                                    tips: {
                                    trackMouse: true,
                                    width: 140,
                                    height: 28,
                                    renderer: function(storeItem, item) {
                                      this.setTitle('como  lo haces');
                                    }
                                  },
                                    editor: {
                                        xtype: 'textareafield',
                                        maxLength: 255
                                    }
                                },
                                {
                                    dataIndex: 'isValid',
                                    width: 20,
                                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        Ext.BaseAjax.request({
                                            url:'rest/workOrder/getCurrentDate.htm',
                                            method: 'POST',
                                            async: false,
                                            success: function(response, options){
                                                var data = Ext.JSON.decode(response.responseText);
                                                record.data.isValid = me.validActivityDate(record, Ext.Date.parse(data.currentDate, 'Y-m-d'));
                                                if(record.data.isValid != undefined){
                                                    if(record.data.isValid == '1'){
                                                        metaData.tdCls = 'checked';
                                                    }
                                                    else if(record.data.isValid == '2'){
                                                        metaData.tdCls = 'alertCalendar';
                                                    }
                                                    else if(record.data.isValid == '0'){
                                                        metaData.tdCls = 'error';
                                                    }
                                                }
                                            }
                                        });
                                        return '';
                                    }    
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    margins: '5 0 5 0',
                    items: [
                         {
                            xtype: 'component',
                            margins: '5 0 0 0',
                            html : Ext.String.format('<spam><img src="{0}"/> ' + me.messages.leyendValid + '</spam><br><spam><img src="{1}"/> ' + me.messages.leyendInvalid + '</spam><br><spam><img src="{2}"/> ' + me.messages.leyendAlertCurrentDate + '</spam>', 
                                    sisprod.getApplication().getImagePath('accept.png'),
                                    sisprod.getApplication().getImagePath('error.png'),
                                    sisprod.getApplication().getImagePath('alertCalendar.png')),
                            flex: 2
                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    },
            
    getRecord: function(){
        return this.record;
    },
            
    getSelectorModel: function(){
        return this.selectorModel;
    },
            
    validActivityDate: function(record, currentDate){
        var txtExecutionStartDate = Ext.getCmp('executionStartDate');
        var txtExecutionEndDate = Ext.getCmp('executionEndDate');
        var returnValue = '1';
        if(Ext.isDefined(txtExecutionStartDate) && Ext.isDefined(txtExecutionEndDate)){
            var startDate = txtExecutionStartDate.getValue();
            var endDate = txtExecutionEndDate.getValue();
            if(record.data.activityDate == null || record.data.activityDate == ''){
                returnValue = '0';
            }
            if((startDate == null || startDate == '') && (endDate != null && endDate != '')){
                if(record.data.activityDate > endDate){
                    returnValue = '0';
                }
            }
            else if((endDate == null || endDate == '') && (startDate != null && startDate != '')){
                if(record.data.activityDate < startDate){
                    returnValue = '0';
                }
            }
            else if(record.data.activityDate < startDate || record.data.activityDate > endDate){
                if(record.data.activityDate < startDate || record.data.activityDate > endDate){
                    returnValue = '0';
                }
            }
            
            if(returnValue === '1'){
                if(Ext.isDefined(currentDate)){
                    if(record.data.activityDate > currentDate){
                        returnValue = '2';
                    }
                }
            }
        }
        return returnValue;
    }
});