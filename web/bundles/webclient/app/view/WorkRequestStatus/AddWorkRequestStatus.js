/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestStatus.AddWorkRequestStatus', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addWorkRequestStatus',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Request Status',
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
                value: '#FFFFFF',
                allowBlank: false
            }
        ];
        formItems.push(Ext.create('sisprod.view.WorkRequestStatus.RequestStatusReasonGrid', {
            id:'addRequestStatusReasonGrid'
        }));
        
        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };
        
        me.callParent(arguments);
    }
});