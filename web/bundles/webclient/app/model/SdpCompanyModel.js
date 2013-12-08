Ext.define('sisprod.model.SdpCompanyModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'        
    ],

    fields:[
        {name: 'idSdpCompany', type: 'int', visible: false},
        {name: 'company.externalId', type: 'int', visible: false,mapping: 'company.externalId'},
        {name: 'company.entityId', type: 'int', visible: false, mapping: 'company.entityId'},
        {name: 'company.defEntity.entityRuc', type: 'string', visible: true, mapping: 'company.defEntity.entityRuc'},
        {name: 'companyName', type: 'string', visible: true, mapping : 'company.companyName'},        
        {name: 'company.defEntity.address', type: 'string', visible: false, mapping : 'company.defEntity.address'},
        {name: 'company.defEntity.email', type: 'string', visible: false, mapping : 'company.defEntity.email'},
        {name: 'company.isAuthorized', type: 'boolean', visible: false, mapping : 'company.isAuthorized'}
    ],

    idProperty: 'idSdpCompany'
});