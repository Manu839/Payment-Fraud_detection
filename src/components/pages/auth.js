import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import mappedTransactions from "./mapped_transactions.json"

const generateUPIId = (name) => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const baseName = name.split(" ")[0].toLowerCase(); // 
  return `${baseName}${randomSuffix}@expressbank`;
};

// Function to randomly assign a transaction to a user
const getRandomTransaction = () => {
  const randomIndex = Math.floor(Math.random() * mappedTransactions.length);
  return mappedTransactions[randomIndex];
};

export const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {

        const upiId = generateUPIId(user.displayName || "user");

        // Get a random transaction from the mapped transactions
        const { user_friendly, model_processed } = getRandomTransaction();

        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          upiId: upiId,
          createdAt: serverTimestamp(),
          transactionDetails: user_friendly,
          modelData: model_processed
        });

        console.log("New user created with UPI ID:", upiId);
        console.log("Assigned Transaction Details:", user_friendly);
      } else {

        const userData = userDoc.data();
        console.log("User already exists:", userData);
      }
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};
