Ext.define('sisprod.model.WellServiceModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'        
    ],

    fields:[
        {name: 'idSdp', type: 'int', visible: false},
        {name: 'wellServiceType.idWellServiceType', type: 'int', visible: false, mapping:'wellServiceType.idWellServiceType'},
        {name: 'wellServiceType.wellServiceTypeName', type: 'string', visible: true, mapping:'wellServiceType.wellServiceTypeName'},
        {name: 'well.idWell', type: 'int', visible: false, mapping:'well.idWell'},
        {name: 'well.wellName', type: 'string', visible: true, mapping:'well.wellName'},
        {name: 'sdpCompanyMandated.idSdpCompany', type: 'int', visible: false, mapping: 'sdpCompanyMandated.idSdpCompany'},
        {name: 'sdpCompanyMandated.company.companyName', type: 'string', visible: true, mapping: 'sdpCompanyMandated.company.companyName'},
        {name: 'equipment', type: 'string', visible: true},        
        {name: 'supervisorEmployee.person.personFullName', type: 'string', visible: true, mapping: 'supervisorEmployee.person.personFullName'},
        {name: 'sdpDescription', type: 'string', visible: false},
        {name: 'startupDate', type: 'date', dateFormat: 'Y-m-d', visible: false},
        {name: 'finishDate', type: 'date', dateFormat: 'Y-m-d', visible: false},
        {name: 'totalCost', type: 'float', visible: true},
        {name: 'usedFrecuency', type: 'boolean', visible: false},
        {name: 'money.idMoney', type: 'int', visible: false},
        {name: 'money.moneyName', type: 'string', visible: false},
        {name: 'wellTplName', type: 'string', visible: false, mapping:'well.wellName'},
        {name: 'wellServiceTypeTplName', type: 'string', visible: false, mapping:'wellServiceType.wellServiceTypeName'},
        {name: 'updateWellParamsAndFeaturesButton' , type : 'string', visible : true }
    ],

    idProperty: 'idSdp'
});