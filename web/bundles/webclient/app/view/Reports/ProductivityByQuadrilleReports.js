/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Reports.ProductivityByQuadrilleReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    alias: 'widget.productivityByQuadrilleReports',
    closable: true,
    height: 300,
    messages: {
        reportTitle: 'Productivity By Quadrille Report',
        messageText: 'Message',
        labels: {
            lot: 'Lot',
            workCategory: 'Work Category',
            workCategoryDetail: 'Work Type',
            fromDate: 'Start Date',
            toDate: 'End Date',
            print: 'Print',
            resetForm: 'Reset'
        },
        validations: {
            selectWorkCategory: 'Select work category first...'
        },
        workCategoryDetailEmptyText: 'Type work type...'
    },
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '20 0 0 0',
    initComponent: function() {
        var me = this;
        me.items = new Array();
        var form = Ext.create('Ext.form.Panel', {
            title: me.messages.reportTitle,
            frame: true,
            width: 600,
            defaults: {
                labelWidth: 120
            },
            layout: {
                type: 'anchor',
                align: 'center'
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'idLot' + me.id,
                    id: 'idLot' + me.id,
                    labelWidth: 120,
                    store: Ext.create('sisprod.store.LotAll'),
                    fieldLabel: me.messages.labels.lot,
                    displayField: 'lotName',
                    valueField: 'idLot',
                    forceSelection: true,
                    flex: 2
                },
                {
                    xtype: 'combobox',
                    name: 'idWorkCategory' + me.id,
                    id: 'idWorkCategory' + me.id,
                    anchor: '80%',
                    flex: 2,
                    labelWidth: 120,
                    fieldLabel: me.messages.labels.workCategory,
                    store: Ext.create('sisprod.store.WorkCategoryAll').load(),
                    displayField: 'workCategoryName',
                    valueField: 'idWorkCategory',
                    forceSelection: true,
                    allowBlank: false,
                    editable: false
                },
                {
                    xtype: 'sensitivecombocontainer',
                    anchor: '100%',
                    showAddButton: false,
                    sensitiveComboBoxOptions: {
                        flex: 2,
                        hideTrigger: false,
                        labelWidth: 120,
                        name: 'idWorkType' + me.id,
                        id: 'idWorkType' + me.id,
                        fieldLabel: me.messages.labels.workCategoryDetail,
                        store: Ext.create('sisprod.store.WorkCategoryDetailByCategory', {
                            listeners: {
                                beforeload: function(store, operation, options) {
                                    var idWorkCategory = me.down('#idWorkCategory' + me.id).getValue();
                                    if (Ext.isDefined(idWorkCategory) && idWorkCategory !== null) {
                                        if (Ext.isDefined(operation.params) && operation.params !== null)
                                            operation.params.idWorkCategory = idWorkCategory;
                                        else
                                            operation.params = {query: '', idWorkCategory: idWorkCategory};
                                    }
                                    else {
                                        Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectWorkCategory);
                                        return false;
                                    }
                                }
                            }
                        }),
                        emptyText: me.messages.workCategoryDetailEmptyText,
                        forceSelection: true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">', '{workCategoryDetailName}', '</tpl>'),
                        valueField: 'idWorkCategoryDetail',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{workCategoryDetailName}";
                            }
                        }
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: '',
                    defaults: {labelWidth: 120},
                    anchor: '100%',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'dateFrom' + me.id,
                            id: 'dateFrom' + me.id,
                            vtype: 'daterange',
                            endDateField: 'dateTo' + me.id,
                            fieldLabel: me.messages.labels.fromDate,
                            allowBlank: false
                        },
                        {
                            padding: '0 0 0 10',
                            xtype: 'datefield',
                            name: 'dateTo' + me.id,
                            id: 'dateTo' + me.id,
                            fieldLabel: me.messages.labels.toDate,
                            vtype: 'daterange',
                            startDateField: 'dateFrom' + me.id,
                            allowBlank: false
                        }
                    ]
                }
            ],
            buttons: [
                {
                    id: 'btnPrintWorkOrderReports' + me.id,
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function() {
                        if (form.getForm().isValid()) {
                            var values = form.getValues();
                            var lot = 0;
                            var lotName = "Todos";
                            if (values['idLot' + me.id] !== null && !isNaN(values['idLot' + me.id]) && values['idLot' + me.id] !== '') {
                                lot = parseInt(values['idLot' + me.id]);
                                lotName = Ext.getCmp("idLot" + me.id).getRawValue();
                            }
                            var reportLink = Ext.String.format("reports.htm?reportName=work_order_quadrille_ratio.rptdesign&id_lot={0}" +
                                    "&id_work_category_detail={1}&start_Date={2}&end_date={3}&work_category_detail_name={4}&lot_name={5}&rp_Title={6}",
                                    lot,
                                    values['idWorkType' + me.id],
                                    sisprod.getApplication().formatSpanishDate(values['dateFrom' + me.id]),
                                    sisprod.getApplication().formatSpanishDate(values['dateTo' + me.id]),
                                    Ext.getCmp('idWorkType' + me.id).getRawValue(),
                                    lotName,
                                    "Productividad Por Cuadrilla");
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: reportLink,
                                    defaultFormat: sisprod.BasePrintWindow.XLS,
                                    hiddenTitle: true
                                }
                            });
                            printWindow.show();
                        }
                    }
                },
                {
                    id: 'btnClearProductivity',
                    text: me.messages.labels.resetForm,
                    iconCls: 'clear',
                    handler: function() {
                        form.getForm().reset();
                    }
                }
            ]
        });
        me.items.push(form);
        me.callParent(arguments);
    }
});