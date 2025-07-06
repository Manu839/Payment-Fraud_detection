import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  XCircle,
  HelpCircle,
  X,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

import { Button, Input, Label } from "@/components/ui/base-elements";
import { Card } from "@/components/ui/card";
import { SimpleAlertDialog } from "@/components/ui/overlay-elements";

import Header from "./Header";
import SidebarContent from "./SidebarContent";
import { auth, db } from "./firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { transactionSamples } from "./data";
import TransactionSimulation from "../logic/TransactionSimulation";
import { cn } from "@/lib/utils";

const remarkOptions = [
  { value: "rent", label: "Rent" },
  { value: "utilities", label: "Utilities" },
  { value: "groceries", label: "Groceries" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

const generateUPIId = (name) => {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  const base = name.split(" ")[0].toLowerCase();
  return `${base}${suffix}@yesbank`;
};

const getRandomTransaction = () => {
  const i = Math.floor(Math.random() * transactionSamples.length);
  return transactionSamples[i];
};

export default function Homepage() {
  const [user, setUser] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [recipientUpiId, setRecipientUpiId] = useState("");
  const [amount, setAmount] = useState(10000);
  const [remarks, setRemarks] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user: loggedIn } = await signInWithPopup(auth, provider);
      setUser(loggedIn);
      const ref = doc(db, "users", loggedIn.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        const genUPI = generateUPIId(loggedIn.displayName || "user");
        const { user_friendly, model_processed } = getRandomTransaction();
        await setDoc(ref, {
          uid: loggedIn.uid,
          name: loggedIn.displayName,
          email: loggedIn.email,
          photoURL: loggedIn.photoURL,
          upiId: genUPI,
          createdAt: serverTimestamp(),
          transactionDetails: user_friendly,
          modelData: model_processed,
        });
        setUpiId(genUPI);
      } else {
        setUpiId(snap.data().upiId);
      }
    } catch (err) {
      console.error("Google sign‑in error: ", err);
    }
  };

  const handleVerifyUPI = async () => {
    if (!recipientUpiId.trim()) {
      setVerificationStatus("invalid");
      return;
    }
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("upiId", "==", recipientUpiId));
      const snap = await getDocs(q);
      if (snap.empty) {
        setVerificationStatus("invalid");
        return;
      }
      const modelData = snap.docs[0].data().modelData;
      const features = Object.keys(modelData).map((k) => modelData[k] || 0);
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      }).then((r) => r.json());

      setVerificationStatus(res.prediction[0] === 1 ? "fraud" : "valid");
    } catch (err) {
      console.error(err);
      setVerificationStatus("invalid");
    }
  };

  const handleSeeWhy = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("upiId", "==", recipientUpiId));
      const snap = await getDocs(q);
      if (snap.empty) return;
      const friendly = snap.docs[0].data().transactionDetails || {};
      setTransactionData(Object.entries(friendly));
      setShowPopup(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const curr = auth.currentUser;
    if (!curr) return;
    (async () => {
      setUser(curr);
      const snap = await getDoc(doc(db, "users", curr.uid));
      if (snap.exists()) setUpiId(snap.data().upiId);
    })();
  }, []);

  if (!user)
    return (
      <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 via-green-100 to-green-50 text-green-800">
        <h1 className="text-4xl font-bold mb-8">Welcome to SafePay AI</h1>
        <Button onClick={handleGoogleSignIn} className="bg-green-500 hover:bg-green-600 text-white">
          Sign in with Google
        </Button>
      </motion.div>
    );

  return (
    <motion.div className="min-h-screen flex bg-gradient-to-br from-green-100 via-green-50 to-white text-green-900">
      <aside className="hidden md:flex w-72 flex-col border-r border-green-200 bg-green-50">
        <SidebarContent />
      </aside>

      <main className="flex-1">
        <Header user={user} onSignIn={handleGoogleSignIn} />

        <div className="p-6 max-w-2xl mx-auto">
          <Card className="border-green-200 bg-white shadow-md">
            <div className="flex items-center justify-between p-4 border-b border-green-200 bg-green-100">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h3 className="text-lg font-semibold text-green-800">Pay to UPI ID</h3>
              </div>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              <div className="space-y-2">
                <Label>To UPI ID</Label>
                <div className="flex space-x-2">
                  <Input
                    value={recipientUpiId}
                    onChange={(e) => {
                      setRecipientUpiId(e.target.value);
                      setVerificationStatus(null);
                    }}
                    className="bg-green-50 border-green-300 text-green-800"
                  />
                  <Button onClick={handleVerifyUPI} className="bg-green-500 hover:bg-green-600 text-white">
                    Verify
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {verificationStatus && (
                    <motion.div
                      key={verificationStatus}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cn(
                        "p-4 rounded-lg mt-2",
                        verificationStatus === "valid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      )}
                    >
                      {verificationStatus === "valid" && (
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          Verified – UPI ID is valid
                        </div>
                      )}
                      {verificationStatus === "fraud" && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Fraudulent – do not proceed
                          </div>
                          <Button variant="outline" size="sm" onClick={handleSeeWhy}>
                            See Why <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                      {verificationStatus === "invalid" && (
                        <div className="flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-red-500" />
                          Invalid UPI ID
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <Label>Enter Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 bg-green-50 border-green-300 text-green-800"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Add Remarks (Optional)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {remarkOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      variant="outline"
                      className={cn(
                        "h-10 border-green-300 text-green-800",
                        remarks === opt.value &&
                          "bg-green-500 text-green-900 border-green-500"
                      )}
                      onClick={() => setRemarks(opt.value)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-green-200 bg-green-50 p-4">
              <Button
                onClick={() => setShowSimulation(true)}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white"
              >
                Send Money
              </Button>
            </div>
          </Card>

          {showSimulation && (
            <TransactionSimulation
              upiId={recipientUpiId}
              amount={amount}
              remarks={remarks}
              senderUPI={upiId}
              onClose={() => setShowSimulation(false)}
            />
          )}
        </div>
      </main>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-lg max-w-md w-full"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-bold text-green-800">Transaction Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowPopup(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
              <div className="p-6 max-h-64 overflow-y-auto">
                {transactionData.length ? (
                  <ul className="space-y-2 text-sm">
                    {transactionData.map(([k, v]) => (
                      <li key={k}>
                        <strong>{k}:</strong> {v}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No data found</p>
                )}
              </div>
              <div className="p-4 border-t text-right">
                <Button onClick={() => setShowPopup(false)} className="bg-green-500 hover:bg-green-600 text-white">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {alertOpen && (
        <SimpleAlertDialog
          title="Why is this UPI ID flagged?"
          description="Multiple reported scams are linked to this UPI ID. Do NOT proceed."
          onConfirm={() => setAlertOpen(false)}
        />
      )}
    </motion.div>
  );
}
