/* 
 * To change this template, choose Products | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ProductType.UpdateProductType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateProductType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        productTypeNameLabel:'Name',
        productTypeAcronymLabel:'Acronym'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Product Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idProductType'
            },
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