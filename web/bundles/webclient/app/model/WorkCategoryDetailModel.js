Ext.define('sisprod.model.WorkCategoryDetailModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkCategory', type: 'int', visible: false, mapping: 'workCategory.idWorkCategory'},
        {name: 'workCategoryName', type: 'string', visible:true, mapping: 'workCategory.workCategoryName'},
        {name: 'idWorkCategoryDetail', type: 'int', visible: false},
        {name: 'workCategoryDetailName', type: 'string', visible: true}
//        {name: 'workCategoryDetailTpl', type: 'string', visible: false,
//            convert: function(value, record){
//                var data = record.raw;
//                return Ext.String.format('{0} ({1})', data['workCategoryDetailName'], data['workCategory']['workCategoryName']);
//            }
//        }
    ],
    
//    belongsTo: [
//        {
//            name: 'workCategory',
//            associationKey: 'workCategory',
//            model: 'sisprod.model.WorkCategory',
//            foreignKey: 'idWorkCategory'
//        }
//    ],

    idProperty: 'idWorkCategoryDetail'
});