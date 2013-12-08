/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ActivityOt.UpdateActivityOt', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateActivityOt',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        descriptionLabel:'Description'
    },
    
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Activity',
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
                name: 'idActivityOt'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'description',
                fieldLabel: me.messages.descriptionLabel,
//                fieldStyle: {
//                    textTransform: 'uppercase'
//                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 200
            }
        ]
    },
    me.callParent(arguments);    
    }
});