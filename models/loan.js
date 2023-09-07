const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema(
{
    user: 
    { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: 
    { 
        type: Number, 
        required: true 
    },
    term: 
    { 
        type: Number, 
        required: true 
    },
    repayments: 
    [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Repayment' 
        }
    ],
    status: 
    {
        type: String,
        enum: ['PENDING', 'APPROVED', 'PAID'],
        default: 'PENDING',
    },
},
{
    timestamps: true
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
