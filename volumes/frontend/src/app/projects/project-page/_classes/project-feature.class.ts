import { JsonInitializable } from "../../../_classes/json-initializable.class";

export class LakshProjectFeature extends JsonInitializable {
    name: string;
    description: string;

    constructor(data?: Partial<LakshProjectFeature>) {
        super(data);
    }
}