/**
 * Константы маппингов полей для различных источников данных
 */

// Маппинги для API v1
export const API_V1_FIELD_MAPPINGS = {
    // ServiceItem маппинги
    'service_title': 'title',
    'service_description': 'description',
    'service_image': 'image',
    'steps': 'serviceSteps',
    
    // ServiceStep маппинги
    'step_title': 'title',
    'step_description': 'description',
    'step_image': 'image'
};

// Маппинги для API v2
export const API_V2_FIELD_MAPPINGS = {
    // ServiceItem маппинги
    'name': 'title',
    'desc': 'description',
    'img': 'image',
    'service_steps': 'serviceSteps'
};

// Маппинги для API v2 (ServiceStep)
export const API_V2_STEP_FIELD_MAPPINGS = {
    'name': 'title',
    'desc': 'description',
    'img': 'image'
};

// Маппинги для внешнего API
export const EXTERNAL_API_FIELD_MAPPINGS = {
    // ServiceItem маппинги
    'serviceName': 'title',
    'serviceDescription': 'description',
    'serviceImage': 'image',
    'serviceSteps': 'serviceSteps',
    
    // ServiceStep маппинги
    'stepName': 'title',
    'stepDescription': 'description',
    'stepImage': 'image'
};

// Маппинги по умолчанию (без изменений)
export const DEFAULT_FIELD_MAPPINGS = {};
