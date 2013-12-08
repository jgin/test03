Ext.define('sisprod.model.MeasureUnitTypeModel',{
    extend:'Ext.data.Model',
    
    require: [
        'Ext.data.Model'
    ],
    
    fields:[
        {name:'idMeasureUnitType', type: 'int', visible: false},
        {name:'measureUnitTypeName', type:'string', visible: true}
    ],
    
    idProperty:'idMeasureUnitType'
});


