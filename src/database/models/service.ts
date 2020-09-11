import mongoose, { Document } from 'mongoose'
import serviceSchema from './../schema/service'

export interface IService extends Document {
        serviceId: string;
        serviceName: string
        serviceDisplayName: string
        category: string;
        serviceType: string[];
        description: string;
        contentLink: string;
        icon: string;
        formData: Object;
        meta: string;
}
export default mongoose.model<IService>('Service', serviceSchema)
