Ext.define('sisprod.view.WellTestType.UpdateWellTestType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellTestType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    modal: true,
    width: 450,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 5,
            items: [
                {
                    xtype: 'textfield',
                    name : 'idWellTestType',
                    id: 'idWellTestType',
                    fieldLabel: 'id',
                    hidden:true  
                },
                {
                    xtype: 'textfield',
                    name: 'wellTestTypeCode',
                    fieldLabel: me.messages.formFields.wellTestTypeCode,
                    maxLength: 5
                },
                {
                    xtype: 'textfield',
                    name: 'wellTestTypeName',
                    fieldLabel: me.messages.formFields.wellTestTypeName,
                    maxLength: 100
                }
            ],
            fieldDefaults: {
                labelWidth: 150,
                margins: '0 0 0 5',
                anchor: '100%'
            }
        };        
        me.callParent(arguments);
    }
    
});