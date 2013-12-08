Ext.define('sisprod.model.RimeMatrixModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idRimeMatrixDetail', type: 'int', visible: false},
        {name: 'idRimeMatrix', type: 'int', visible: false, mapping: 'rimeMatrix.idRimeMatrix'},
        {name: 'rimeMatrix.effectiveStartDate', type: 'date', dateFormat: 'Y-m-d', visible: true, mapping: 'rimeMatrix.effectiveStartDate'},
        {name: 'workCategoryDetail.workCategory.workCategoryName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategory.workCategoryName'},
        {name: 'workCategoryDetail.workCategoryDetailName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategoryDetailName'},
        {name: 'rimeCriteria.rimeCriteriaName', type: 'string', visible: true, mapping: 'rimeCriteria.rimeCriteriaName'},
        {name: 'rimeCriteria.rimeCriteriaLevel', type: 'string', visible: true, mapping: 'rimeCriteria.rimeCriteriaLevel'},
        {name: 'rimeIndex', type: 'int', visible: true},
        {name: 'maximumTimeAttention', type: 'int', visible: true}
//        {name: 'maximumTimeAttention', type: 'int', visible: true},
    ],

    idProperty: 'idRimeMatrix'
});