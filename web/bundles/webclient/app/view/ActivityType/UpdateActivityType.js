/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ActivityType.UpdateActivityType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateActivityType',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        activityTypeNameLabel:'Activity Type'
    },
    
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Activity Type',
    modal: true,
    width: 400,
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idActivityType'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'activityTypeName',
                fieldLabel: me.messages.activityTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 200
            }
        ]
    },
    me.callParent(arguments);    
    }
});