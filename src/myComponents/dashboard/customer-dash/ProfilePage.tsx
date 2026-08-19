'use client';

import React, { useState } from 'react';
import { 
  User, Phone, MapPin, Lock, Edit3, ShoppingBag, 
  Star, Camera, Check, X, Mail, PackageCheck
} from 'lucide-react';

import { UserProfile } from '@/modules/services/user.service';
import { CustomAlert } from '@/lib/helpers/Shei-Shad-Alert';
import ChangeProfileImage from './ChangeImage';
import UpdateUserInfo from './UpdateUserInfo';

export default function ProfilePage({ user }: { user: UserProfile }) {
  const [activeTab, setActiveTab] = useState<'orders' | 'reviews'>('orders');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Avatar state
  // Profile Form state


 

  // Handle Password Reset Request
  const handleResetPassword = async () => {
    setIsResettingPassword(true);
    try {
      // await requestPasswordReset(user.email);
      CustomAlert.success(`Password reset link sent to ${user.email}`);
    } catch (error) {
      CustomAlert.error('Failed to send password reset request.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-200 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ================= USER PROFILE CARD ================= */}
        <div className="bg-[#14161d] border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            
            {/* User Info & Avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full sm:w-auto">
              
              {/* Profile Image Display with Pen Button */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex items-center justify-center text-zinc-500 shadow-inner">
                  {user?.image ? (
                    <img src={user?.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} />
                  )}
                </div>

                {/* Pen/Camera Icon Button -> Opens Dialog */}
                <button
                  type="button"
                  onClick={()=> setIsAvatarDialogOpen(true)}
                  className="absolute -bottom-1 -right-1 p-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl shadow-md transition-transform active:scale-95 border-2 border-[#14161d]"
                  title="Change profile picture"
                >
                  <Camera size={14} />
                </button>

                {
                    isAvatarDialogOpen && 
                     <ChangeProfileImage 
                     id={user?.id}
                      currentImage={user?.image || ''}
                      isAvatarDialogOpen={isAvatarDialogOpen}
                      setIsAvatarDialogOpen={setIsAvatarDialogOpen}
                     />
                }
              </div>

              {/* Text Info */}
              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-wide">
                  {user.name}
                </h1>
                
                <div className="flex flex-col gap-1 text-xs sm:text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-amber-500" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-amber-500" />
                    <span>{user.phone || 'No phone number added'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-amber-500" />
                    <span className="line-clamp-1">{user.deliveryAddress || 'No delivery address added'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-xs sm:text-sm rounded-xl transition-all active:scale-95"
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleResetPassword}
                disabled={isResettingPassword}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs sm:text-sm border border-zinc-800 rounded-xl transition-all active:scale-95 disabled:opacity-50"
              >
                <Lock size={15} />
                <span>{isResettingPassword ? 'Sending...' : 'Reset Password'}</span>
              </button>

              {
                isEditModalOpen && 

                <UpdateUserInfo 
                id={user?.id}
                 name={user?.name}
                 phone={user?.phone || ''}
                deliveryAddress={user?.deliveryAddress || ''}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                />
              }
            </div>
          </div>
        </div>

        {/* ================= BOTTOM SECTION: TABS & DATA ================= */}
        <div className="space-y-4">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#14161d] text-amber-400 border border-zinc-800 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
              }`}
            >
              <ShoppingBag size={16} />
              <span>Orders ({user._count.orders})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                activeTab === 'reviews'
                  ? 'bg-[#14161d] text-amber-400 border border-zinc-800 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
              }`}
            >
              <Star size={16} />
              <span>My Reviews ({user._count.reviews})</span>
            </button>
          </div>

          {/* TAB CONTENT: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {user.orders.length === 0 ? (
                <div className="bg-[#14161d] border border-zinc-800 rounded-2xl p-8 text-center space-y-2">
                  <PackageCheck size={32} className="mx-auto text-zinc-600" />
                  <p className="text-sm text-zinc-400">No orders placed yet.</p>
                </div>
              ) : (
                user.orders.map((order) => (
                  <div key={order.id} className="bg-[#14161d] border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-md">
                    
                    {/* Order Header */}
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 text-xs sm:text-sm">
                      <div className="space-y-0.5">
                        <span className="text-zinc-500">Order ID: </span>
                        <span className="font-mono text-amber-400 font-medium">#{order.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500 hidden sm:inline">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold uppercase tracking-wider">
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0">
                            {item.meal.image ? (
                              <img src={item.meal.image} alt={item.meal.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                <ShoppingBag size={18} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-zinc-200 truncate">{item.meal.name}</h4>
                            <p className="text-xs text-zinc-500">
                              Qty: {item.quantity} × ৳{item.price}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-amber-400">
                            ৳{item.quantity * item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB CONTENT: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {user.reviews.length === 0 ? (
                <div className="bg-[#14161d] border border-zinc-800 rounded-2xl p-8 text-center space-y-2">
                  <Star size={32} className="mx-auto text-zinc-600" />
                  <p className="text-sm text-zinc-400">You have not left any reviews yet.</p>
                </div>
              ) : (
                user.reviews.map((review) => (
                  <div key={review.id} className="bg-[#14161d] border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0">
                          {review.meal.image ? (
                            <img src={review.meal.image} alt={review.meal.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              <Star size={16} />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-200">{review.meal.name}</h4>
                          <span className="text-[11px] text-zinc-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-400">{review.starCount}</span>
                      </div>
                    </div>

                    {review.comment && (
                      <p className="text-xs sm:text-sm text-zinc-300 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* ================= SHADCN DIALOG FOR AVATAR UPLOAD ================= */}
    

        {/* ================= EDIT PROFILE TEXT MODAL ================= */}
        {/* {isEditModalOpen && (
          
         
        )} */}

      </div>
    </div>
  );
}