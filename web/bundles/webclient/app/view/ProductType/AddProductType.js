

Ext.define('sisprod.view.ProductType.AddProductType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addProductType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        productTypeNameLabel:'Name'
    },
    title: 'Add Product Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'productTypeName',
                fieldLabel:me.messages.productTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            }
        ]
        }
        me.callParent(arguments);
    }
});