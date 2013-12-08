Ext.define('sisprod.model.CompanyModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'        
    ],

    fields:[
        {name: 'idCompany', type: 'int', visible: false},
        {name: 'externalId', type: 'int', visible: false},
        {name: 'entityId', type: 'int', visible: false},
        {name: 'defEntity.entityRuc', type: 'string', visible: true},
        {name: 'companyName', type: 'string', visible: true},        
        {name: 'defEntity.address', type: 'string', visible: false},
        {name: 'defEntity.email', type: 'string', visible: true},
        {name: 'isAuthorized', type: 'boolean', visible: true}
    ],

    idProperty: 'idCompany'
});