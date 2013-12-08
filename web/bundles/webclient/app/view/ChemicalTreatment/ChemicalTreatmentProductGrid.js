Ext.define('sisprod.view.ChemicalTreatment.ChemicalTreatmentProductGrid', {
    extend: 'Ext.grid.Panel',
    messages: {
        columnHeaders: {
            chemicalProductName: 'Chemical Product',
            chemicalTreatmentGoal: 'Goal',
            dosage: 'Dosage',
            dosageMeasureUnit: 'Dosage Measure Unit',
            treatmentTime: 'Treatment Time',
            treatmentTimeMeasureUnit: 'Time Measure Unite'
        },
        validation: {
            repeteadItem: 'There are repeated values: {0}'
        },
        buttons: {
            addMessage: 'Add',
            deleteMessage: 'Delete'
        }
    },
    grow: true,
    title: 'Chemical Treatment Products',
    id: 'chemicalTreatmentProductsGrid',
    store: Ext.StoreManager.lookup('chemicalTreatmentProductsStore'),
    heigth: 250,
    constructor: function(config) {
        var me = this;
        me.callParent([config]);
    },
    initComponent: function() {
        var me = this;
        me.columns = [
            {
                text: me.messages.columnHeaders.chemicalProductName,
                dataIndex: 'chemicalProductName',
                flex: 3,
                editor: {
                    allowBlank: false,
                    maxLength: 50
                }
            },
            {
                text: me.messages.columnHeaders.chemicalTreatmentGoal,
                dataIndex: 'chemicalTreatmentGoalName',
                flex: 3,
                editor: {
                    allowBlank: false
                }
            },
            {
                text: me.messages.columnHeaders.dosage,
                dataIndex: 'dosage',
                flex: 3,
                editor: {
                    allowBlank: false
                }
            },
            {
                text: me.messages.columnHeaders.dosageMeasureUnit,
                dataIndex: 'dosageMeasureUnitName',
                flex: 3,
                editor: {
                    allowBlank: false
                }
            },
            {
                text: me.messages.columnHeaders.treatmentTime,
                dataIndex: 'treatmentTime',
                flex: 3,
                editor: {
                    allowBlank: false
                }
            },
            {
                text: me.messages.columnHeaders.treatmentTimeMeasureUnit,
                dataIndex: 'timeMeasureUnitName',
                flex: 3,
                editor: {
                    allowBlank: false
                }
            }
        ];
        me.listeners = {
            'selectionchange': function(view, records) {
                var form = me.up('form');
                form.down('#remove').setDisabled(!records.length);
                form.down('#add').setDisabled(records.length);
                if(Ext.isDefined(form.down('#saveP')) && Ext.isDefined(form.down('#saveP')) !== null)
                    form.down('#saveP').setDisabled(!records.length);
                var idChemicalTreatmenet = form.down('#idChemicalTreatment');
                if (Ext.isDefined(idChemicalTreatmenet)) {
                    if (Ext.isDefined(records[0])) {
                        form.down('#idChemicalTreatmentProduct').setValue(records[0].raw['idChemicalTreatmentProduct']);
                        var cmbChemicalProduct=form.down('#idChemicalProduct');
                        var valIdChemicalProduct= records[0].raw['idChemicalProduct'];
                        cmbChemicalProduct.setValue(valIdChemicalProduct);
                        var cmbChemicalTreatmentGoal=form.down('#idChemicalTreatmentGoal');
                        cmbChemicalTreatmentGoal.setValue(records[0].raw['idChemicalTreatmentGoal']);
                        form.down('#dosage').setValue(records[0].raw['dosage']);
                        var cmbDosageIdMeasureUnit=form.down('#dosageIdMeasureUnit');
                        cmbDosageIdMeasureUnit.select(records[0].raw['dosageIdMeasureUnit']);
                        form.down('#treatmentTime').setValue(records[0].raw['treatmentTime']);
                        form.down('#timeIdMeasureUnit').setValue(records[0].raw['treatmentTimeIdMeasureUnit']);
                        var cmbTimeIdMeasureUnit=form.down('#timeIdMeasureUnit');
                        cmbTimeIdMeasureUnit.setValue(records[0].raw['treatmentTimeIdMeasureUnit']);
                    }
                }
            }
        };
        var store = me.store;
        me.callParent(arguments);
    }
});