/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.ProductionPeriod.AddProductionPeriod', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addProductionPeriod',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    modal: true,
    width: 460,
    
    showWarningBeforeCancel: true,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 5,
            items: [
                {
                    xtype: 'datefield',
                    name: 'productionPeriodDate',
                    id: 'productionPeriodDate',
                    value : new Date(),
                    fieldLabel: me.messages.formFields.productionPeriodDate,
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    name: 'productionPeriodComment',
                    fieldLabel: me.messages.formFields.productionPeriodComment,
                    maxLength: 1024
                }
            ],
            fieldDefaults: {
                labelWidth: 100,
                margins: '0 0 0 5',
                anchor: '100%'
            }
        };
        
        me.callParent(arguments);
    }
    
});