import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const repaymentSchema = new Schema(
{
    loan: 
    { 
        type: Schema.Types.ObjectId, 
        ref: 'Loan', 
        required: true 
    },
    amount: 
    { 
        type: Number, 
        required: true 
    },
    status: 
    {
        type: String,
        enum: ['PENDING', 'PAID'],
        default: 'PENDING',
    },
    paymentDate: 
    { 
        type: Date, 
        required: true 
    },
}, 
{
    timestamps: true
});

const Repayment = mongoose.model('Repayment', repaymentSchema);

export default Repayment;