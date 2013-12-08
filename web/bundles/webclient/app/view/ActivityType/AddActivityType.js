/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ActivityType.AddActivityType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addActivityType',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        activityTypeNameLabel:'Activity Type'
    },
    
    title: 'Add Activity Type',
    modal: true,
    width: 400,    
//    height: 150,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
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