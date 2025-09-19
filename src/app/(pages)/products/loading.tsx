import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white">
      <div className="text-center">
        {/* TechMart Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-black flex items-center justify-center mr-3">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <span className="text-3xl font-bold text-black">ShopMart</span>
        </div>
        
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <div className="w-12 h-12 border-4 border-gray-100 border-t-gray-400 rounded-full animate-spin mx-auto absolute top-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        {/* Loading Text */}
        {/* <div className="space-y-2">
          <p className="text-lg font-medium text-gray-800">Loading...</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
