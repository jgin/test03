Ext.define('sisprod.model.SystemScheduledTaskModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'id', type: 'int', visible: false},
        {name: 'taskDescription', type: 'string', visible: true},
        {name: 'lastExecutionDate', visible: true},
        {name: 'activeTask', type: 'boolean', visible: true},
        {name: 'cronExpression', type: 'string', visible: true}
    ],
    
    idProperty: 'id'
});