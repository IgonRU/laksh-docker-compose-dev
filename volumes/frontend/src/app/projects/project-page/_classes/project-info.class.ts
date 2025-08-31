import { JsonInitializable } from "../../../_classes/json-initializable.class";
import { LakshPlant } from "../../../_classes/plant.class";
import { LakshProjectFeature } from "./project-feature.class";

export class LakshProjectInfo extends JsonInitializable {
    type: string;
    region: string;
    style: string;
    area: number;
    startYear: number;
    endYear: number;
    
    plantsTotal: number;
    plantsList: LakshPlant[];
    features: LakshProjectFeature[];

    constructor(data?: any) {
        // Настраиваем маппинги для вложенных классов
        const nestedClassMappings = {
            'plantsList': {
                class: LakshPlant
            },
            'features': {
                class: LakshProjectFeature
            }
        };

        super(data, undefined, nestedClassMappings);
    }
}