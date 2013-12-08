Ext.define('sisprod.model.ProductionPeriodModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idProductionPeriod', type: 'int', visible: false},
        {name: 'productionPeriodDate', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'productionPeriodStatus.productionPeriodStatusName', type: 'string', visible: true, 
            mapping: 'productionPeriodStatus.productionPeriodStatusName'},
        {name: 'productionPeriodComment', type: 'string', visible: true}
    ],
    
    idProperty: 'idProductionPeriod'
});