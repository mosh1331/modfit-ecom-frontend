'use client'
import React, { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { adminAPis } from "@/service/adminApis"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import dayjs from "dayjs"

interface Investment {
  id: number
  amount: number
  note?: string
  createdAt: string
}

interface Props {
  params: { partnerId: number }
}

export default function PartnerInvestmentsPage({ params }: Props) {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const { partnerId } = params
  const { partners } = useSelector((state: RootState) => state.partner)



  //@ts-ignore
const currentPartner = partners.find(i => i.id === parseInt(partnerId))
  const partnerName =currentPartner?.name // replace later with real partner name if needed
  console.log(partnerId,'partnerId')

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await adminAPis().getPartnerInvestmentsById(partnerId)
        setInvestments(res.data?.investments)
      } catch (err) {
        console.error("Error fetching partner investments:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchInvestments()
  }, [partnerId])

  return (
    <div className="mt-6 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4">{partnerName} – Investments</h2>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          {/* <Loader2 className="h-6 w-6 animate-spin text-gray-500" /> */}
        </div>
      ) : investments.length === 0 ? (
        <p className="text-sm text-gray-500">No investments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">NO:</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Note</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv,idx) => (
                <tr
                  key={inv.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 text-sm">{idx+1}</td>
                  <td className="px-4 py-2 text-sm text-green-600 font-medium">
                    ₹{inv.amount}
                  </td>
                  <td className="px-4 py-2 text-sm">{inv.note || "-"}</td>
                  <td className="px-4 py-2 text-sm">{dayjs(inv.createdAt).format("DD-MM-YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
