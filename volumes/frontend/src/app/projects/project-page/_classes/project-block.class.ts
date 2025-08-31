import { JsonInitializable } from "../../../_classes/json-initializable.class";

export interface LakshProjectBlockData {
  title?: string;
  subtitle?: string;
  text?: string;
  description?: string;
  image?: string;
  images?: string[];
}

export class LakshProjectBlock extends JsonInitializable {
  type: 'text' | 'image' | 'fixed' | 'gallery';
  data: LakshProjectBlockData;

  constructor(data?: any) {
    super(data);
  }
}
