/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevelType.UpdateFluidLevelType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateFluidLevelType',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Fluid Level Type',
    messages: {
        fluidLevelTypeName: 'Name',
        fluidLevelTypeAcronym: 'Acronym'
    },
    modal: true,
    width: 400,
//    height: 150,

    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idFluidLevelType'
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'fluidLevelTypeName',
                    fieldLabel: me.messages.fluidLevelTypeName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'fluidLevelTypeAcronym',
                    fieldLabel: me.messages.fluidLevelTypeAcronym,
                    anchor: '40%',
                    allowBlank: false,
                    maxLength: 5,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            ]
        };
        
        me.callParent(arguments);
    }    
});