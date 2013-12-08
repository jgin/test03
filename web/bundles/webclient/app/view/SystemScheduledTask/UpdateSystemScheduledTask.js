Ext.define('sisprod.view.SystemScheduledTask.UpdateSystemScheduledTask', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSystemScheduledTask',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    modal: true,
    width: 460,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 5,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'textfield',
                    name: 'taskDescription',
                    readOnly:true,
                    fieldLabel:me.messages.formFields.taskDescription
                },
                {
                    xtype : 'checkboxfield',
                    name : 'activeTask',
                    fieldLabel : me.messages.formFields.activeTask
                },
                {
                    xtype: 'textfield',
                    name: 'cronExpression',
                    fieldLabel: me.messages.formFields.cronExpression,
                    allowBlank: false
                }
            ]
            ,
            fieldDefaults: {
                labelWidth: 100,
                margins: '0 0 0 5',
                anchor: '100%'
            }
        };        
        me.callParent(arguments);
    }
    
});