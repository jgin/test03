Ext.define('sisprod.model.SdpActivityDetailModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'        
    ],

    fields:[
        {name: 'idSdpActivityDetail', type: 'int', visible: false},
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.idProductionPeriod'},
        {name: 'productionPeriod.productionPeriodDate', type: 'date',  dateFormat: 'Y-m-d', visible: false, mapping:'productionPeriod.productionPeriodDate'},
        {name: 'wellService.idSdp', type: 'int', visible: false, mapping:'wellService.idSdp'},
        {name: 'wellService.well.idWell', type: 'int', visible: false, mapping:'wellService.well.idWell'},
        {name: 'wellService.well.wellName', type: 'string', visible: true, mapping:'wellService.well.wellName'},
        {name: 'wellService.wellServiceType.wellServiceTypeName', type: 'string', visible: true, mapping:'wellService.wellServiceType.wellServiceTypeName'},        
        {name: 'sdpCompany.idSdpCompany', type: 'int', visible: false, mapping: 'sdpCompany.idSdpCompany'},
        {name: 'sdpCompany.company.companyName', type: 'string', visible: true, mapping: 'sdpCompany.company.companyName'},
        {name: 'sdpActivity.idSdpActivity', type: 'int', visible: false, mapping:'sdpActivity.idSdpActivity'},
        {name: 'sdpActivity.sdpActivityName', type: 'string', visible: true, mapping:'sdpActivity.sdpActivityName'},
        {name: 'description', type: 'string', visible: true},        
        {name: 'totalHour', type: 'float', visible: true},
        {name: 'isCompleted', type: 'boolean',visible: true}
    ],

    idProperty: 'idSdpActivityDetail'
});