/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevelType.AddFluidLevelType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addFluidLevelType',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Fluid Level Type',
    messages: {
        fluidLevelTypeName: 'Name',
        fluidLevelTypeAcronym: 'Acronym'
    },
    modal: true,
    width: 400,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            items: [
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