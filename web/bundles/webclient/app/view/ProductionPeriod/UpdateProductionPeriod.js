Ext.define('sisprod.view.ProductionPeriod.UpdateProductionPeriod', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateProductionPeriod',
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
                    xtype: 'textfield',
                    name: 'productionPeriodDate',
                    id: 'productionPeriodDate',
                    fieldLabel: me.messages.formFields.productionPeriodDate,
                    readOnly:true
                },
                {
                    xtype: 'textareafield',
                    name: 'productionPeriodComment',
                    fieldLabel: me.messages.formFields.productionPeriodComment,
                    maxLength: 1024
                },
                {
                    xtype: 'textfield',
                    name: 'idProductionPeriod',
                    id: 'idProductionPeriod',
                    fieldLabel: 'id',
                    hidden: true
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