import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Store, Bike, DollarSign, Activity, PieChart, Bell, Search, Menu, X, Check, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans">
      {/* Sidebar */}
      <motion.aside 
         initial={{ width: 250 }}
         animate={{ width: isSidebarOpen ? 250 : 80 }}
         className="bg-gray-900 text-white flex flex-col h-full z-20 shrink-0"
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {isSidebarOpen && <span className="font-display font-bold text-xl text-primary-500">EatEase Admin</span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
            <Menu size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 space-y-2 px-3">
          <SidebarItem icon={<PieChart size={20} />} label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<Users size={20} />} label="Users" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<Store size={20} />} label="Restaurants" isActive={activeTab === 'restaurants'} onClick={() => setActiveTab('restaurants')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<Bike size={20} />} label="Riders" isActive={activeTab === 'riders'} onClick={() => setActiveTab('riders')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<Activity size={20} />} label="Live Orders" isActive={activeTab === 'orders'} onClick={() => setActiveTab('orders')} isOpen={isSidebarOpen} />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
         {/* Top Header */}
         <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
           <div className="relative w-64">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="Search..." className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
           </div>
           <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                 <img src="https://ui-avatars.com/api/?name=Admin&background=111827&color=fff" className="w-8 h-8 rounded-full" />
                 <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
           </div>
         </header>

         {/* Dashboard Body */}
         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab !== 'overview' && <div className="text-gray-500 flex items-center justify-center h-full">Select overview</div>}
         </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isActive, onClick, isOpen }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
        isActive ? "bg-primary-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
      )}
    >
      <div className="shrink-0">{icon}</div>
      {isOpen && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
    </button>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-2xl text-gray-900">Dashboard Overview</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231.00" icon={<DollarSign size={24} className="text-green-600" />} trend="+12.5%" isIncrease />
        <StatCard title="Active Orders" value="142" icon={<Activity size={24} className="text-blue-600" />} trend="+4.2%" isIncrease />
        <StatCard title="Restaurants" value="1,204" icon={<Store size={24} className="text-purple-600" />} trend="+2.4%" isIncrease />
        <StatCard title="Total Users" value="84,213" icon={<Users size={24} className="text-orange-600" />} trend="+18.2%" isIncrease />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Recent Orders */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Restaurant</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-gray-50 bg-white">
                      <td className="px-4 py-3 font-medium text-gray-900">#ORD-{9420 + i}</td>
                      <td className="px-4 py-3 text-gray-600">John Doe</td>
                      <td className="px-4 py-3 text-gray-600">Burger King</td>
                      <td className="px-4 py-3 text-gray-900 font-medium">$24.00</td>
                      <td className="px-4 py-3">
                         <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">DELIVERED</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>

         {/* Pending Approvals */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Partner Approvals</h3>
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-xl">🍕</div>
                     <div>
                       <p className="font-bold text-sm text-gray-900">Pizza Palace {i}</p>
                       <p className="text-xs text-gray-500">New York</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-1.5 bg-green-100 hover:bg-green-200 text-green-600 rounded-md transition"><Check size={16} /></button>
                     <button className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition"><X size={16} /></button>
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, isIncrease }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-xl">
           {icon}
        </div>
        <span className={cn(
          "px-2 py-1 flex items-center text-xs font-bold rounded-full",
          isIncrease ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
        <div className="font-display font-bold text-2xl text-gray-900">{value}</div>
      </div>
    </div>
  );
}
