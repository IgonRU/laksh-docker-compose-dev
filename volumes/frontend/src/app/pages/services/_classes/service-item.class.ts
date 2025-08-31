import { LakshServiceStep } from "./service-step.class";
import { JsonInitializable } from "../../../_classes/json-initializable.class";

export class LakshServiceItem extends JsonInitializable {
    title: string;
    description: string;
    image?: string | null;

    serviceSteps: LakshServiceStep[];

    constructor(data?: Partial<LakshServiceItem>) {
        // Настраиваем маппинги для вложенных классов
        const nestedClassMappings = {
            'serviceSteps': {
                class: LakshServiceStep
            }
        };

        super(data, undefined, nestedClassMappings);
    }
}