/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestPendingApproval.PreviewWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.previewWorkRequest',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages: {
        labels: {
            taskDescription: 'Task Description',
            btnApprove: 'Aproving Confirm'
        }
    },
    
    title: 'Work Request Task Description',
    modal: true,
    width: 450,    
    layout: 'fit',
    
    record: {},
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: me.messages.labels.taskDescription,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            name: 'description',
                            id: 'description',
                            allowBlank: false,
                            readOnly: true,
                            height: 150,
                            value: me.record['description']
                        }
                    ]
                }
            ],
            buttons: [
                {
                    xtype: 'button',
                    action: 'approve',
                    iconCls: 'approve',
                    text: me.messages.labels.btnApprove
                },
                {
                    text: me.windowMessages.closeText,
                    iconCls: 'cancel',
                    handler: function() {
                        var window = me;
                        window.close();
                    }
                }
            ]
        };
        me.callParent(arguments);
    }
});