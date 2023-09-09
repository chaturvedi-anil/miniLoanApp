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
    totalAmount: 
    { 
        type: Number, 
        required: true 
    },
    remaningAmount:
    {
        type: Number, 
        required: true
    },
    totalTearm:
    {
        type: Number, 
        required: true
    },
    remaningTerm:
    {
        type: Number,
        required: true
    },
    completedTerm:
    {
        type: Number,
        required: true,
    },
    status: 
    {
        type: String,
        enum: ['PENDING', 'PAID'],
        default: 'PENDING',
    },
    paymentDate: 
    { 
        type: String, 
        required: true 
    },
}, 
{
    timestamps: true
});

const Repayment = mongoose.model('Repayment', repaymentSchema);

export default Repayment;