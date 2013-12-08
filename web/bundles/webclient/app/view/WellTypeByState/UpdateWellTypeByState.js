/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellTypeByState.UpdateWellTypeByState', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellTypeByState',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Well Type By State',
    modal: true,
    width: 550,
    showWarningBeforeCancel: true,
    messages: {
        msgWellState: 'Well State',
        msgWellTypeByStateName: 'Well Type By State',
        msgAcronym: 'Acronym'
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
                    name : 'idWellTypeByState',
                    fieldLabel: 'id',
                    hidden:true  
                },
                {
                    xtype: 'combobox',
                    grow: true,
                    name: 'idWellState',
                    store: Ext.create('sisprod.store.WellStateAllStore').load(),
                    fieldLabel: me.messages.msgWellState,
                    displayField: 'wellStateName',
                    valueField: 'idWellState',
                    emptyText: 'Seleccione',
                    forceSelection: true,
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'wellTypeByStateName',
                    fieldLabel: me.messages.msgWellTypeByStateName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    margins: '5 5 0 5'
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'wellTypeByStateAcronym',
                    fieldLabel: me.messages.msgAcronym,
                    anchor: '70%',
                    allowBlank: false,
                    maxLength: 10,
                    margins: '5 5 0 5'
                },
                Ext.create('sisprod.view.ExtractionType.ExtractionTypeDetail', {id:'updateExtractionTypeDetail', controller: me.getController()})
            ]
        };
        me.callParent(arguments);
    }
});