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
    remaingTerm:
    {
        type: Number,
        required: true
    },
    completedTerm:
    {
        type: Number,
        required: true,
        default: 0,
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