/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.BloodGroup.UpdateBloodGroup', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateBloodGroup',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        bloodGroupNameLabel:'Blood Group'
    },
    
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Blood Group',
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
                name: 'idBloodGroup'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'bloodGroupName',
                fieldLabel: me.messages.bloodGroupNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 5
            }
        ]
    },
    me.callParent(arguments);    
    }
});