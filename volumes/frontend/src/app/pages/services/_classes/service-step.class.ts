import { JsonInitializable } from "../../../_classes/json-initializable.class";

export class LakshServiceStep extends JsonInitializable {
    title: string;
    description: string;
    image?: string | null;
}