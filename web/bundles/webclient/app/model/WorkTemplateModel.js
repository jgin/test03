Ext.define('sisprod.model.WorkTemplateModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkTemplate', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'workTemplateName', type: 'string', visible: true},
        {name: 'workCategoryDetail.workCategory.idWorkCategory', type: 'int', visible: false,mapping:'workCategoryDetail.workCategory.idWorkCategory'},
        {name: 'workCategoryDetail.workCategory.workCategoryName', type: 'string', visible: true,mapping:'workCategoryDetail.workCategory.workCategoryName'},
        {name: 'workCategoryDetail.idWorkCategoryDetail', type: 'int', visible: false,mapping:'workCategoryDetail.idWorkCategoryDetail'},
        {name: 'workCategoryDetail.workCategoryDetailName', type: 'string', visible: true,mapping:'workCategoryDetail.workCategoryDetailName'},
        {name: 'manHours', type: 'float', visible: true}, // Ext.data.Types.FLOAT
        {name: 'machineHours', type: 'float', visible: true}
        
    ],

    idProperty: 'idWorkTemplate'
});