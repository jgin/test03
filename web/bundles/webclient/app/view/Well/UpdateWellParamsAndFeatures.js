
Ext.define('sisprod.view.Well.UpdateWellParamsAndFeatures', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellParamsAndFeatures',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoScroll: true,
    modal: true,
    width: 600,
    maxHeight: 500,
    
    showWarningBeforeCancel: true,
    
    /**
     * Pozo a actualizar sus parámetros
     */
    well: null,
    
    /**
     * Tipo de edición de parámetros
     * Es uno de los valroes definidos en WellController
     */
    featureEditionType: null,

    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 5,
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'productionPeriodDate',
                            fieldLabel: me.messages.formFields.productionPeriodDate,
                            margins: '0 5 0 0',
                            readOnly: true,
                            flex : 1
                        },
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'wellCode',
                            fieldLabel: me.messages.formFields.well,
                            margins: '0 5 0 0',
                            readOnly: true,
                            flex : 1
                        }
                    ]
                },
                {
                    xtype : 'fieldset',
                    title : me.messages.formFields.wellParametersFieldSet,
                    layout : 'hbox',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            layout : 'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: "box",
                                    autoEl: {cn: "<label class='x-form-item-label x-unselectable x-form-item-label-left'>"+me.messages.formFields.wellCycle+":"+"</label>"},
                                    margins: '0 5 5 0'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'onCycle',
                                    margins: '0 5 5 0',
                                    flex:1
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'offCycle',
                                    margins: '0 5 5 0',
                                    flex:1
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            readOnly : true,
                            grow: true,
                            name: 'onHours',
                            fieldLabel: me.messages.formFields.onHours,
                            margins: '0 5 5 0',
                            flex : 1
                        },
                        {
                            xtype: 'textfield',
                            readOnly : true,
                            grow: true,
                            name: 'offHours',
                            fieldLabel: me.messages.formFields.offHours,
                            margins: '0 5 5 0',
                            flex : 1
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    name: 'featuresPanel',
                    layout: 'vbox'
                }
            ]
        };        
        me.callParent(arguments);
    }
    
});