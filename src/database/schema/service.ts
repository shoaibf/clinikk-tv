import { Schema } from "mongoose";

const serviceSchema: Schema = new Schema(
    {
        serviceId: String,
        serviceName: String,
        serviceDisplayName: String,
        category: String,
        serviceType: Array,
        description: String,
        contentLink: String,
        icon: String,
        formData: Object,
        meta: String
    });

export default serviceSchema;
