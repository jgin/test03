/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DuplicatedWorkRequest.WorkRequestTaskDescription', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.workRequestTaskDescription',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages: {
        labels: {
            taskDescription: 'Task Description'
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
            region: 'center',
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
                            height: 150,
                            allowBlank: false,
                            readOnly: true,
                            value: me.record['description']
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: me.windowMessages.closeText,
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