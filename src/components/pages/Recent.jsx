"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, ArrowUpRight, ArrowDownLeft } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Input, Badge } from "@/components/ui/base-elements"

import Header from "./Header"
import SidebarContent from "./SidebarContent"
import { db, auth } from "./firebase"
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore"

const statusColor = {
  Completed: "bg-green-500 text-white",
  Pending: "bg-yellow-400 text-black",
  Failed: "bg-red-500 text-white",
}

export default function RecentTransactions() {
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getEverything = async () => {
      const curr = auth.currentUser
      if (!curr) return

      const snap = await getDoc(doc(db, "users", curr.uid))
      if (!snap.exists()) return
      const usr = snap.data()
      setUser(usr)

      const txSnap = await getDocs(
        query(
          collection(db, "transactions"),
          where("senderUPI", "==", usr.upiId)
        )
      )
      setTransactions(txSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
    }

    getEverything()
  }, [])

  const results = transactions.filter((t) => {
    const term = search.toLowerCase()
    return (
      t.recipientUPI.toLowerCase().includes(term) ||
      t.amount.toString().includes(term) ||
      t.remarks.toLowerCase().includes(term)
    )
  })

  return (
    <div className="flex min-h-screen bg-green-50 text-green-900">
      <aside className="hidden md:flex w-72 flex-col border-r border-green-200 bg-green-100">
        <SidebarContent />
      </aside>

      <main className="flex-1 bg-gradient-to-br from-green-50 via-green-100 to-green-50">
        <Header user={user} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 space-y-6"
        >
          <Card className="bg-white border border-green-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-800">Recent Transactions</h2>

              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400" />
                <Input
                  placeholder="Search…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 bg-green-100 border border-green-300 placeholder:text-green-500 text-green-800"
                />
              </div>
            </div>

            <div className="space-y-4">
              {results.map((tx) => (
                <Card
                  key={tx.id}
                  className="bg-green-100 border border-green-200 hover:bg-green-200 transition-colors duration-200 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`p-2 rounded-full ${
                        tx.type === "incoming" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {tx.type === "incoming" ? (
                        <ArrowDownLeft className="h-5 w-5 text-white" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      )}
                    </span>

                    <div>
                      <p className="font-medium text-green-800">{tx.recipientUPI}</p>
                      <p className="text-sm text-green-600">
                        {new Date(tx.createdAt.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        tx.type === "incoming" ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {tx.type === "incoming" ? "+" : "-"}₹{tx.amount.toFixed(2)}
                    </p>

                    <Badge className={statusColor[tx.status] + " mt-1"}>
                      {tx.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
