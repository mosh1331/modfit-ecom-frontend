'use client'
import ModtifLoader from '@/components/loader/ModtifLoader';
import { useAuth } from '@/hooks/useAuth';
import { User, MapPin, Star, Gift, ShoppingBag, LogOut, PersonStanding } from 'lucide-react'

export default function ProfilePage() {
    const {user,loading} = useAuth()

    console.log(user,'user')
    if(loading) return <ModtifLoader />
  return (
    <div className="p-6 text-black md:p-12 max-w-6xl mx-auto">
      {/* Top Section - User Info */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          {/* <img
            src="/images/avatar.png"
            alt="User avatar"
            width={64}
            height={64}
            className="rounded-full"
          /> */}
          <PersonStanding />
          <div>
            <h2 className="text-xl font-semibold">Hi, {user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>
        <div className="text-sm bg-gray-100 rounded-lg px-4 py-2 text-gray-600 flex items-center gap-2">
          <Gift size={16} />
          <span>Referral Code:</span>
          <span className="font-semibold text-black">MODTIF324</span>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Purchase History */}
        <Card title="Purchase History" icon={<ShoppingBag size={20} />}>
          <div className="space-y-2 text-sm">
            <p>• Abaya Black Silk – <span className="text-gray-500">Delivered</span></p>
            <p>• Eid Kaftan Rose – <span className="text-gray-500">Processing</span></p>
            <button className="text-blue-600 text-xs mt-2 hover:underline">View all orders →</button>
          </div>
        </Card>

        {/* My Reviews */}
        <Card title="My Reviews" icon={<Star size={20} />}>
          <div className="space-y-2 text-sm">
            <p>• Abaya Black Silk – ⭐⭐⭐⭐⭐</p>
            <p>• Eid Kaftan Rose – ⭐⭐⭐⭐</p>
            <button className="text-blue-600 text-xs mt-2 hover:underline">View all reviews →</button>
          </div>
        </Card>

        {/* Referral Stats */}
        <Card title="Referrals" icon={<Gift size={20} />}>
          <div className="text-sm">
            <p>👥 4 friends joined using your code</p>
            <p>🎁 Rewards earned: ₹200</p>
            <button className="text-blue-600 text-xs mt-2 hover:underline">Share referral →</button>
          </div>
        </Card>

        {/* Saved Addresses */}
        <Card title="Saved Addresses" icon={<MapPin size={20} />}>
          <div className="text-sm">
            <p>🏠 123, Noor Street, Delhi</p>
            <p>🏢 Office: 57 Huda, Gurgaon</p>
            <button className="text-blue-600 text-xs mt-2 hover:underline">Manage addresses →</button>
          </div>
        </Card>

        {/* Account Settings */}
        <Card title="Account Settings" icon={<User size={20} />}>
          <div className="text-sm">
            <button className="text-blue-600 hover:underline block mb-2">Edit Profile</button>
            <button className="text-blue-600 hover:underline block">Change Password</button>
          </div>
        </Card>

        {/* Logout */}
        <Card title="Logout" icon={<LogOut size={20} />}>
          <button className="text-red-600 hover:underline text-sm">Logout from all devices</button>
        </Card>
      </div>
    </div>
  )
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {children}
    </div>
  )
}
