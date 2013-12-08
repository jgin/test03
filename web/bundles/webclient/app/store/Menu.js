Ext.define('sisprod.store.Menu', {
    extend: 'Ext.data.TreeStore',
    require: [
        'Ext.data.TreeStore'
    ],
    
    autoLoad: true,
    
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/systemMenu/list.htm'
        },
        
        actionMethods: {
            read : 'GET'
        },

        reader: {
            type: 'json',
            root: 'root',
            messageProperty: 'message'
        }
    },
    
    root : {}
    
//    root: {
//        expanded: true,
//        children: [
//            {text: "Inicio", leaf: true, entityName: 'home', iconCls: 'home'},
//            {text: "Módulo de Programación y Planificación", expanded: true, iconCls: 'scheduling',
//                children: [
//                    {text: "Pedido de Trabajo", expanded: true, iconCls: 'workRequest',
//                        children: [
//                            {text: "Pedido de Trabajo", leaf: true, entityName: 'WorkRequest', view: 'List', useController: true, iconCls: 'workRequest'},
//                            {text: "Pedido de Trabajo Duplicados", leaf: true, entityName: 'DuplicatedWorkRequest', view: 'List', useController: true, iconCls: 'duplicate'},
//                            {text: "Anulación de Pedido", leaf: true, entityName: 'AnnullableWorkRequest', view: 'List', useController: true, iconCls: 'annulment'},
//                            {text: "Pre-Planificación de Pedido", leaf: true, entityName: 'PreSchedulingWorkRequest', view: 'List', useController: true, iconCls: 'schedule'},
//                            {text: "Reprogramacion de Pedidos", leaf: true, entityName: 'RescheduleWorkRequest', view: 'List', useController: true, iconCls: 'reschedule'},
//                            {text: "Pedidos Pendientes de Aprobación", leaf: true, entityName: 'WorkRequestPendingApproval', view: 'List', useController: true, iconCls: 'generateOrder'},
//                            {text: "Listado de Pedidos de Trabajo", leaf: true, entityName: 'WorkRequestAll', view: 'List', useController: true, iconCls: 'activityList'}
//                        ]
//                    },
//                    {text: "Orden de Trabajo", expanded: true, iconCls: 'workOrder',
//                        children: [
//                            {text: "Planificación de Orden", leaf: true, entityName: 'SchedulingWorkRequest', view: 'List', useController: true, iconCls: 'generateOrder'},
//                            {text: "Ejecucion de Ordenes", leaf: true, entityName: 'WorkOrderForCoordinator', view: 'List', useController: true, iconCls: 'listOrder'},
//                            {text: "Anulacion de Orden", leaf: true, entityName: 'AnnullableWorkOrder', view: 'List', useController: true, iconCls: 'annulment'},
//                            {text: "Validar Orden", leaf: true, entityName: 'WorkOrderForTaskGeneralScheduler', view: 'List', useController: true, iconCls: 'workOrderClose'},
//                            {text: "Orden de Trabajo Directa", leaf: true, entityName: 'DirectWorkOrder', view: 'List', useController: true, iconCls: 'directWorkOrder'}
//                        ]
//                    },
//                    {text: "Reportes", expanded: true, iconCls: 'reportModule',
//                        children: [
//                            {text: "Backlog de OT", leaf: true, entityName: 'Reports', view: 'WorkOrderBacklog', useController: true, iconCls: 'backlog'},
//                            {text: "Actividades Ejecutadas", leaf: true, entityName: 'Reports', view: 'PerformedActivities', useController: true, iconCls: 'activities'},
//                            {text: "Historial de Estados de PT", leaf: true, entityName: 'Reports', view: 'WorkRequestStatusHistory', useController: true, iconCls: 'statusHistoryPt'},
//                            {text: "Reporte Maestro de PT / OT", leaf: true, entityName: 'Reports', view: 'WorkRequestMaster', useController: true, iconCls: 'reportMaster'}
//                        ]
//                    },
//                    {text: "Indicadores", expanded: false, iconCls: 'indicator',
//                        children: [
////                            {text: "Eficacia de OT", leaf: true, entityName:'Reports', view: 'WorkOrderEfficiency', useController: true, iconCls: 'workOrderEfficiency'},
//                            {text: "Ratios", expanded: false, iconCls: 'ratio',
//                                children: [
//                                    {text: "Días Estimados Por Trabajo", leaf: true, entityName: 'Reports', view: 'WorkOrderRatio', useController: true, iconCls: 'ratio'},
//                                    {text: "Productividad Por Cuadrilla", leaf: true, entityName: 'Reports', view: 'ProductivityByQuadrille', useController: true, iconCls: 'ratio'},
//                                    {text: "Gestion De Trabajo Por Cuadrilla", leaf: true, entityName: 'Reports', view: 'ManagementQuadrilleWork', useController: true, iconCls: 'ratio'},
//                                ]
//                            },
//                            {text: "Indicadores de Eficacia", expanded: false, iconCls: 'indicator',
//                                children: [
//                                    {text: "De Orden de Trabajo", leaf: true, entityName:'Reports', view: 'WorkOrderEfficiency', useController: true, iconCls: 'workOrderEfficiency'},
//                                    {text: "Dias de Retraso Pedido de Trabajo", leaf: true, entityName:'Reports', view: 'EfficacyWorkRequestBacklogDays', useController: true, iconCls: 'workOrderEfficiency'}
//                                ]
//                            },
//                            {text: "Indicadores de Ratio", expanded: false, iconCls: 'indicator',
//                                children: [
//                                    {text: "Por Tipo Trabajo", leaf: true, entityName:'Reports', view: 'WorkOrderRatio', useController: true, iconCls: 'ratio'}
//                                ]
//                            },
//                            {text: "Indicadores de Eficiencia", expanded: false, iconCls: 'indicator',
//                                children: [
//                                    {text: "Duracion de Trabajo", leaf: true, entityName:'Reports', view: 'EfficiencyEstimateDurationWork', useController: true, iconCls: 'workDuration'},
//                                    {text: "Horas Hombre", leaf: true, entityName:'Reports', view: 'EfficiencyManHours', useController: true, iconCls: 'manHours'},
//                                    {text: "Horas Maquina", leaf: true, entityName:'Reports', view: 'EfficiencyMachineHours', useController: true, iconCls: 'machineHours'},
//                                    {text: "Materiales", leaf: true, entityName:'Reports', view: 'EfficiencyProducts', useController: true, iconCls: 'materials'},
//                                    {text: "Actividades", leaf: true, entityName:'Reports', view: 'EfficiencyActivities', useController: true, iconCls: 'activityList'}
//                                ]
//                            }
//                        ]
//                    },
//                    {text: "Mantenimiento", expanded: false, iconCls: 'maintainance',
//                        children: [
//                            {text: "Categoría de Trabajo", leaf: true, entityName: 'WorkCategory', view: 'List', useController: true, iconCls: 'workCategory'},
//                            {text: "Criterio RIME", leaf: true, entityName: 'RimeCriteria', view: 'List', useController: true, iconCls: 'rimeCriteria'},
//                            {text: "Valores de Criterio RIME", leaf: true, entityName: 'RimeCriteriaValue', view: 'List', useController: true, iconCls: 'rimeCriteriaValue'},
//                            {text: "Matriz RIME", leaf: true, entityName: 'RimeMatrix', view: 'List', useController: true, iconCls: 'rimeMatrix'},
//                            {text: "Nivel de Riesgo", leaf: true, entityName: 'RiskLevel', view: 'List', useController: true, iconCls: 'riskLevel'},
//                            {text: "Probabilidad de Ocurrencia", leaf: true, entityName: 'OcurrenceProbability', view: 'List', useController: true, iconCls: 'ocurrenceProbability'},
//                            {text: "Grupo de Criterios", leaf: true, entityName: 'CriteriaGroup', view: 'List', useController: true, iconCls: 'criteriaGroup'},
//                            {text: "Origen de Pedido", leaf: true, entityName: 'WorkRequestSource', view: 'List', useController: true, iconCls: 'workRequestSource'},
//                            {text: "Estados de Pedido", leaf: true, entityName: 'WorkRequestStatus', view: 'List', useController: true, iconCls: 'workRequestStatus'},
//                            {text: "Sector", leaf: true, entityName: 'Sector', view: 'List', useController: true, iconCls: 'sector'},
//                            {text: "Taller", leaf: true, entityName: 'WorkShop', view: 'List', useController: true, iconCls: 'workShop'},
//                            {text: "Cuadrilla", leaf: true, entityName: 'Quadrille', view: 'List', useController: true, iconCls: 'quadrille'},
//                            {text: "Planificadores P&P", leaf: true, entityName: 'TaskGeneralScheduler', view: 'List', useController: true, iconCls: 'taskGeneralScheduler'},
//                            {text: "Plantillas de Orden de Trabajo", leaf: true, entityName: 'WorkTemplate', view: 'List', useController: true, iconCls: 'workTemplate'},
//                            {text: "Estados de Orden", leaf: true, entityName: 'WorkOrderStatus', view: 'List', useController: true, iconCls: 'workOrderStatus'},
//                            {text: "Fechas de Cierre", leaf: true, entityName: 'CloseDateBacklog', view: 'Manage', useController: false, iconCls: 'closingDate'},
//                            {text: "Motivos de OT", leaf: true, entityName: 'WorkOrderReason', view: 'List', useController: true, iconCls: 'urgency'},
//                            {text: "Motivo de no Ejecucion", leaf: true, entityName: 'UnperformedReason', view: 'List', useController: true, iconCls: 'notPerformed'},
//                            {text: "Tipo de Evidencia", leaf: true, entityName: 'EvidenceDocumentType', view: 'List', useController: true, iconCls: 'evidence'},
//                            {text: "Equipos/Herramientas P&P", leaf: true, entityName: 'PPEquipment', view: 'List', useController: true, iconCls: 'equipmentAndTools'},
//                            {text: "Actividades de Trabajo", leaf: true, entityName: 'ActivityOt', view: 'List', useController: true, iconCls: 'activities'}
//                        ]
//                    }
//                ]
//            },
//            {text: "Módulo de Producción", expanded: false, iconCls: 'production',
//                children: [
//                    {text: "Maestra de Pozos", leaf: true, entityName: 'Well', view: 'List', useController: true, iconCls: 'well'},
//                    {text: "Reporte Diario", expanded: false, iconCls: 'report',
//                        children: [
//                            {text: "Fecha de reporte", leaf: true, entityName: 'ProductionPeriod', view: 'List', useController: true, iconCls: 'calendar'},
//                            {text: "Pruebas de pozos", leaf: true, entityName: 'WellTest', view: 'List', useController: true, iconCls: 'test'},
//                            {text: "Produccion Diferida", leaf: true, entityName: 'DeferredProduction', view: 'List', useController: true},
//                            {text: "Aprobar Produccion Diferida", leaf: true, entityName: 'ApprovedDeferredProduction', view: 'List', useController: true},
//                            {text: "Produccion de Baterias", leaf: true, entityName: 'BatteryProduction', view: 'List', useController: true, iconCls: 'gasTargetType'},
//                            {text: "Aprobacion de Produccion de Baterias", leaf: true, entityName: 'BatteryProductionApproved', view: 'List', useController: true, iconCls: 'gasTargetType'},
//                            {text: "Producción Swab", leaf: true, entityName: 'Swab', view: 'List', useController: true, iconCls: 'well'},
//                            {text: "Aprobar Producción Swab", leaf: true, entityName: 'ApprovedSwab', view: 'List', useController: true, iconCls: 'well'},
//                            {text: "Medidas Especiales", leaf: true, entityName: 'SpecialMeasure', view: 'List', useController: true, iconCls: 'measure'},
//                        ]
//                    },
//                    {text: "Programa de Pruebas", leaf: true, entityName: 'TestProgram', view: 'List', useController: true, iconCls: 'test'},
//                    {text: "Pronósticos de Producción", leaf: true, entityName: 'ProductionForecast', view: 'List', useController: true, iconCls: 'forecast'},
//                    {text: "Servicio de Pozos", leaf: true, iconCls: 'wellService'},
//                    {text: "Módulo de Gas Natural", leaf: true, iconCls: 'naturalGas'},
//                    {text: "Tablas de Módulo de Producción", expanded: true, iconCls: 'productionModuleTables',
//                        children: [
//                            {text: "Tipo de pruebas de pozos", leaf: true, entityName: 'WellTestType', view: 'List', useController: true, iconCls: 'wellTestType'},
//                            {text: "Estado de Pozo", leaf: true, entityName: 'WellState', view: 'List', useController: true, iconCls: 'wellState'},
//                            {text: "Tipo de Pozo por Estado", leaf: true, entityName: 'WellTypeByState', view: 'List', useController: true, iconCls: 'wellTypeByState'},
//                            {text: "Grupo de Pozo", leaf: true, entityName: 'WellGroup', view: 'List', useController: true, iconCls: 'wellGroup'},
//                            {text: "Tipo de Pozo por Producción", leaf: true, entityName: 'WellTypeByProduction', view: 'List', useController: true, iconCls: 'wellTypeByProduction'},
//                            {text: "Características de Pozo", leaf: true, entityName: 'WellFeature', view: 'List', useController: true, iconCls: 'wellFeature'},
//                            {text: "Tipo de Destino de Gas", leaf: true, entityName: 'GasTargetType', view: 'List', useController: true, iconCls: 'gasTargetType'},
//                            {text: "Motivo de Produccion Diferida", leaf: true, entityName: 'DeferredProductionReason', view: 'List', useController: true},
//                            {text: "Tipo de Motivo de Produccion Diferida", leaf: true, entityName: 'DeferredProductionType', view: 'List', useController: true}
//
//                        ]
//                    }
//                ]
//            },
//            {text: "Reportes", expanded: false, iconCls: 'reportModule',
//                children: [
//                    {text: "Backlog de OT", leaf: true, entityName: 'Reports', view: 'WorkOrderBacklog', useController: true, iconCls: 'backlog'},
//                    {text: "Historial de Estados de PT", leaf: true, entityName: 'Reports', view: 'WorkRequestStatusHistory', useController: true, iconCls: 'statusHistoryPt'},
//                    {text: "Eficacia de OT", leaf: true, entityName: 'Reports', view: 'WorkOrderEfficiency', useController: true, iconCls: 'workOrderEfficiency'},
//                    {text: "Reporte Maestro de PT / OT", leaf: true, entityName: 'Reports', view: 'WorkRequestMaster', useController: true, iconCls: 'reportMaster'},
//                    {text: "Tratamiento Químico", leaf: true, entityName: 'Reports', view: 'ChemicalTreatment', useController: true, iconCls: 'chemicalTreatment'},
//                    {text: "Días Estimados Por Trabajo", leaf: true, entityName: 'Reports', view: 'WorkOrderRatio', useController: true},
//                    {text: "Productividad De Cuadrillas", leaf: true, entityName: 'Reports', view: 'ProductivityByQuadrille', useController: true}
//                ]
//            },
//            {text: "Tablas Maestras", expanded: false, iconCls: 'maintainance',
//                children: [
//                    {text: "Gestión de Equipos", expanded: false, iconCls: 'equipmentManagement',
//                        children: [
//                            {text: "Caracteristicas", leaf: true, entityName: 'Feature', view: 'List', useController: true, iconCls: 'feature'},
//                            {text: "Tipos de Equipo", leaf: true, entityName: 'EquipmentType', view: 'List', useController: true, iconCls: 'equipmentType'},
//                            {text: "Marcas de Equipo", leaf: true, entityName: 'Mark', view: 'List', useController: true, iconCls: 'mark'},
//                            {text: "Condicion de Equipo", leaf: true, entityName: 'EquipmentCondition', view: 'List', useController: true, iconCls: 'equipmentCondition'},
//                            {text: "Equipos", leaf: true, entityName: 'Equipment', view: 'List', useController: true, iconCls: 'equipment'}
//                        ]
//                    },
//                    {text: 'Gestion de Materiales', expanded: false, iconCls: 'materialsManagement',
//                        children: [
//                            {text: "Tipo de Materiales", leaf: true, entityName: 'ProductType', view: 'List', useController: true, iconCls: 'productType'},
//                            {text: "Materiales", leaf: true, entityName: 'Product', view: 'List', useController: true, iconCls: 'product'}
//                        ]
//                    },
//                    {text: 'Gestion de Herramientas', expanded: false, iconCls: 'toolsManagement',
//                        children: [
//                            {text: "Tipo de Herramientas", leaf: true, entityName: 'ToolType', view: 'List', useController: true, iconCls: 'toolType'},
//                            {text: "Herramientas", leaf: true, entityName: 'Tool', view: 'List', useController: true, iconCls: 'tool'}
//                        ]
//                    },
//                    {
//                        text: "Gestion de Tanque", expanded: false, iconCls: 'tankManagement',
//                        children: [
//                            {text: "Tipo de Tanque", leaf: true, entityName: 'TankType', view: 'List', useController: true, iconCls: 'tankType'},
//                            {text: "Tipo Alternativo de Tanque", leaf: true, entityName: 'AlternativeTankType', view: 'List', useController: true, iconCls: 'alternativeTankType'},
//                            {text: "Tanques", leaf: true, entityName: 'Tank', view: 'List', useController: true, iconCls: 'tank'},
//                            {text: "Tipo de Bateria", leaf: true, entityName: 'BatteryType', view: 'List', useController: true, iconCls: 'batteryType'},
//                            {text: "Bateria", leaf: true, entityName: 'Battery', view: 'List', useController: true, iconCls: 'battery'}
//                        ]
//                    },
//                    {
//                        text: "Gestion de Lotes", expanded: false, iconCls: 'lotsManagement',
//                        children: [
//                            {text: "Lotes", leaf: true, entityName: 'Lot', view: 'List', useController: true, iconCls: 'lot'},
//                            {text: "Zonas", leaf: true, entityName: 'Zone', view: 'List', useController: true, iconCls: 'zone'},
//                            {text: "Yacimiento", leaf: true, entityName: 'Field', view: 'List', useController: true, iconCls: 'field'},
//                            {text: "Formacion", leaf: true, entityName: 'GeoFormation', view: 'List', useController: true, iconCls: 'geoFormation'}
//                        ]
//                    },
//                    {text: "Gestión de Empleados", expanded: false, iconCls: 'employeeManagement',
//                        children: [
//                            {text: "Empleados", leaf: true, entityName: 'Employee', view: 'List', useController: true, iconCls: 'employee'}
//                        ]
//                    },
//                    {text: "Gestión de Empresas", expanded: false, iconCls: 'companyManagement',
//                        children: [
//                            {text: "Empresas", leaf: true, entityName: 'Company', view: 'List', useController: true, iconCls: 'company'},
//                            {text: "Áreas", leaf: true, entityName: 'Dependency', view: 'List', useController: true, iconCls: 'dependency'},
//                            {text: "Tipo de Áreas", leaf: true, entityName: 'DependencyLevel', view: 'List', useController: true, iconCls: 'dependencyLevel'},
//                            {text: "Cargos", leaf: true, entityName: 'Position', view: 'List', useController: true, iconCls: 'position'},
//                        ]
//                    },
//                    {text: "Tipo de Ubicacion", leaf: true, entityName: 'LocationType', view: 'List', useController: true, iconCls: 'locationType'},
//                    {text: "Ubicaciones", leaf: true, entityName: 'Location', view: 'List', useController: true, iconCls: 'location'},
//                    {text: "Tipo de Unidad de Medida", leaf: true, entityName: 'MeasureUnitType', view: 'List', useController: true, iconCls: 'measureUnitType'},
//                    {text: "Unidad de Medida", leaf: true, entityName: 'MeasureUnit', view: 'List', useController: true, iconCls: 'measureUnit'},
//                    {text: "Tipo de Cambio", leaf: true, entityName: 'ExchangeRate', view: 'List', useController: true, iconCls: 'exchangeRate'},
//                    {text: "Moneda", leaf: true, entityName: 'Money', view: 'List', useController: true, iconCls: 'money'},
//                    {text: "Turnos", leaf: true, entityName: 'Turn', view: 'List', useController: true, iconCls: 'turn'},
//                    {text: "Tipo de Actividad", leaf: true, entityName: 'ActivityType', view: 'List', useController: true, iconCls: 'activityType'},
//                    {text: "Tipo de Documento", leaf: true, entityName: 'DocumentType', view: 'List', useController: true, iconCls: 'documentType'},
//                    {text: "Grupo Sanguineo", leaf: true, entityName: 'BloodGroup', view: 'List', useController: true, iconCls: 'bloodGroup'},
//                    {text: "Gestión de Clientes", leaf: true, entityName: 'Customer', view: 'List', useController: true, iconCls: 'customer'}
//                ]
//            },
//            {text: "Registro De Ventas", expanded: false, iconCls: 'sales',
//                children: [
//                    {text: "Venta De Crudo", leaf: true, entityName: 'OilSale', view: 'List', useController: true, iconCls: 'sales'},
//                    {text: "Venta De Gas", leaf: true, entityName: 'GasSale', view: 'List', useController: true, iconCls: 'sales'}
//                ]
//            },
//            {text: "Tratamiento Químico", expanded: false, iconCls: 'chemicalTreatment',
//                children: [
//                    {text: "Tratamiento Químico", leaf: true, entityName: 'ChemicalTreatment', view: 'List', useController: true, iconCls: 'chemicalTreatment'},
//                    {text: "Productos Químicos", leaf: true, entityName: 'ChemicalProduct', view: 'List', useController: true, iconCls: 'chemicalProduct'},
//                    {text: "Objetivos", leaf: true, entityName: 'ChemicalTreatmentGoal', view: 'List', useController: true, iconCls: 'listOrder'}
//                ]
//            },
//            {text: "Auditoría y seguridad", expanded: false, iconCls: 'security',
//                children: [
//                    {text: "Tipo de Usuarios", leaf: true, entityName: 'UserType', view: 'List', useController: true, iconCls: ''},
//                    {text: "Usuarios", leaf: true, entityName: 'SystemUser', view: 'List', useController: true, iconCls: 'user'}
//                ]
//            },
//            {text: "Configuraciónes del Sistema", expanded: false, iconCls: 'configParam',
//                children: [
//                    {text: "Configuraciónes Modulo P & P", leaf: true, entityName: 'ConfigParam', view: 'Add', useController: false, iconCls: 'configParamPP'},
//                    {text: "Configuraciónes Modulo de Producción", leaf: true, entityName: 'ConfigParam', view: 'AddProductionSystem', useController: false, iconCls: 'configParamProductionSystem'},
//                    {text: "Configuraciónes Generales de Sistema", leaf: true, entityName: 'ConfigParam', view: 'AddGeneralSystem', useController: false, iconCls: 'configParamGeneralSystem'},
//                    {text: "Tareas programadas", leaf: true, entityName: 'SystemScheduledTask', view: 'List', useController: true}
//                ]
//            }
////            {text: "Producción", expanded: true,
////                children: [
////                    {text: "Generar fecha de producción", leaf: true, entityName: 'ProductionPeriod', view: 'List', useController: true}
////                ]
////            },
////            {text: "Pruebas de pozos", expanded: true,
////                children: [
////                    {text: "Tipo de pruebas de pozos", leaf: true, entityName: 'WellTestType', view: 'List', useController: true},
////                    {text: "Pruebas de pozos", leaf: true, entityName: 'WellTest', view: 'List', useController: true}
////                ]
////            },
////            {text: "Mantenimiento", expanded: true, iconCls: 'maintainance',
////                children: [
////                    {text: "Tipo de Unidad de Medida", leaf: true, entityName: 'MeasureUnitType', view: 'List', useController: true},                 
////                    {text: "Unidad de Medida", leaf: true, entityName: 'MeasureUnit', view: 'List', useController: true},                 
////                    {text: "Tipo de Cambio", leaf: true, entityName: 'ExchangeRate', view: 'List', useController: true},
////                    {text: "Moneda", leaf: true, entityName: 'Money', view: 'List', useController: true},
////                    {text: "Turnos", leaf: true, entityName: 'Turn', view: 'List', useController: true},
////                    {text: "Tipo de Actividad", leaf: true, entityName: 'ActivityType', view: 'List', useController: true},
////                    {text: "Tipo de Documento", leaf: true, entityName: 'DocumentType', view: 'List', useController: true},
////                    {text: "Grupo Sanguineo", leaf: true, entityName: 'BloodGroup', view: 'List', useController: true},
////                    {text: "Gestión de Clientes", leaf: true, entityName: 'Customer', view: 'List', useController: true}
////                ]
////            },
////            {text: "Reportes", expanded: true,
////                children: [
//////                    {text: "Pedido de Trabajo", leaf: true, entityName:'Reports', view: 'WorkRequests', useController: false}, 
////                    {text: "Pedidos de Trabajo por Estado", leaf: true, entityName:'Reports',view: 'WorkRequestsByStatus', useController: false}, 
////                    {text: "Listado de Pedidos de Trabajo", leaf: true, entityName:'Reports',view: 'ListWorkRequests', useController: false}, 
////                    {text: "Listado de Pedidos de Trabajos Categorizados y Asignados", leaf: true, entityName:'Reports',view: 'ListWorkRequestsAssigned', useController: false}, 
////                    {text: "Pedidos de Trabajos Pendientes", leaf: true, entityName:'Reports',view: 'OutstandingWorkRequests', useController: false}, 
////                    {text: "Orden de Trabajo", leaf: true, entityName:'Reports',view: 'WorkOrder', useController: false}, 
////                    {text: "Horas Hombre por Orden de Trabajo", leaf: true, entityName:'Reports',view: 'ManHoursPerWorkOrder', useController: false}, 
////                    {text: "Equipos y Ordenes de Trabajo ejecutadas en el sitio", leaf: true, entityName:'Reports',view: 'EquipmentAndWorkOrdersExecuted', useController: false}, 
////                    {text: "OT / PT por Categoría", leaf: true, entityName:'Reports',view: 'RequestsAndWorkOrdersByCategory', useController: false}, 
////                    {text: "Matriz Rime", leaf: true, entityName:'Reports',view: 'RimeMatrix', useController: false},
////                    {text: "Equipos", leaf: true, entityName:'Reports',view: 'Equipments', useController: false},
////                    {text: "Talleres", leaf: true, entityName:'Reports',view: 'Workshops', useController: false},
////                    {text: "Comparativo de Pruebas de Producción: Planificado VS Ejecutado Mensual", leaf: true, entityName:'Reports',view: 'ComparativeProductionTest', useController: false},
////                    {text: "Comparativo de Producción SWAB Mensual: Pronosticado VS Producido", leaf: true, entityName:'Reports',view: 'ComparativeSWABProductionMonthly', useController: false}
////
////                ]
////            },
////            {
////                text: "Gestión de Pozos", expanded: true,
////                children: [
////                    {text: "Estado de Pozo", leaf: true, entityName: 'WellState', view: 'List', useController: true},
////                    {text: "Tipo de Pozo por Estado", leaf: true, entityName: 'WellTypeByState', view: 'List', useController: true},
////                    //{text: "Tipo de Extracción", leaf: true, entityName: 'ExtractionType', view: 'List', useController: true},
////                    {text: "Grupo de Pozo", leaf: true, entityName: 'WellGroup', view: 'List', useController: true},
////                    {text: "Tipo de Pozo por Producción", leaf: true, entityName: 'WellTypeByProduction', view: 'List', useController: true},
////                    {text: "Características de Pozo", leaf: true, entityName: 'WellFeature', view: 'List', useController: true},
////                    {text: "Pozos", leaf: true, entityName: 'Well', view: 'List', useController: true},
////                    {text: "Pronósticos de Producción", leaf: true, entityName: 'ProductionForecast', view: 'List', useController: true},
////                    {text: "Programa de Pruebas", leaf: true, entityName: 'TestProgram', view: 'List', useController: true}
////                ]
////            },
////            {
////                text: "Gestion de Lotes", expanded: true,
////                children: [
////                    {text: "Lotes", leaf: true, entityName: 'Lot', view: 'List',useController:true},                
////                    {text: "Zonas", leaf: true, entityName: 'Zone', view: 'List',useController:true}                
////                ]
////            },
////            {
////                text: "Gestion de Equipos", expanded: true,
////                children: [
////                    {text: "Caracteristicas", leaf: true, entityName: 'Feature', view: 'List',useController:true},                
////                    {text: "Tipos de Equipo", leaf: true, entityName: 'EquipmentType', view: 'List',useController:true},                
////                    {text: "Marcas de Equipo", leaf: true, entityName: 'Mark', view: 'List',useController:true},                
////                    {text: "Condicion de Equipo", leaf: true, entityName: 'EquipmentCondition', view: 'List',useController:true},                
////                    {text: "Gestion de Equipos", leaf: true, entityName: 'Equipment', view: 'List',useController:true},
////                    {text: "Tipo de Materiales", leaf: true, entityName: 'ProductType', view: 'List',useController:true},
////                    {text: "Gestion de Materiales", leaf: true, entityName: 'Product', view: 'List',useController:true},
////                    {text: "Tipo de Herramientas", leaf: true, entityName: 'ToolType', view: 'List',useController:true},
////                    {text: "Gestion de Herramientas", leaf: true, entityName: 'Tool', view: 'List',useController:true}
////                ]
////            },
////            {
////                text: "Gestion de Tanque", expanded: true,
////                children: [
////                    {text: "Tipo de Destino de Gas", leaf: true, entityName: 'GasTargetType', view: 'List',useController: true},                
////                    {text: "Tipo de Tanque", leaf: true, entityName: 'TankType', view: 'List',useController: true},               
////                    {text: "Tipo Alternativo de Tanque", leaf: true, entityName: 'AlternativeTankType', view: 'List',useController: true},                
////                    {text: "Gestion de Tanque", leaf: true, entityName: 'Tank', view: 'List',useController: true},                
////                    {text: "Tipo de Ubicacion", leaf: true, entityName: 'LocationType', view: 'List',useController: true},                
////                    {text: "Gestion de Ubicaciones", leaf: true, entityName: 'Location', view: 'List',useController: true},                
////                    {text: "Tipo de Bateria", leaf: true, entityName: 'BatteryType', view: 'List',useController: true},               
////                    {text: "Gestion de Bateria", leaf: true, entityName: 'Battery', view: 'List',useController: true}               
////                ]
////            },
////            {
////                text: "Gestion de Yacimientos", expanded: true,
////                children: [
////                    {text: "Formacion", leaf: true, entityName: 'GeoFormation', view: 'List',useController:true},               
////                    {text: "Yacimiento", leaf: true, entityName: 'Field', view: 'List',useController:true}               
////                ]
////            }
//        ]
//    }
});
