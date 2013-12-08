/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.ExtractionType.AddExtractionType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addExtractionType',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Extraction Type',
    modal: true,
    width: 400,
    
    messages: {
        msgWellTypeByState: 'Well Type By State',
        msgExtractionTypeName: 'Extraction Type',
        msgAcronym: 'Acronym',
        msgId: 'id'
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
                     xtype: 'combobox',
                     grow: true,
                     name: 'idWellTypeByState',
                     store: 'WellTypeByStateAllStore',
                     fieldLabel: me.messages.msgWellTypeByState,
                     displayField: 'wellTypeByStateName',
                     valueField: 'idWellTypeByState',
                     emptyText: 'Seleccione',
                     forceSelection: true,
                     anchor: '100%',
                     allowBlank: false
                 },
                 {
                     xtype: 'textfield',
                     grow: true,
                     name: 'extractionTypeName',
                     fieldLabel: me.messages.msgExtractionTypeName,
                     anchor: '100%',
                     allowBlank: false,
                     maxLength: 150,
                     margins: '5 5 0 5',
                     maxLengthText: 'El máximo de caracteres es {0}'
                 },
                 {
                     xtype: 'textfield',
                     grow: true,
                     name: 'extractionTypeAcronym',
                     fieldLabel: me.messages.msgAcronym,
                     anchor: '70%',
                     allowBlank: false,
                     maxLength: 20,
                     margins: '5 5 0 5',
                     maxLengthText: 'El máximo de caracteres es {0}'
                 }
             ]
         };
         me.callParent(arguments);
    }
});