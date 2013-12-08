/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.MonthStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MonthModel',
//    autoLoad: false,
    requires: [
        'Ext.data.Store', 
        'sisprod.model.MonthModel'
    ],

    proxy:{
        type: 'memory'
    },
    
    data: [
        {idMonth: '1', monthName: 'Enero'},
        {idMonth: '2', monthName: 'Febrero'},
        {idMonth: '3', monthName: 'Marzo'},
        {idMonth: '4', monthName: 'Abril'},
        {idMonth: '5', monthName: 'Mayo'},
        {idMonth: '6', monthName: 'Junio'},
        {idMonth: '7', monthName: 'Julio'},
        {idMonth: '8', monthName: 'Agosto'},
        {idMonth: '9', monthName: 'Septiembre'},
        {idMonth: '10', monthName: 'Octubre'},
        {idMonth: '11', monthName: 'Noviembre'},
        {idMonth: '12', monthName: 'Diciembre'}
    ]
});