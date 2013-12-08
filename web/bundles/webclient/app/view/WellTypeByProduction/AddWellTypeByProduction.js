/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.WellTypeByProduction.AddWellTypeByProduction', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addWellTypeByProduction',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Well Type by Production',
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