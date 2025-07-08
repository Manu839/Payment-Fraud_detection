import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Loader2, ArrowRight, X } from 'lucide-react'
import { Button} from "@/components/ui/base-elements";

import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from './firebase'

const TransactionSimulation = ({ upiId, amount, remarks, senderUPI, onClose }) => {
  const [step, setStep] = useState("details")

  const handleConfirm = async () => {
    setStep("processing")
    try {
      await new Promise(res => setTimeout(res, 3000)) // simulate delay
      await addDoc(collection(db, "transactions"), {
        amount: Number(amount),
        recipientUPI: upiId,
        senderUPI,
        remarks,
        createdAt: serverTimestamp()
      })
      setStep("success")
    } catch (err) {
      console.error("Transaction Error:", err)
      setStep("error")
    }
  }

  const DetailItem = ({ label, value }) => (
    <motion.div
      className="flex justify-between p-4 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
    >
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-lg font-semibold text-white">{value}</span>
    </motion.div>
  )

  const renderStep = {
    details: (
      <motion.div initial="hidden" animate="visible" className="space-y-4">
        <DetailItem label="Recipient UPI ID" value={upiId} />
        <DetailItem label="Sender UPI ID" value={senderUPI} />
        <DetailItem label="Amount" value={`₹${amount}`} />
        <DetailItem label="Remarks" value={remarks || "N/A"} />
        <div className="flex justify-center mt-6">
          <Button onClick={handleConfirm} className="bg-blue-500 text-white">
            Confirm Transaction <ArrowRight className="ml-2" />
          </Button>
        </div>
      </motion.div>
    ),
    processing: (
      <div className="flex flex-col items-center text-center space-y-4">
        <Loader2 className="h-20 w-20 text-blue-500 animate-spin" />
        <p className="text-xl font-semibold text-white">Processing Transaction</p>
        <p className="text-sm text-gray-400">Please wait while we secure your transaction</p>
      </div>
    ),
    success: (
      <div className="flex flex-col items-center text-center space-y-4">
        <CheckCircle className="h-24 w-24 text-green-500" />
        <p className="text-2xl font-bold text-white">Transaction Successful!</p>
        <p className="text-gray-400">Amount: ₹{amount}</p>
        <p className="text-gray-400">Recipient: {upiId}</p>
        <Button onClick={onClose} className="bg-green-600 text-white">Close</Button>
      </div>
    ),
    error: (
      <div className="flex flex-col items-center text-center space-y-4">
        <XCircle className="h-24 w-24 text-red-500" />
        <p className="text-2xl font-bold text-white">Transaction Failed</p>
        <p className="text-gray-400">Please try again later</p>
        <Button onClick={onClose} className="bg-red-600 text-white">Close</Button>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          className="max-w-md w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800"
        >
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">UPI Transaction</h2>
            <Button variant="ghost" className="text-white" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6">
            {renderStep[step]}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TransactionSimulation
