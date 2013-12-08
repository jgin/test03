/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.WellTypeByState.AddWellTypeByState', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addWellTypeByState',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Well Type By State',
    modal: true,
    width: 550,
    showWarningBeforeCancel: true,
    messages: {
        msgWellState: 'Well State',
        msgWellTypeByStateName: 'Well Type By State',
        msgAcronym: 'Acronym',
        msgAddExtractionTypes: 'Add Extraction Types'
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
                    name: 'idWellState',
                    store: 'WellStateAllStore',
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
                    id: 'wellTypeByStateName',
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    margins: '5 5 0 5'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'wellTypeByStateAcronym',
                            id: 'wellTypeByStateAcronym',
                            fieldLabel: me.messages.msgAcronym,
                            flex: 2,
                            allowBlank: false,
                            maxLength: 10
                        },
                        {
                            xtype: 'button',
                            flex: 1.2,
                            text: me.messages.msgAddExtractionTypes,
                            iconCls: 'addDetail',
                            align: 'center',
                            margins: '0 0 0 5',
                            action: 'addExtractionTypes'
                        }
                    ]
                },
                Ext.create('sisprod.view.ExtractionType.ExtractionTypeDetail', {id:'addExtractionTypeDetail', controller: me.getController(), hidden: true})
            ]
        };
        me.callParent(arguments);
    }
});