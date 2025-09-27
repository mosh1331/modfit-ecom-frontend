import React from 'react'
import { motion } from "framer-motion";

const KPI =({kpi,kpiData,variants})=> {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
      {kpi.map((item, i) => {
        const value = kpiData ? kpiData[item.key] : ''
        return(
        <motion.div key={item.key} {...variants.fadeIn} transition={{ delay: i * 0.05 }}>
          <div className="rounded-2xl border p-4 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.label}</span>
              <item.icon className="h-4 w-4 opacity-70" />
            </div>
            <div className="text-2xl font-bold mt-2">{value}</div>
            {/* <p className="text-xs text-gray-500 mt-1">{item.sub}</p> */}
          </div>
        </motion.div>
      )})}
    </div>
  );
}

export default KPI;