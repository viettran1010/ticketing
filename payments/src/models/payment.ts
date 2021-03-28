import mongoose from "mongoose";
import {
    updateIfCurrentPlugin
} from "mongoose-update-if-current";

interface PaymentAttrs { // list of properties needed to build an Payment
    orderId: string;
    stripeId: string;
}

interface PaymentDoc extends mongoose.Document { // list of properties an Payment has
    orderId: string;
    stripeId: string;
    // no need for version since payment never gets updated
}

interface PaymentModel extends mongoose.Model < PaymentDoc > { // list of properties the model itself contains
    build(attrs: PaymentAttrs): PaymentDoc; //takes PaymentAttrs and returns a new PaymentDoc
}

const PaymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    stripeId: {
        type: String,
        required: true
    },    
}, {
    toJSON: { // to transform _id to id
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});

PaymentSchema.set('versionKey', 'version'); // tells mongoose not to use __v
PaymentSchema.plugin(updateIfCurrentPlugin) // use plugin

PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs);
};

const Payment = mongoose.model < PaymentDoc,
    PaymentModel > ("Payment", PaymentSchema);

export {
    Payment
};
