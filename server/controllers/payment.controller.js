import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto"
export const createOrder = async (req, res) => {
    try {
        const {planId,amount,credits} = req.body;

        if(!planId || !amount || !credits){
            return res.status(400).json({message:"All fields are required"})
        }
        const options = {
            amount: amount*100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);

        if(!order){
            return res.status(500).json({message:"Failed to create order"})
        }

        await Payment.create({
            userId:req.userId,
            planId,
            amount,
            credits,
            razorpayOrderId:order.id,
            status:"created",
        })

        return res.json(order);

    } catch (error) {
        return res.status(500).json({message:"failed to create razorpay order", error:error.message})
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {razorpayPaymentId, razorpayOrderId, razorpaySignature} = req.body;

        const body= razorpayOrderId + "|" + razorpayPaymentId;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body)
        .digest("hex");

        if(expectedSignature !== razorpaySignature){
            return res.status(400).json({message:"Invalid payment signature"})
        }

        const payment = await Payment.findOne({razorpayOrderId});

        if(!payment){
            return res.status(404).json({message:"Payment record not found"})
        }
        if(payment.status === "paid"){
            return res.status(400).json({message:"Payment already verified"})
        }

        //update payment record
        payment.status = "paid";
        payment.razorpayPaymentId = razorpayPaymentId;
        await payment.save();

        //add credits to user account
        const updatedUser  = await User.findByIdAndUpdate(payment.userId, {$inc:{credits:payment.credits}},{new:true});

        res.json({
            success:true,
            message:"Payment verified and credits added successfully",
            user:updatedUser,
        })

    } catch (error) {
        return res.status(500).json({message:"failed to verify payment", error:error.message})
    }
}