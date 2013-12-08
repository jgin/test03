/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.PPEquipment.UpdatePPEquipment', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updatePPEquipment',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        descriptionLabel:'Description',
        isToolLabel:'Is Tool'
    },
    
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Equipment',
    modal: true,
    width: 400,
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        
        items: [
            {
                xtype: 'hiddenfield',
                id: 'idPPEquipment',
                name: 'idPPEquipment'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'description',
                fieldLabel: me.messages.descriptionLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 200
            },
            {
                xtype: 'checkboxfield',
                grow: true,
                id: 'isTool',
                name: 'isTool',
                fieldLabel: me.messages.isToolLabel,
                anchor: '100%'
//                allowBlank: false
            }
        ]
    },
    me.callParent(arguments);    
    }
});