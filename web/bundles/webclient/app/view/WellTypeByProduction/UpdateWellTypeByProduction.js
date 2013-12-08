/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellTypeByProduction.UpdateWellTypeByProduction', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellTypeByProduction',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Well Type by Production',
    modal: true,
    width: 400,
    
    messages: {
        msgId: 'Id',
        msgWellTypeByProductionName: 'Well Type by Production',
        msgAcronym: 'Acronym',
        msgMinPercentage: 'Minimun Percent',
        msgMaxPercentage: 'Maximun Percent'
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 5, 
            fieldDefaults: {
                fieldStyle: {
                    textTransform: 'uppercase'
                }
            },
            items: [ 
                {
                     xtype: 'textfield',
                     name : 'idWellTypeByProduction',
                     fieldLabel: me.messages.msgId,
                     hidden:true  
                },
                {
                     xtype: 'textfield',
                     grow: true,
                     name: 'wellTypeByProductionName',
                     fieldLabel: me.messages.msgWellTypeByProductionName,
                     anchor: '100%',
                     allowBlank: false,
                     maxLength: 100,
                     margins: '5 5 0 5'
                 },
                 {
                     xtype: 'textfield',
                     grow: true,
                     name: 'acronym',
                     fieldLabel: me.messages.msgAcronym,
                     anchor: '70%',
                     allowBlank: false,
                     maxLength: 20,
                     margins: '5 5 0 5'
                 },
                 {
                     xtype: 'numberfield',
                     grow: true,
                     name: 'minPercentage',
                     fieldLabel: me.messages.msgMinPercentage,
                     anchor: '70%',
                     allowBlank: false,
                     minValue: 0,
                     value: 0
                 },
                 {
                     xtype: 'numberfield',
                     grow: true,
                     name: 'maxPercentage',
                     fieldLabel: me.messages.msgMaxPercentage,
                     anchor: '70%',
                     allowBlank: false,
                     minValue: 0,
                     value: 0
                 }
             ]
         };
        me.callParent(arguments);
    }
});