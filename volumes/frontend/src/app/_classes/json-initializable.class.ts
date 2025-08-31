export abstract class JsonInitializable {
    protected fieldMappings: { [key: string]: string } = {};
    protected nestedClassMappings: { [key: string]: { class: any, mappings?: { [key: string]: string } } } = {};

    constructor(data?: any, fieldMappings?: { [key: string]: string }, nestedClassMappings?: { [key: string]: { class: any, mappings?: { [key: string]: string } } }) {
        // Устанавливаем маппинги полей
        if (fieldMappings) {
            this.fieldMappings = { ...fieldMappings };
        }
        
        // Устанавливаем маппинги для вложенных классов
        if (nestedClassMappings) {
            this.nestedClassMappings = { ...nestedClassMappings };
        }
        
        // Инициализируем из JSON
        if (data) {
            this.initializeFromJson(data);
        }
    }

    /**
     * Универсальная инициализация всех полей из JSON
     * @param data - объект с данными для инициализации
     */
    protected initializeFromJson(data: any): void {
        Object.keys(data).forEach(key => {
            const value = data[key];
            
            if (value !== undefined) {
                // Получаем маппинг поля с бэкенда на фронтенд
                const frontendFieldName = this.getFieldMapping(key);
                
                // Проверяем, есть ли специальная обработка для этого поля
                if (this.hasSpecialFieldHandler(frontendFieldName)) {
                    this.handleSpecialField(frontendFieldName, value);
                } else if (this.hasNestedClassMapping(frontendFieldName)) {
                    // Обработка вложенных классов
                    this.handleNestedClass(frontendFieldName, value);
                } else {
                    // Обычное присвоение для всех остальных полей
                    (this as any)[frontendFieldName] = value;
                }
            }
        });
    }

    /**
     * Получает маппинг поля с бэкенда на фронтенд
     * @param backendFieldName - название поля с бэкенда
     * @returns название поля на фронтенде
     */
    protected getFieldMapping(backendFieldName: string): string {
        // Проверяем, есть ли специальный маппинг для этого поля
        if (this.hasFieldMapping(backendFieldName)) {
            return this.getMappedFieldName(backendFieldName);
        }
        
        // По умолчанию возвращаем то же название
        return backendFieldName;
    }

    /**
     * Проверяет, есть ли маппинг для поля с бэкенда
     * @param backendFieldName - название поля с бэкенда
     * @returns true если есть маппинг
     */
    protected hasFieldMapping(backendFieldName: string): boolean {
        return backendFieldName in this.fieldMappings;
    }

    /**
     * Получает название поля на фронтенде по названию с бэкенда
     * @param backendFieldName - название поля с бэкенда
     * @returns название поля на фронтенде
     */
    protected getMappedFieldName(backendFieldName: string): string {
        return this.fieldMappings[backendFieldName] || backendFieldName;
    }

    /**
     * Проверяет, требуется ли специальная обработка для поля
     * @param fieldName - название поля
     * @returns true если поле требует специальной обработки
     */
    protected hasSpecialFieldHandler(fieldName: string): boolean {
        return false;
    }

    /**
     * Обрабатывает специальные поля (переопределяется в наследниках)
     * @param fieldName - название поля
     * @param value - значение поля
     */
    protected handleSpecialField(fieldName: string, value: any): void {
        // Базовая реализация - ничего не делает
        // Переопределяется в наследниках при необходимости
    }

    /**
     * Проверяет, есть ли маппинг для вложенного класса
     * @param fieldName - название поля
     * @returns true если поле содержит вложенный класс
     */
    protected hasNestedClassMapping(fieldName: string): boolean {
        return fieldName in this.nestedClassMappings;
    }

    /**
     * Обрабатывает вложенные классы
     * @param fieldName - название поля
     * @param value - значение поля
     */
    protected handleNestedClass(fieldName: string, value: any): void {
        const nestedMapping = this.nestedClassMappings[fieldName];
        if (!nestedMapping) return;

        const { class: ClassConstructor, mappings } = nestedMapping;

        if (Array.isArray(value)) {
            // Массив вложенных объектов
            const result = value.map(item => new ClassConstructor(item, mappings));
            (this as any)[fieldName] = result;
        } else if (value && typeof value === 'object') {
            // Одиночный вложенный объект
            (this as any)[fieldName] = new ClassConstructor(value, mappings);
        } else {
            // Простое значение
            (this as any)[fieldName] = value;
        }
    }
}
