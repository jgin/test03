/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrderReason.UpdateWorkOrderReason', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateWorkOrderReason',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Work Order Reason',
    
    messages: {
        labels:{
            workOrderReasonName: 'Name'
        }
    },
    
    modal: true,
    width: 400,
//    height: 150,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkOrderReason'
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'workOrderReasonName',
                    fieldLabel: me.messages.labels.workOrderReasonName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            ]
        };
        me.callParent(arguments);
    }
});