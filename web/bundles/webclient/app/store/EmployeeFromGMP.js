Ext.define('sisprod.store.EmployeeFromGMP', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EmployeeTempModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EmployeeTempModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/employee/listPagingWithPatternFromGMP.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idEmployee',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});