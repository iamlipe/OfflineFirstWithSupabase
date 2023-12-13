import { Model, Q, Relation } from "@nozbe/watermelondb";
import { date, readonly, text } from "@nozbe/watermelondb/decorators";


export class Profile extends Model {
    static table = "profiles";
    @text("name") name!: string;
    @readonly @date("created_at") createdAt!: Date;
    @readonly @date("updated_at") updatedAt!: Date;
}
