/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.BloodGroup.AddBloodGroup', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addBloodGroup',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        bloodGroupNameLabel:'Blood Group'
    },
    title: 'Add Blood Group',
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