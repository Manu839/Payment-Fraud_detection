import { useEffect, useState } from "react";
import { Button } from "@/components/ui/base-elements";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Header from "./Header";
import SidebarContent from "./SidebarContent";
import { handleGoogleSignIn } from "./auth";
import { DollarSign, CreditCard, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";
import {
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// Mock data
const transactionData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const spendingData = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Shopping", value: 300 },
  { name: "Bills", value: 200 },
];

const COLORS = ["#22c55e", "#4ade80", "#a3e635", "#86efac"];

const colorMap = {
  blue: "text-green-700",
  green: "text-green-600",
  purple: "text-lime-600",
  yellow: "text-yellow-500",
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [balance, setBalance] = useState(0);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUpiId("");
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUpiId(userDoc.data().upiId);
          setBalance(Math.floor(Math.random() * 10000));
        }
      }
    };
    checkUser();
  }, []);

  const TransactionChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={transactionData}>
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
        <Tooltip
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div className="bg-white border border-green-200 p-2 rounded-lg shadow">
                <p className="text-green-600">{`₹${payload[0].value}`}</p>
              </div>
            ) : null
          }
        />
        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  const SpendingPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={spendingData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#22c55e"
          dataKey="value"
        >
          {spendingData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div className="bg-white border border-green-200 p-2 rounded-lg shadow">
                <p className="text-green-600">{`${payload[0].name}: ₹${payload[0].value}`}</p>
              </div>
            ) : null
          }
        />
        <Legend formatter={(value) => <span className="text-gray-600">{value}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="flex min-h-screen bg-green-50 text-gray-800">
      <aside className="hidden md:flex flex-col w-72 min-h-screen border-r border-green-200 bg-green-100">
        <SidebarContent />
      </aside>
      <div className="flex-1 p-6 overflow-y-auto">
        <Header user={user} onSignIn={handleGoogleSignIn} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center space-x-4 mt-4">
            <Avatar
              src={user?.photoURL}
              fallback={user?.displayName?.charAt(0) || "?"}
              className="h-12 w-12 ring-2 ring-green-500"
            />
            <div>
              <h2 className="text-xl font-bold text-green-700">
                {user?.displayName}
              </h2>
              <p className="text-sm text-gray-500">UPI ID: {upiId}</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="px-4 py-2 bg-red-500 hover:bg-red-600 transition"
          >
            Sign Out
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[{ title: "Total Balance", icon: DollarSign, value: balance.toFixed(2), color: "blue" },
            { title: "Monthly Spending", icon: CreditCard, value: (balance * 0.3).toFixed(2), color: "green" },
            { title: "Total Transactions", icon: Activity, value: transactionData.length, color: "purple" },
            { title: "Cashback Earned", icon: Zap, value: (balance * 0.02).toFixed(2), color: "yellow" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-green-200 hover:bg-green-50 p-4 transition">
                <div className="flex flex-row items-center justify-between pb-2">
                  <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
                  <item.icon className={`h-4 w-4 ${colorMap[item.color]}`} />
                </div>
                <div className={`text-2xl font-bold ${colorMap[item.color]}`}>
                  {item.title === "Total Transactions" ? item.value : `₹${item.value}`}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="bg-white border border-green-200 p-4">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Transaction History
            </h3>
            <TransactionChart />
          </Card>
          <Card className="bg-white border border-green-200 p-4">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Spending Categories
            </h3>
            <SpendingPieChart />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
