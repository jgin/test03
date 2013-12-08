/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestStatus.UpdateWorkRequestStatus', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateWorkRequestStatus',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Request Status',
    messages: {
        labels: {
            workRequestStatusName: 'Name',
            hasCause: 'Has Reasons'
        }
    },
    modal: true,
    width: 400,
    layout: 'fit',
    
    initComponent: function(){
        var me = this;
        
        var formItems = [
            {
                xtype: 'hiddenfield',
                name: 'idWorkRequestStatus'
            },
            {
                xtype: 'textfield',
                name: 'workRequestStatusName',
                fieldLabel: me.messages.labels.workRequestStatusName,
                anchor: '100%',
                allowBlank: false,
                maxLength: 100,
                fieldStyle: {textTransform: 'uppercase'}
            },
            {
                xtype: 'checkboxfield',
                name: 'hasCause',
                id: 'hasCause',
                fieldLabel: me.messages.labels.hasCause,
                anchor: '40%',
                inputValue: true
            },
            {
                xtype: 'colorpickercombo',
                name: 'workRequestStatusColor',
                anchor: '50%',
//                value: '#FFFFFF',
                allowBlank: false
            }
        ];
        formItems.push(Ext.create('sisprod.view.WorkRequestStatus.RequestStatusReasonGrid', {
            id:'updateRequestStatusReasonGrid'
        }));
        
        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };
        
        me.callParent(arguments);
    }
});