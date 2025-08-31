import { JsonInitializable } from "./json-initializable.class";

export class LakshPlant extends JsonInitializable {
    name: string;
    image?: string;
    description?: string;

    constructor(data?: Partial<LakshPlant>) {
        super(data);
    }
}