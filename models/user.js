const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
{
    name: 
    {
        type: String,
        required: true,
    },
    email: 
    {
        type: String,
        required: true,
        unique: true,
    },
    password: 
    {
        type: String,
        required: true,
    },
    loans: 
    [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Loan' 
        }
    ],
},
{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

export default User;