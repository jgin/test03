/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ExtractionType.UpdateExtractionType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateExtractionType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Extraction Type',
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
                     xtype: 'textfield',
                     name : 'idExtractionType',
                     fieldLabel: me.messages.msgId,
                     hidden:true  
                },
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